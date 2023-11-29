import {Component, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  ButtonModule,
  CardModule,
  GridModule,
  ProgressComponent, ProgressModule,
  TemplateIdDirective,
  WidgetStatAComponent
} from '@coreui/angular';
import {IconDirective} from '@coreui/icons-angular';
import {RoadsService, WebcamsService} from '@autobahn/roads';
import {BehaviorSubject, catchError} from 'rxjs';
import {Webcam} from '../../roads/models/webcam.model';

@Component({
  selector: 'app-dashboard-webcams-index',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    GridModule,
    IconDirective,
    TemplateIdDirective,
    WidgetStatAComponent,
    ProgressModule
  ],
  templateUrl: './dashboard-webcams-index.component.html',
  styleUrl: './dashboard-webcams-index.component.scss'
})
export class DashboardWebcamsIndexComponent {

  searchState = signal<SearchState>('uninitialized');
  searchProgress = signal<ProgressInfo>(new ProgressInfo(0));
  private readonly webcamSearchResultSubject = new BehaviorSubject<Webcam[]>([]);
  public readonly webcamSearchResult$ = this.webcamSearchResultSubject.asObservable();

  constructor(
    private readonly roadService: RoadsService,
    private readonly webcamsService: WebcamsService
  ) {
  }

  runSearch(): void {
    this.searchState.set('pending');
    this.webcamSearchResultSubject.next([]);
    this.roadService.getRoads()
      .subscribe({
        next: roads => {
          if (roads.length > 0) {
            const progress = new ProgressInfo(roads.length)
            this.searchProgress.set(progress);
            roads.forEach(road => {
              this.webcamsService.findAll(road)
                .pipe(
                  catchError(() => [])
                )
                .subscribe({
                  next: webcams => {
                    this.webcamSearchResultSubject
                      .next(this.webcamSearchResultSubject.value.concat(...webcams));
                  },
                  complete: () => {
                    progress.increase();
                    this.searchProgress.update(p => p);
                    if (progress.finished) {
                      this.finishSearch();
                    }
                  }
                })
            })
          } else {
            this.finishSearch();
          }
        },
        error: () => this.finishSearch()
      })
  }

  finishSearch(): void {
    this.searchProgress.set(new ProgressInfo(0));
    this.searchState.set('done');
  }

}

export type SearchState = 'uninitialized' | 'pending' | 'done';

class ProgressInfo {

  private progress = 0;

  constructor(
    public readonly count: number
  ) {
  }

  get progressTotal(): number {
    return this.progress;
  }

  get progressPercent(): number {
    return Math.min(
      this.count !== 0 ? Math.ceil(this.progress * 100 / this.count) : 100,
      100
    );
  }

  increase(): void {
    this.progress++;
  }

  get finished(): boolean {
    return this.progress >= this.count;
  }


}
