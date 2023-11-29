import {Road, RoadsService} from '@autobahn/roads';
import {INavData} from '@coreui/angular';
import {NAVIGATION_PROVIDER, NavigationProvider} from '../app.navigation';
import {map} from 'rxjs';
import {EnvironmentProviders, makeEnvironmentProviders} from '@angular/core';

const GROUPING_FACTOR = 4;

function toNavigationNode(roads: Road[]): INavData {
  return {
    name: `${roads[0]} ... ${roads[roads.length - 1]}`,
    iconComponent: {
      name: 'cil-folder'
    },
    children: toNavigationEntries(roads)
  }
}

function toNavigationEntry(road: Road): INavData {
  return {
    name: road,
    url: `/roads/${encodeURIComponent(road)}/`,
  }
}

function groupByLength(roads: Road[], length: number): Road[][] {
  let groupedRoads: Road[][] = [];
  let subGroup: Road[] = [];
  for (let i = 0; i < roads.length; i++) {
    subGroup.push(roads[i]);
    if (i % length == length - 1 || i == roads.length - 1) {
      groupedRoads.push(subGroup);
      subGroup = [];
    }
  }
  return groupedRoads;
}

function toNavigationEntries(roads: Road[]): INavData[] {

  if(roads.length <= GROUPING_FACTOR) {
    return roads.map(road => toNavigationEntry(road));
  }

  const groupingLength =
    roads.length > GROUPING_FACTOR*GROUPING_FACTOR
      ? Math.ceil(roads.length / GROUPING_FACTOR)
      : GROUPING_FACTOR;

  // else split by arrays that contount GROUPING_FACTORY entries
  return groupByLength(roads, groupingLength)
    .map(arr => toNavigationNode(arr));
}

const headerEntries : INavData[] = [
  {
    name: 'Autobahnen',
    title: true
  }
];

export function createRoadsNavigation(roadsService: RoadsService): NavigationProvider {
  return {
    order: 10,
    findNavigationItems: () => roadsService.getRoads()
      .pipe(
        map(roads => toNavigationEntries(roads)),
        map(entries => headerEntries.concat(...entries))
      )
  }
}

export function provideRoadsForNavigation(): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: NAVIGATION_PROVIDER,
      multi: true,
      useFactory: createRoadsNavigation,
      deps: [RoadsService]
    }
  ])
}
