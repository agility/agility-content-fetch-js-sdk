/**
* Defines a **Content Zone** on a page in the CMS.
* @typedef ContentZone
* @memberof AgilityFetch.Types
* @property {string} module - The reference name of the module definition of this module.
* @property {AgilityFetch.Types.ContentItem} item - The contentItem representing the content of this module.
*/
import { ContentItem } from "./ContentItem";
import { ContentReference } from "./ContentReference";

export interface ContentZone {
  module: string;
  item: ContentItem | ContentReference;
  customData?: any;
}
