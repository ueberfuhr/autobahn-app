import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ListWebcamsComponent} from '@autobahn/webcams';

@Component({
  selector: 'app-webcams-index',
  standalone: true,
  imports: [CommonModule, ListWebcamsComponent],
  template: '<app-list-webcams></app-list-webcams>'
})
export class WebcamsIndexComponent {

}
