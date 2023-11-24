import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Road, RoadsService} from '@autobahn/roads';
import {map} from 'rxjs';
import {RoadworksCardByRoadComponent} from '../roadworks-card-by-road/roadworks-card-by-road.component';

@Component({
  selector: 'app-roadworks-road-list',
  standalone: true,
  imports: [CommonModule, RoadworksCardByRoadComponent],
  templateUrl: 'roadworks-road-list.component.html'
})
export class RoadworksRoadListComponent {

  public roads: Road[] = [];

  constructor(private roadsService : RoadsService) {
    this.roadsService
      .getRoads()
      .pipe(
        map(values => values.slice(0, 5))
      )
      .subscribe({
        next: value => this.roads = value
      })
  }

}
