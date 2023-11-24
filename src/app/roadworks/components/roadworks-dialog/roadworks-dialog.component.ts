import {Component, Inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Road} from '@autobahn/roads';
import {Roadwork} from '@autobahn/roadworks';

@Component({
  selector: 'app-roadworks-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './roadworks-dialog.component.html',
  styleUrl: './roadworks-dialog.component.scss'
})
export class RoadworksDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public readonly data: RoadWorksDialogData
  ) {
  }

}

export interface RoadWorksDialogData {
  road: Road,
  roadworks: Roadwork[]
}
