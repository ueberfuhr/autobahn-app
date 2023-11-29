import {ApplicationConfig} from '@angular/core';

import {provideRouting} from './app.routes';
import {provideHttpClient} from '@angular/common/http';
import {IconSetService} from '@coreui/icons-angular';
import {provideRoadsForNavigation, provideWebcamNavigation} from '@app/layout';
import {provideAnimations} from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouting(),
    provideHttpClient(),
    provideAnimations(),
    provideWebcamNavigation(),
    provideRoadsForNavigation(),
    IconSetService
  ]
};

