 /**
 * Defines **URL Redirection** response.
 * @typedef URLRedirectionResponse
 * @memberof AgilityFetch.Types
 * @property {Array} syncToken - The sync token to be used in the next call as a continuation token for syncing content. If this is empty, you are up to date.
 * @property {Array.<AgilityFetch.Types.Page>} items - The paginated array of items returned by the request.
 */

 import { Page } from "./Page";


 export interface URLRedirectionResponse {
    syncToken: any; // Replace 'any' with the appropriate type for syncToken (e.g., number, string, etc.)
    items: Page[];
  }