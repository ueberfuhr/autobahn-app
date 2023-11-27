import {Environment} from "./environment-model";

export const environment: Environment = {
  stage: "prod",
  apiEndpoint: 'https://verkehr.autobahn.de/o/autobahn/',
  ui: {
    title: 'Autobahn App'
  }
}
