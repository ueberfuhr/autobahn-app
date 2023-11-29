import {RoadInfo} from './road-info-model';

export interface RoadEvent extends RoadInfo {
  isBlocked: boolean,
  future: false,
  startTimestamp: Date
}
