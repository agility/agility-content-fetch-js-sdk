/**
 * Generated API Types
 * 
 * This file provides namespaced access to generated types from Swagger specs.
 * Types are organized by API version (V1, V3) for clear separation.
 */

import * as V1Schema from './v1';
import * as V3Schema from './v3';

export namespace ApiTypes {
  export namespace V1 {
    // Content Types
    export type ContentItem = V1Schema.components['schemas']['HeadlessContentItem'];
    export type ContentList = V1Schema.components['schemas']['HeadlessContentListResponse'];
    export type ContentItemSync = V1Schema.components['schemas']['HeadlessContentItemHeadlessSync'];
    
    // Page Types
    export type Page = V1Schema.components['schemas']['HeadlessContentPage'];
    export type PageByPath = V1Schema.components['schemas']['HeadlessContentPageByPath'];
    export type PageSync = V1Schema.components['schemas']['HeadlessContentPageHeadlessSync'];
    
    // Sitemap Types
    export type SitemapFlat = { [key: string]: V1Schema.components['schemas']['HeadlessContentSiteMapItem'] };
    export type SitemapNested = V1Schema.components['schemas']['HeadlessContentSiteMapNestedItem'][];
    export type SitemapItem = V1Schema.components['schemas']['HeadlessContentSiteMapItem'];
    export type SitemapNestedItem = V1Schema.components['schemas']['HeadlessContentSiteMapNestedItem'];
    
    // Media Types
    export type Gallery = V1Schema.components['schemas']['HeadlessGallery'];
    export type MediaItem = V1Schema.components['schemas']['HeadlessMediaItem'];
    
    // Other Types
    export type UrlRedirection = V1Schema.components['schemas']['UrlRedirection'];
    
    // Component Types
    export type ContentZone = V1Schema.components['schemas']['HeadlessContentZone'];
    export type ContentItemProperties = V1Schema.components['schemas']['HeadlessContentItemProperties'];
    export type ContentItemSeo = V1Schema.components['schemas']['HeadlessContentItemSeo'];
    export type PageVisibility = V1Schema.components['schemas']['HeadlessContentPageVisibility'];
  }

  export namespace V3 {
    // Content Types
    export type ContentItem = V3Schema.components['schemas']['HeadlessContentItem'];
    export type ContentList = V3Schema.components['schemas']['HeadlessContentListResponse'];
    export type ContentItemSync = V3Schema.components['schemas']['HeadlessContentItemHeadlessSync'];
    
    // Page Types
    export type Page = V3Schema.components['schemas']['HeadlessContentPage'];
    export type PageByPath = V3Schema.components['schemas']['HeadlessContentPageByPath'];
    export type PageSync = V3Schema.components['schemas']['HeadlessContentPageHeadlessSync'];
    
    // Sitemap Types
    export type SitemapFlat = { [key: string]: V3Schema.components['schemas']['HeadlessContentSiteMapItem'] };
    export type SitemapNested = V3Schema.components['schemas']['HeadlessContentSiteMapNestedItem'][];
    export type SitemapItem = V3Schema.components['schemas']['HeadlessContentSiteMapItem'];
    export type SitemapNestedItem = V3Schema.components['schemas']['HeadlessContentSiteMapNestedItem'];
    
    // Media Types
    export type Gallery = V3Schema.components['schemas']['HeadlessGallery'];
    export type MediaItem = V3Schema.components['schemas']['HeadlessMediaItem'];
    
    // Other Types
    export type UrlRedirection = V3Schema.components['schemas']['UrlRedirection'];
    
    // Component Types
    export type ContentZone = V3Schema.components['schemas']['HeadlessContentZone'];
    export type ContentItemProperties = V3Schema.components['schemas']['HeadlessContentItemProperties'];
    export type ContentItemSeo = V3Schema.components['schemas']['HeadlessContentItemSeo'];
    export type PageVisibility = V3Schema.components['schemas']['HeadlessContentPageVisibility'];
  }
}

// Export the raw generated types for advanced usage
export { V1Schema as V1, V3Schema as V3 };
