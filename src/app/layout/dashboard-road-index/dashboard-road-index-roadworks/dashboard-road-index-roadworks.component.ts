import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EMPTY, Observable, shareReplay} from 'rxjs';
import {Roadwork, RoadworksService} from '@autobahn/roadworks';
import {CardModule, GridModule} from '@coreui/angular';
import {
  DashboardRoadIndexRoadworksFooterCardComponent
} from '../dashboard-road-index-roadworks-footer-card/dashboard-road-index-roadworks-footer-card.component';
import {Road} from '@autobahn/roads';

@Component({
  selector: 'app-dashboard-road-index-roadworks',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    GridModule,
    DashboardRoadIndexRoadworksFooterCardComponent
  ],
  templateUrl: './dashboard-road-index-roadworks.component.html',
  styleUrl: './dashboard-road-index-roadworks.component.scss'
})
export class DashboardRoadIndexRoadworksComponent implements OnChanges {

  @Input({required: true}) road?: Road;
  readonly Roadwork = Roadwork;

  fetchTime = new Date();
  roadworks$: Observable<Roadwork[]> = EMPTY;

  constructor(
    private readonly roadworksService: RoadworksService
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.roadworks$ = EMPTY;
    if (this.road) {
      this.roadworks$ = this.roadworksService
        .getRoadworks(this.road)
        .pipe(
          shareReplay(1)
        );
    }
  }

}
