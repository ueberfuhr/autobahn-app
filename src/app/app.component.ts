import {Component} from '@angular/core';
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
    readonly iconSetService: IconSetService
  ) {
    iconSetService.icons = {...iconSubset};
  }

}
