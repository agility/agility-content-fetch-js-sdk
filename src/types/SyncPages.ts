 /**
 * Defines **Sync Pages** response.
 * @typedef SyncPages
 * @memberof AgilityFetch.Types
 * @property {number} syncToken - The sync token to be used in the next call as a continuation token for syncing content. If this is empty, you are up to date.
* @property {Array.<AgilityFetch.Types.Page>} items - The paginated array of items returned by the request. 
 */

import { Page } from "./Page";

export interface SyncPages {
    syncToken: number;
    items: Page[];
  }