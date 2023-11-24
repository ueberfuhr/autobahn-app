import {APP_INITIALIZER, EnvironmentProviders, makeEnvironmentProviders} from '@angular/core';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {Roadwork} from './models/roadwork-model';

export * from './models/roadwork-model';
export * from './services/roadworks.service';
export * from './pipes/maticon.pipe';
export * from './components/roadworks-road-list/roadworks-road-list.component';
export * from './components/roadworks-index/roadworks-index.component';
export * from './components/roadworks-card-by-road/roadworks-card-by-road.component';
export * from './components/roadworks-card-button-by-icon/roadworks-card-button-by-icon.component';

// https://www.petermorlion.com/iterating-a-typescript-enum/
function enumKeys<O extends object, K extends keyof O = keyof O>(obj: O): K[] {
  return Object.keys(obj).filter(k => Number.isNaN(+k)) as K[];
}
function registerRoadworkIcons(
  iconRegistry: MatIconRegistry,
  domSanitizer: DomSanitizer
): () => Promise<void> {
  return async () => {
    for(const icon of enumKeys(Roadwork.Icon)) {
      const iconValue = Roadwork.Icon[icon];
      iconRegistry.addSvgIcon(
        toIconName(iconValue),
        domSanitizer.bypassSecurityTrustResourceUrl(`assets/vz/${iconValue}.svg`)
      )
    }
  }
}

export function toIconName(icon: Roadwork.Icon) {
  return `roadwork-icon-${icon}`;
}

export function provideRoadworkIcons(): EnvironmentProviders {
  return makeEnvironmentProviders([{
    provide: APP_INITIALIZER,
    useFactory: registerRoadworkIcons,
    multi: true,
    deps: [MatIconRegistry, DomSanitizer]
  }]);
}
