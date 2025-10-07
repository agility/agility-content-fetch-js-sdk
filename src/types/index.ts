/**
 * Agility Content Fetch SDK Types
 * 
 * This is the main entry point for all types used in the SDK.
 * It combines generated API response types with SDK-specific types.
 */

// Export generated API types (namespaced by version)
export { ApiTypes, V1, V2 } from './generated';

// Export SDK-specific types
export * from './sdk';

// For backward compatibility, we'll create some type aliases
// These will be removed in a future major version
import { ApiTypes } from './generated';

/**
 * @deprecated Use ApiTypes.V1.ContentItem or ApiTypes.V2.ContentItem instead
 * This will be removed in v4.0.0
 */
export type ContentItem<T = { [key: string]: any }> = ApiTypes.V1.ContentItem;

/**
 * @deprecated Use ApiTypes.V1.Page or ApiTypes.V2.Page instead
 * This will be removed in v4.0.0
 */
export type Page = ApiTypes.V1.Page;

/**
 * @deprecated Use ApiTypes.V1.Gallery or ApiTypes.V2.Gallery instead
 * This will be removed in v4.0.0
 */
export type Gallery = ApiTypes.V1.Gallery;

/**
 * @deprecated Use ApiTypes.V1.MediaItem or ApiTypes.V2.MediaItem instead
 * This will be removed in v4.0.0
 */
export type MediaItem = ApiTypes.V1.MediaItem;

/**
 * @deprecated Use ApiTypes.V1.SitemapFlat or ApiTypes.V2.SitemapFlat instead
 * This will be removed in v4.0.0
 */
export type SitemapFlat = ApiTypes.V1.SitemapFlat;

/**
 * @deprecated Use ApiTypes.V1.SitemapNested or ApiTypes.V2.SitemapNested instead
 * This will be removed in v4.0.0
 */
export type SitemapNested = ApiTypes.V1.SitemapNested;

/**
 * @deprecated Use ApiTypes.V1.ContentList or ApiTypes.V2.ContentList instead
 * This will be removed in v4.0.0
 */
export type ContentList = ApiTypes.V1.ContentList;

/**
 * @deprecated Use ApiTypes.V1.ContentItemSync or ApiTypes.V2.ContentItemSync instead
 * This will be removed in v4.0.0
 */
export type SyncContent = ApiTypes.V1.ContentItemSync;

/**
 * @deprecated Use ApiTypes.V1.PageSync or ApiTypes.V3.PageSync instead
 * This will be removed in v4.0.0
 */
export type SyncPages = ApiTypes.V1.PageSync;

/**
 * @deprecated Use ApiTypes.V1.UrlRedirection or ApiTypes.V2.UrlRedirection instead
 * This will be removed in v4.0.0
 */
export type URLRedirection = ApiTypes.V1.UrlRedirection;