import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RoadworksRoadListComponent} from '@autobahn/roadworks';

@Component({
  selector: 'app-roadworks-index',
  standalone: true,
  imports: [CommonModule, RoadworksRoadListComponent],
  template: '<app-roadworks-road-list></app-roadworks-road-list>'
})
export class RoadworksIndexComponent {

}
