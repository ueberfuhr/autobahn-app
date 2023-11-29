import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {CommonModule} from '@angular/common';
import {catchError, shareReplay, tap} from 'rxjs';
import {ButtonModule, CardModule, GridModule} from '@coreui/angular';
import {
  DashboardRoadIndexRoadEventsFooterCardComponent
} from '../dashboard-road-index-road-events-footer-card/dashboard-road-index-road-events-footer-card.component';
import {CompositeRoadEvents, CompositeRoadEventsService, Road, RoadInfo} from '@autobahn/roads';
import {IconModule} from '@coreui/icons-angular';

@Component({
  selector: 'app-dashboard-road-index-road-events',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    GridModule,
    DashboardRoadIndexRoadEventsFooterCardComponent,
    IconModule,
    ButtonModule
  ],
  templateUrl: './dashboard-road-index-road-events.component.html',
  styleUrl: './dashboard-road-index-road-events.component.scss'
})
export class DashboardRoadIndexRoadEventsComponent implements OnChanges {

  @Input({required: true}) road?: Road;
  fetchTime = new Date();
  roadEvents$ = CompositeRoadEvents.EMPTY;
  protected readonly RoadEvent = RoadInfo;

  constructor(
    private readonly roadEventsService: CompositeRoadEventsService
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.refresh();
  }

  refresh(): void {
    this.roadEvents$ = CompositeRoadEvents.EMPTY;
    if (this.road) {
      this.roadEvents$ = this.roadEventsService
        .findEach(
          this.road,
          obs => obs
            .pipe(
              tap(() => this.fetchTime = new Date()),
              catchError(e => {
                console.log(e);
                return []
              }),
              shareReplay(1)
            )
        );
    }
  }

}
