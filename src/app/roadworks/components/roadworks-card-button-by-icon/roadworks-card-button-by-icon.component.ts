import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaticonPipe, Roadwork} from '@autobahn/roadworks';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';

@Component({
  selector: 'app-roadworks-card-button-by-icon',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MaticonPipe, MatBadgeModule],
  templateUrl: './roadworks-card-button-by-icon.component.html',
  styleUrls: ['./roadworks-card-button-by-icon.component.scss']
})
export class RoadworksCardButtonByIconComponent implements OnChanges{

  @Input() title?: string;
  @Input({required: true}) roadworks?: Roadwork[];
  @Input({required: true}) icon?: Roadwork.Icon;

  filteredRoadworks: Roadwork[] = [];

  // important here to use ngOnChanges because the parent component's binding changes after loading the data
  // this occurs after initializing this component
  ngOnChanges(changes: SimpleChanges): void {
    if(this.roadworks && this.icon) {
      this.filteredRoadworks = this.roadworks.filter(r => r.icon === this.icon);
    }
  }

  displayDetails(): void {

  }
}
