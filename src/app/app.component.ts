import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {ListRoadworksComponent} from "./roadworks/components/list-roadworks.component";
import {AutobahnDashboardComponent} from './layout/autobahn-dashboard/autobahn-dashboard.component';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ListRoadworksComponent, AutobahnDashboardComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

}
