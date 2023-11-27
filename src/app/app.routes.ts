import {Routes} from '@angular/router';
import {DashboardComponent, DashboardIndexComponent, DashboardRoadIndexComponent} from '@app/layout';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DashboardComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'home',
        pathMatch: 'full',
        component: DashboardIndexComponent,
        data: {
          title: 'Dashboard'
        },
      },
      {
        path: 'roads/:road',
        component: DashboardRoadIndexComponent,
        data: {
          title: 'Autobahn-Details zur :road'
        },
      }
    ]
  }
];
