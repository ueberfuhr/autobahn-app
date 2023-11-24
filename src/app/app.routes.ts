import {Routes} from '@angular/router';
import {DashboardIndexComponent} from '@app/layout';
import {RoadworksIndexComponent} from '@autobahn/roadworks';
import {WebcamsIndexComponent} from '@autobahn/webcams';

export const routes: Routes = [
  {path: '', component: DashboardIndexComponent, pathMatch: 'full'},
  {path: 'roadworks', component: RoadworksIndexComponent, pathMatch: 'full'},
  {path: 'webcams', component: WebcamsIndexComponent, pathMatch: 'full'}
];
