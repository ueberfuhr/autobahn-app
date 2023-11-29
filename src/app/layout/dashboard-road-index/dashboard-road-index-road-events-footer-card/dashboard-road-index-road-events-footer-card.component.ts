import {Component, Input} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {EMPTY, map, Observable} from 'rxjs';
import {GridModule} from '@coreui/angular';
import {RoadInfo} from '@autobahn/roads';

@Component({
  selector: 'app-dashboard-road-index-road-events-footer-card',
  standalone: true,
  imports: [
    CommonModule,
    GridModule,
    NgOptimizedImage
  ],
  templateUrl: './dashboard-road-index-road-events-footer-card.component.html',
  styleUrl: './dashboard-road-index-road-events-footer-card.component.scss'
})
export class DashboardRoadIndexRoadEventsFooterCardComponent {

  @Input({required: true}) roadEvents$: Observable<RoadInfo[]> = EMPTY;
  @Input({required: true}) title: string = '';
  @Input() icon?: RoadInfo.Icon;

  get filteredRoadEvents$(): Observable<RoadInfo[]> {
    return this.roadEvents$.pipe(
      map(rwArr => rwArr.filter(rw => !this.icon || rw.icon === this.icon))
    );
  }

}
