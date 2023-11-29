import {RoadInfo} from '@autobahn/roads';

export interface Webcam extends RoadInfo{
  operator: string,
  imageurl: string,
  linkurl: string
}
