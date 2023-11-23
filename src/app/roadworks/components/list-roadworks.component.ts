import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RoadWork, RoadworksService} from '@app/autobahn';

@Component({
  selector: 'app-list-roadworks',
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'list-roadworks.component.html'
})
export class ListRoadworksComponent {

  public roadworks: RoadWork[] = [];

  constructor(private roadworksService : RoadworksService) {
    this.roadworksService
      .findRoadworks('A1/A59')
      .subscribe({
        next: value => this.roadworks = value
      })
  }

}
