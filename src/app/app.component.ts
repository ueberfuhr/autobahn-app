import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RoadworksRoadListComponent} from "@autobahn/roadworks";
import {DashboardComponent} from '@app/layout';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RoadworksRoadListComponent, DashboardComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

}
