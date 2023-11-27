import {Component, Inject} from '@angular/core';
import {NAVIGATION_PROVIDER, NavigationProvider} from '../../app.navigation';
import {merge, Observable} from 'rxjs';
import {ContainerComponent, INavData, SidebarModule} from '@coreui/angular';
import {AsyncPipe} from '@angular/common';
import {NgScrollbar} from 'ngx-scrollbar';
import {RouterOutlet} from '@angular/router';
import {DashboardHeaderComponent} from '../dashboard-header/dashboard-header.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  imports: [
    AsyncPipe,
    NgScrollbar,
    SidebarModule,
    ContainerComponent,
    RouterOutlet,
    DashboardHeaderComponent
  ],
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  public readonly navigationEntries$: Observable<INavData[]>;

  constructor(
    @Inject(NAVIGATION_PROVIDER) navigationProviders: NavigationProvider[]
  ) {
    const navigationEntriesObservables = navigationProviders
      .sort(byOrder)
      .map(p => p.findNavigationItems());
    this.navigationEntries$ = merge(...navigationEntriesObservables);
  }


}

const byOrder = (p1: NavigationProvider, p2: NavigationProvider) => {
  const result = p1.order - p2.order;
  return result !== 0 ? result : 1;
}
