import {inject, Injectable} from '@angular/core';
import {API_ENDPOINT_URL_BUILDER} from '@app/environment';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Road} from '@autobahn/roads';

@Injectable({
  providedIn: 'root'
})
export class RoadsService {

  private readonly apiEndpoint = inject(API_ENDPOINT_URL_BUILDER);

  constructor(
    private readonly httpClient: HttpClient
  ) {
  }

  getRoads(): Observable<Road[]> {
    return this.httpClient
      .get<RoadsResponse>(this.apiEndpoint(''))
      .pipe(
        map(response => response.roads)
      )
  }

}

interface RoadsResponse {
  roads: Road[];
}
