import {Injectable} from '@angular/core';
import {AbstractRoadInfoService} from './abstract-road-info-service';
import {RoadEvent} from '@autobahn/roads';

@Injectable({
  providedIn: 'root'
})
export class WarningsService extends AbstractRoadInfoService<RoadEvent, WarningsResponse> {
  protected override getServiceEndpoint(): string {
    return 'warning';
  }

  protected override extract(r: WarningsResponse): RoadEvent[] {
    return r.warning;
  }

}

interface WarningsResponse {
  warning: RoadEvent[]
}
