import {InjectionToken} from '@angular/core';
import {Observable} from 'rxjs';
import {INavData} from '@coreui/angular';

export interface NavigationProvider {
  order: number,
  findNavigationItems: () => Observable<INavData[]>
}
export const NAVIGATION_PROVIDER = new InjectionToken<NavigationProvider>(
  'A provider for navigation entries.'
)
