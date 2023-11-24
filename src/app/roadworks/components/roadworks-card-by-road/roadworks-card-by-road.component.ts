import {Component, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {Road} from '@autobahn/roads';
import {Roadwork, RoadworksService} from '@autobahn/roadworks';
import {RoadworksCardButtonByIconComponent} from '../roadworks-card-button-by-icon/roadworks-card-button-by-icon.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-roadworks-card-by-road',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, RoadworksCardButtonByIconComponent],
  templateUrl: './roadworks-card-by-road.component.html',
  styleUrl: './roadworks-card-by-road.component.scss'
})
export class RoadworksCardByRoadComponent implements OnInit {

  protected readonly Roadwork = Roadwork;

  @Input({required: true}) road: Road = '';
  roadworks : Roadwork[] = [];
  /*
  readonly roadworks = signal<Roadwork[]>([]);
  readonly roadworksByIcon = computed(
    () => this.roadworks().reduce(
      (result, item) => {
        // https://github.com/gvergnaud/ts-pattern
        match(item.icon)
          .with(Roadwork.Icon.Gefahr, () => result.gefahren)
          .with(Roadwork.Icon.Sperrung, () => result.sperrungen)
          .with(Roadwork.Icon.Bauarbeiten, () => result.baustellen)
          .with(Roadwork.Icon.Kurzzeitbaustelle, () => result.kurzzeitBaustellen)
          .otherwise(() => result.sonstige)
          .push(item)
        return result;
      },
      emptyRoadworksByIcon()
    )
  );
  */

  constructor(private readonly roadworksService: RoadworksService) {
  }

  ngOnInit(): void {
    this.roadworksService
      .getRoadworks(this.road)
      .subscribe({
        //next: value => this.roadworks.set(value)
        next: value => this.roadworks = value
      })
  }

}

/*
interface RoadworksByIcon {
  gefahren: Roadwork[],
  sperrungen: Roadwork[],
  baustellen: Roadwork[],
  kurzzeitBaustellen: Roadwork[],
  sonstige: Roadwork[]
}
function emptyRoadworksByIcon(): RoadworksByIcon {
  return {
    gefahren: [],
    sperrungen: [],
    baustellen: [],
    kurzzeitBaustellen: [],
    sonstige: []
  }
}
 */
