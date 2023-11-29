import {Injectable} from '@angular/core';
import {AbstractRoadInfoService} from './abstract-road-info-service';
import {RoadEvent} from '@autobahn/roads';

@Injectable({
  providedIn: 'root'
})
export class ClosuresService extends AbstractRoadInfoService<RoadEvent, ClosuresResponse> {
  protected override getServiceEndpoint(): string {
    return 'closure';
  }

  protected override extract(r: ClosuresResponse): RoadEvent[] {
    return r.closure;
  }

}

interface ClosuresResponse {
  closure: RoadEvent[]
}
