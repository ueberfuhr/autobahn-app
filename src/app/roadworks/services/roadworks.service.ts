import {inject, Injectable} from '@angular/core';
import {API_ENDPOINT_URL_BUILDER} from '@app/environment';
import {RoadWork} from '@app/autobahn';
import {map, Observable} from "rxjs";
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoadworksService {

  // just for demonstration, not my preferred solution!
  private readonly apiEndpoint = inject(API_ENDPOINT_URL_BUILDER);

  constructor(
    private readonly httpClient: HttpClient
  ) {
  }


  findRoadworks(road: string): Observable<RoadWork[]> {
    return this.httpClient
      .get<RoadWorkResponse>(this.apiEndpoint(`/${encodeURIComponent(road)}/services/roadworks`))
      .pipe(
        map(response => response.roadworks)
      )
  }

}

interface RoadWorkResponse {
  roadworks: RoadWork[]
}
