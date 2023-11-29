import {Component, effect, OnDestroy, OnInit, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {Road, RoadsService} from '@autobahn/roads';
import {BreadcrumbRouterService, IBreadcrumbItem, SharedModule, WidgetModule} from '@coreui/angular';
import {Subscription} from 'rxjs';
import {IconModule} from '@coreui/icons-angular';
import {
  DashboardRoadIndexRoadEventsComponent
} from './dashboard-road-index-road-events/dashboard-road-index-road-events.component';

@Component({
  selector: 'app-dashboard-road-index',
  standalone: true,
  imports: [
    CommonModule,
    WidgetModule,
    IconModule,
    DashboardRoadIndexRoadEventsComponent,
    SharedModule,
    RouterLink
  ],
  templateUrl: './dashboard-road-index.component.html',
  styleUrl: './dashboard-road-index.component.scss'
})
export class DashboardRoadIndexComponent implements OnInit, OnDestroy {

  readonly road = signal<Road | null>(null);
  roadDetails? : RoadDetails;
  private routerSubscription?: Subscription;
  private breadcrumbSubscription?: Subscription;
  private lastBreadcrumbLabel?: string;
  private lastBreadcrumbItem?: IBreadcrumbItem;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly routerService: BreadcrumbRouterService,
    private readonly roadsService: RoadsService
  ) {
    effect(() => {
      const roadValue = this.road();
      this.roadDetails = undefined;
      if (roadValue) {
        if (this.lastBreadcrumbItem && this.lastBreadcrumbLabel) {
          this.lastBreadcrumbItem.label = this.lastBreadcrumbLabel.replaceAll(':road', roadValue);
        }
        this.roadsService
          .getRoads()
          .subscribe({
            next: roads => {
              const index = roads.indexOf(roadValue);
              this.roadDetails = {
                current: index >= 0 ? roadValue : null,
                previous: index > 0 ? roads[index - 1] : null,
                next: index >= 0 && index < roads.length - 1 ? roads[index + 1] : null
              };
            }
          });
      }
    })
  }

  roadState(): 'found' | 'not-found' | 'pending' {
    if (this.roadDetails) {
      return this.roadDetails.current ? 'found' : 'not-found';
    }
    return 'pending';
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

  protected readonly encodeURIComponent = encodeURIComponent;
}

export interface RoadDetails {
  previous: Road | null;
  current: Road | null;
  next: Road | null;
}
