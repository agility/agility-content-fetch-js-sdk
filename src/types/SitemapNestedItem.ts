 /**
 * Represents an item in a sitemap response
 * @typedef {Object} SitemapNestedItem
 * @memberof AgilityFetch.Types
 * @property {number} pageID - The unique ID of the page in Agility in this language.
 * @property {string} title - A human-friendly title for the page, typically used for SEO and displayed in the browser tab/bar.
 * @property {string} name - The URL friendly name of the page.
 * @property {string} menuText - An alternate page title, often used when generating dynamic menus.
 * @property {string} pageType - Describes what type of page this is - values include *static*, *dynamic*, *dynamic_node*, *folder*, and *link*
 * @property {AgilityFetch.Types.SystemProperties} properties - The system properties of this page item.
 * @property {Array.<AgilityFetch.Types.SitemapNestedItem>} [children] - The children of this page
 * @property {string} [redirectUrl] - If this page is a *link*, then this property will show the intended destination redirect.
 * @property {number} [dynamicItemContentID] - If this page is a dynamic page, then this property will show the associated contentID of the dynamic content item.
 * @property {AgilityFetch.Types.SitemapVisibility} visible - Object that contains properties pertaining to the intended visibility of this page for seo and menus.
 */
import { SystemProperties } from "./SystemProperties";
import { SitemapVisibility } from "./SitemapVisibility";

    export interface SitemapNestedItem {
      pageID: number;
      title: string;
      name: string;
      path: string;
      menuText: string;
      pageType: "static" | "dynamic" | "dynamic_node" | "folder" | "link";
      properties: SystemProperties; // Replace with the actual SystemProperties interface
      redirectUrl?: string;
      dynamicItemContentID?: number;
      visible: SitemapVisibility; // Replace with the actual SitemapVisibility type
      pages?: SitemapNestedItem[]; // Recursive reference to nested pages
    }
  