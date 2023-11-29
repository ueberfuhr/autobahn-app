import {Injectable} from '@angular/core';
import {AbstractRoadInfoService} from './abstract-road-info-service';
import {Webcam} from '../models/webcam.model';

@Injectable({
  providedIn: 'root'
})
export class WebcamsService extends AbstractRoadInfoService<Webcam, WebcamsResponse>{
  protected override getServiceEndpoint(): string {
      return 'webcam';
  }
  protected override extract(r: WebcamsResponse): Webcam[] {
      return r.webcam;
  }

}

interface WebcamsResponse {
  webcam: Webcam[]
}
