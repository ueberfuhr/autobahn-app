import {Component} from '@angular/core';
import {SideNavigationComponent} from '../side-navigation/side-navigation.component';

@Component({
  selector: 'app-autobahn-dashboard',
  templateUrl: './autobahn-dashboard.component.html',
  styleUrls: ['./autobahn-dashboard.component.scss'],
  standalone: true,
  imports: [
    SideNavigationComponent
  ]
})
export class AutobahnDashboardComponent {

}
