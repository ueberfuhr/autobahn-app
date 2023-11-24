import {inject, Injectable} from '@angular/core';
import {API_ENDPOINT_URL_BUILDER} from '@app/environment';
import {map, Observable} from "rxjs";
import {HttpClient} from '@angular/common/http';
import {Road} from '@autobahn/roads';
import {Roadwork} from '@autobahn/roadworks';

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

  getRoadworks(road: Road): Observable<Roadwork[]> {
    return this.httpClient
      .get<RoadWorksResponse>(this.apiEndpoint(`/${encodeURIComponent(road)}/services/roadworks`))
      .pipe(
        map(response => response.roadworks)
      )
  }

}

interface RoadWorksResponse {
  roadworks: Roadwork[]
}
