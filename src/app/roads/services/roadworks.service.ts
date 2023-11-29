import {Injectable} from '@angular/core';
import {AbstractRoadInfoService} from './abstract-road-info-service';
import {RoadEvent} from '@autobahn/roads';

@Injectable({
  providedIn: 'root'
})
export class RoadworksService extends AbstractRoadInfoService<RoadEvent, RoadworksResponse> {
  protected override getServiceEndpoint(): string {
    return 'roadworks';
  }

  protected override extract(r: RoadworksResponse): RoadEvent[] {
    return r.roadworks;
  }

}

interface RoadworksResponse {
  roadworks: RoadEvent[]
}
