/**
 * The kind of stages.
 */
export type Stage = 'dev' | 'prod' | 'unknown';

export interface Environment {

  apiEndpoint: string
  stage: Stage
  ui: {
    title: string
  }

}

