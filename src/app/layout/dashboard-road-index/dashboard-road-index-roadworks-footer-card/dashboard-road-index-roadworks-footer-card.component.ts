import {Component, Input} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {EMPTY, map, Observable} from 'rxjs';
import {Roadwork} from '@autobahn/roadworks';
import {GridModule} from '@coreui/angular';

@Component({
  selector: 'app-dashboard-road-index-roadworks-footer-card',
  standalone: true,
  imports: [
    CommonModule,
    GridModule,
    NgOptimizedImage
  ],
  templateUrl: './dashboard-road-index-roadworks-footer-card.component.html',
  styleUrl: './dashboard-road-index-roadworks-footer-card.component.scss'
})
export class DashboardRoadIndexRoadworksFooterCardComponent {

  @Input({required: true}) roadworks$: Observable<Roadwork[]> = EMPTY;
  @Input({required: true}) title: string = '';
  @Input() icon?: Roadwork.Icon;

  get filteredRoadworks$(): Observable<Roadwork[]> {
    return this.roadworks$.pipe(
      map(rwArr => rwArr.filter(rw => !this.icon || rw.icon === this.icon))
    );
  }

}
