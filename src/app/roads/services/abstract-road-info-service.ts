import {inject} from '@angular/core';
import {API_ENDPOINT_URL_BUILDER} from '@app/environment';
import {map, Observable} from "rxjs";
import {HttpClient} from '@angular/common/http';
import {Road, RoadInfo} from '@autobahn/roads';

export abstract class AbstractRoadInfoService<E extends RoadInfo, Response> {

  // just for demonstration, not my preferred solution!
  // helpful here to avoid explicit constructor chaining in subclasses
  private readonly apiEndpoint = inject(API_ENDPOINT_URL_BUILDER);
  private readonly httpClient = inject(HttpClient);

  protected abstract getServiceEndpoint(): string;

  protected abstract extract(r: Response): E[];

  public findAll(road: Road): Observable<E[]> {
    return this.httpClient
      .get<Response>(this.apiEndpoint(`/${encodeURIComponent(road)}/services/${this.getServiceEndpoint()}`))
      .pipe(
        map(response => this.extract(response))
      );
  }

}
