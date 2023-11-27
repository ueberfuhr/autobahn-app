import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BreadcrumbModule, GridModule, HeaderComponent, HeaderModule, NavModule, SidebarModule} from '@coreui/angular';
import {IconModule} from '@coreui/icons-angular';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-dashboard-header',
  standalone: true,
  imports: [
    CommonModule,
    GridModule,
    SidebarModule,
    HeaderModule,
    IconModule,
    NavModule,
    BreadcrumbModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './dashboard-header.component.html',
  styleUrl: './dashboard-header.component.scss'
})
export class DashboardHeaderComponent extends HeaderComponent {

  @Input() sidebarId: string = "sidebar";

}
