import {InjectionToken} from "@angular/core";
import {Environment} from './environment-model';
import {environment} from './environment';

export {Environment} from './environment-model';
export {environment} from './environment';

/**
 * The injection token to get the API endpoint.
 * You can get it injected by using constructor parameter
 * <pre>
 *   @Inject(API_ENDPOINT) endpoint: string
 * </pre>
 * or by using the inject function:
 * <pre>
 * private readonly endpoint = inject(API_ENDPOINT_URL_BUILDER);
 * </pre>
 */
export const API_ENDPOINT = new InjectionToken<string>(
  'Autobahn App API endpoint URL',
  {
    providedIn: "root",
    factory: () => environment.apiEndpoint
  }
);

/**
 * The injection token to get the API endpoint URL builder.
 * You can get it injected by using constructor parameter:
 * <pre>
 *   @Inject(API_ENDPOINT_URL_BUILDER) endpoint: (string) => string
 * </pre>
 * or by using the inject function:
 * <pre>
 *   private readonly endpoint = inject(API_ENDPOINT_URL_BUILDER);
 * </pre>
 */
export const API_ENDPOINT_URL_BUILDER = new InjectionToken<(url: string) => string>(
  'Autobahn App API endpoint URL builder',
  {
    providedIn: "root",
    factory: () => url => environment.apiEndpoint + url
  }
);

/**
 * The injection token to get the environment configuration.
 * You can get it injected by using constructor parameter
 * <pre>
 *   @Inject(ENVIRONMENT) environment: Environment
 * </pre>
 */
export const ENVIRONMENT = new InjectionToken<Environment>(
  'Environment information',
  {
    providedIn: "root",
    factory: () => environment
  }
);
