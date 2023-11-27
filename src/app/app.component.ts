import {Component, Inject} from '@angular/core';
import {Environment, ENVIRONMENT} from '@app/environment';
import {Title} from '@angular/platform-browser';
import {RouterOutlet} from '@angular/router';
import {IconSetService} from '@coreui/icons-angular';
import {iconSubset} from './icons/icon-subset';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  template: '<router-outlet></router-outlet>'
})
export class AppComponent {

  constructor(
    @Inject(ENVIRONMENT) private readonly environment : Environment,
    readonly titleService : Title,
    readonly iconSetService: IconSetService
  ) {
    titleService.setTitle(environment.ui.title);
    iconSetService.icons = { ...iconSubset };
  }

}
