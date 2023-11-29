import {
  provideRouter,
  Resolve,
  ResolveFn,
  Route,
  Routes,
  withEnabledBlockingInitialNavigation,
  withHashLocation,
  withInMemoryScrolling
} from '@angular/router';
import {
  DashboardComponent,
  DashboardIndexComponent,
  DashboardRoadIndexComponent,
  DashboardWebcamsIndexComponent
} from '@app/layout';
import {APP_INITIALIZER, EnvironmentProviders, inject, makeEnvironmentProviders, Type} from '@angular/core';
import {Environment, ENVIRONMENT} from '@app/environment';
import {isFunction} from 'rxjs/internal/util/isFunction';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DashboardComponent,
    title: 'Home',
    children: [
      {
        path: 'home',
        pathMatch: 'full',
        title: 'Dashboard',
        component: DashboardIndexComponent
      },
      {
        path: 'roads/:road',
        component: DashboardRoadIndexComponent,
        title: (route => `Autobahn-Details zur ${route.params['road']}`) as ResolveFn<string>,
        data: {
          title: 'Autobahn-Details zur :road'
        }
      },
      {
        path: 'webcams',
        title: 'Webcam-Suche',
        component: DashboardWebcamsIndexComponent
      }
    ]
  }
];

function extendTitle(title: string | Type<Resolve<string>> | ResolveFn<string> | undefined, env: Environment): string | ResolveFn<string> {
  if (!title) {
    return env.ui.title;
  }
  if (isFunction(title)) {
    return ((route, state) =>
      `${title(route, state)} (${env.ui.title})`) as ResolveFn<string>;
  }
  return `${title} (${env.ui.title})`;
}

// necessary for UI Core Breadcrumb
function copyTitleToDataForLegacySupport(route: Route): void {
  if (!route.data?.['title'] && !isFunction(route.title)) {
    Object.assign(route, {
      data: {
        title: route.title
      }
    });
  }
}

function loopRoutesAndCustomize(routes: Route[], env: Environment) {
  routes.forEach(route => {
    // we copy BEFORE extending the title
    copyTitleToDataForLegacySupport(route);
    route.title = extendTitle(route.title, env);
    if (route.children) {
      loopRoutesAndCustomize(route.children, env)
    }
  })
}

export function customizeRoutes(): () => void {
  const env = inject(ENVIRONMENT);
  return () => {
    loopRoutesAndCustomize(routes, env);
  }
}


export function provideRouting(): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideRouter(routes,
      withHashLocation(),
      withEnabledBlockingInitialNavigation(),
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled'
      })
    ),
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: customizeRoutes,
    }
  ]);
}
