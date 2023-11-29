import {Injectable} from '@angular/core';
import {EMPTY as EmptyObservable, forkJoin, map, Observable} from "rxjs";
import {RoadworksService} from './roadworks.service';
import {WarningsService} from './warnings.service';
import {ClosuresService} from './closures.service';
import {Road} from '../models/road.model';
import {RoadEvent} from '../models/road-event-model';
import {AbstractRoadInfoService} from './abstract-road-info-service';

@Injectable({
  providedIn: 'root'
})
export class CompositeRoadEventsService {

  // just for demonstration, not my preferred solution!

  private readonly services: AbstractRoadInfoService<RoadEvent, any>[];

  constructor(
    private readonly roadworksService: RoadworksService,
    private readonly warningsService: WarningsService,
    private readonly closures: ClosuresService
  ) {
    this.services = [
      roadworksService,
      warningsService,
      closures
    ]
  }

  public findEach(
    road: Road,
    observableFunction: (obs: Observable<RoadEvent[]>) => Observable<RoadEvent[]> = obs => obs
  ): CompositeRoadEvents {
    return {
      roadworks$: observableFunction(this.roadworksService.findAll(road)),
      warnings$: observableFunction(this.warningsService.findAll(road)),
      closures$: observableFunction(this.closures.findAll(road))
    }
  }

  public findAll(road: Road): Observable<RoadEvent[]> {
    return forkJoin(
      this.services
        .map(s => s.findAll(road))
    ).pipe(
      map(
        results => results.reduce(
          (accumulator, value) => accumulator.concat(value),
          []
        )
      )
    )
  }

}

export interface CompositeRoadEvents {
  roadworks$: Observable<RoadEvent[]>,
  warnings$: Observable<RoadEvent[]>,
  closures$: Observable<RoadEvent[]>,
}

export namespace CompositeRoadEvents {

  export const EMPTY: CompositeRoadEvents = {
    roadworks$: EmptyObservable,
    closures$: EmptyObservable,
    warnings$: EmptyObservable
  }

}
