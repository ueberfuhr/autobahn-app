import {ApplicationConfig} from '@angular/core';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
  withHashLocation,
  withInMemoryScrolling
} from '@angular/router';

import {routes} from './app.routes';
import {provideHttpClient} from '@angular/common/http';
import {Title} from '@angular/platform-browser';
import {IconSetService} from '@coreui/icons-angular';
import {provideRoadsForNavigation} from '@app/layout';
import {provideAnimations} from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes,
     withHashLocation(),
     withEnabledBlockingInitialNavigation(),
     withInMemoryScrolling({
       scrollPositionRestoration: 'top',
       anchorScrolling: 'enabled'
     })
    ),
    provideHttpClient(),
    provideAnimations(),
    provideRoadsForNavigation(),
    IconSetService,
    Title
]
};
