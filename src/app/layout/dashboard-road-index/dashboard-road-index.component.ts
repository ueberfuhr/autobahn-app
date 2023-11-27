import {Component, effect, OnDestroy, OnInit, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {Road, RoadsService} from '@autobahn/roads';
import {BreadcrumbRouterService, IBreadcrumbItem, SharedModule, WidgetModule} from '@coreui/angular';
import {Subscription} from 'rxjs';
import {IconModule} from '@coreui/icons-angular';
import {
  DashboardRoadIndexRoadworksComponent
} from './dashboard-road-index-roadworks/dashboard-road-index-roadworks.component';

@Component({
  selector: 'app-dashboard-road-index',
  standalone: true,
  imports: [
    CommonModule,
    WidgetModule,
    IconModule,
    DashboardRoadIndexRoadworksComponent,
    SharedModule
  ],
  templateUrl: './dashboard-road-index.component.html',
  styleUrl: './dashboard-road-index.component.scss'
})
export class DashboardRoadIndexComponent implements OnInit, OnDestroy {

  readonly road = signal<Road | null>(null);
  private routerSubscription?: Subscription;
  private breadcrumbSubscription?: Subscription;
  private lastBreadcrumbLabel?: string;
  private lastBreadcrumbItem?: IBreadcrumbItem;
  roadState: 'found' | 'not-found' | 'pending' = 'pending';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly routerService: BreadcrumbRouterService,
    private readonly roadsService: RoadsService
  ) {
    effect(() => {
      this.roadState = 'pending';
      const roadValue = this.road();
      if (roadValue) {
        if (this.lastBreadcrumbItem && this.lastBreadcrumbLabel) {
          this.lastBreadcrumbItem.label = this.lastBreadcrumbLabel.replaceAll(':road', roadValue);
        }
        this.roadsService
          .getRoads()
          .subscribe({
            next: roads => {
              this.roadState = roads.includes(roadValue) ? 'found' : 'not-found';
            }
          });
      }
    })
  }

  ngOnInit(): void {
    this.routerSubscription = this.route
      .params
      .subscribe(params => {
        const road = params['road'];
        this.road.set(decodeURIComponent(road));
      });
    this.routerService.breadcrumbs$.subscribe({
      next: value => {
        if (value.length > 0) {
          // the last item is the current page
          this.lastBreadcrumbItem = value[value.length - 1];
          this.lastBreadcrumbLabel = this.lastBreadcrumbItem.label;
        }
      }
    }).unsubscribe();
    // want to change the array to get change detection for breadcrumb compoent
    this.breadcrumbSubscription = this.routerService.breadcrumbs$.subscribe({
      next: value => {
        // TODO don't understand why this works :)
        if (this.lastBreadcrumbItem && value.pop()) {
          value.push(this.lastBreadcrumbItem);
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.routerSubscription?.unsubscribe();
    this.routerSubscription = undefined;
    this.breadcrumbSubscription?.unsubscribe()
    this.breadcrumbSubscription = undefined;
  }

}
