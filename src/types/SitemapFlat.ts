 /**
 * A dictionary/map of all page routes. The key of this dictionary is the page path for a page.
 * @typedef {Object.<string, AgilityFetch.Types.SitemapFlatItem>} SitemapFlat - The valid page routes.
 * @memberof AgilityFetch.Types
 */
import { SitemapFlatItem } from "./SitemapFlatItem";


    export interface SitemapFlat {
      [key: string]: SitemapFlatItem;
    }
  
    // Define the SitemapFlatItem interface if necessary
    // interface SitemapFlatItem {
    //   // Define properties of AgilityFetch.Types.SitemapFlatItem if needed
    //   // For example:
    //   pageID: number;
    //   title: string;
    //   // ... other properties
    // }