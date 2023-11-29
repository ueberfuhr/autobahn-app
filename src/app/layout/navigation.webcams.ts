import {EnvironmentProviders, makeEnvironmentProviders} from '@angular/core';
import {NAVIGATION_PROVIDER, NavigationProvider} from '../app.navigation';
import {of} from 'rxjs';


export function createWebcamNavigation(): NavigationProvider {
  return {
    order: 9,
    findNavigationItems: () => of([{
      name: 'Webcam-Suche',
      url: '/webcams',
      iconComponent: {
        name: 'cil-camera'
      }
    }])
  }
}


export function provideWebcamNavigation(): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: NAVIGATION_PROVIDER,
      multi: true,
      useFactory: createWebcamNavigation
    }
  ])
}
