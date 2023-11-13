import { SEOProperties } from "./SEO";


interface ContentItemProperties {
  state: number
  modified: Date
  versionID: number
  referenceName: string
  definitionName: string
  itemOrder: number
}

/**
 * Defines a **Content Item** in the CMS
 * @typedef ContentItem
 * @memberof AgilityFetch.Types
 * @property {number} contentID - The unique ID of the content item in this language.
 * @property {ContentItemProperties} properties - The system properties of the content item.
 * @property {Object} fields - A dictionary of the fields and the values of the content item.
 * @property {SEOProperties} seo - Any SEO related fields for the content item. This is only returned for Dynamic Page Items.
*/


export interface ContentItem<T = { [key: string]: any }> {
  contentID: number;
  properties: ContentItemProperties;
  fields: T;
  seo?: SEOProperties;
}
