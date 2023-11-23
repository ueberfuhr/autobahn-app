import {Component, inject} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {AsyncPipe, NgOptimizedImage} from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {map, shareReplay} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-side-navigation',
  templateUrl: './side-navigation.component.html',
  styleUrls: ['./side-navigation.component.scss'],
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
    NgOptimizedImage,
  ]
})
export class SideNavigationComponent {
  private breakpointObserver = inject(BreakpointObserver);

  isExpandedByButton = false;
  isExpanded$ =
    this.breakpointObserver
    .observe(Breakpoints.Web)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
}
