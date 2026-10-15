/**
 * The schema.org page type a page describes itself as. Used as the `@type` of the page's
 * WebPage node when JSON-LD is generated.
 * @typedef SchemaType
 * @memberof AgilityFetch.Types
 */
export type SchemaType =
    | "WebPage"
    | "AboutPage"
    | "ContactPage"
    | "CollectionPage"
    | "FAQPage"
    | "ItemPage"
    | "ProfilePage";

/**
 * Whether a page is listed in the site's llms.txt.
 * - `inherit`: follow the page's sitemap visibility.
 * - `include`: always list it.
 * - `exclude`: never list it.
 * @typedef LlmsInclude
 * @memberof AgilityFetch.Types
 */
export type LlmsInclude = "inherit" | "include" | "exclude";

/**
 * Whether AI crawlers may crawl a page.
 * - `inherit`: follow the site's AI-crawler policy.
 * - `block`: disallow this page's path for AI crawlers in robots.txt.
 * @typedef AiCrawl
 * @memberof AgilityFetch.Types
 */
export type AiCrawl = "inherit" | "block";

/**
 * A page's AI-engine settings.
 * @interface GeoAi
 * @memberof AgilityFetch.Types
 * @property {AgilityFetch.Types.LlmsInclude} [llmsInclude] - Whether the page is listed in llms.txt.
 * @property {AgilityFetch.Types.AiCrawl} [crawl] - Whether AI crawlers may crawl the page.
 */
export interface GeoAi {
    llmsInclude?: LlmsInclude;
    crawl?: AiCrawl;
}

/**
 * JSON-LD supplied by an editor: a single object (which may hold an `@graph`) or an array of objects.
 * @typedef StructuredData
 * @memberof AgilityFetch.Types
 */
export type StructuredData = Record<string, unknown> | Record<string, unknown>[];

/**
 * The GEO / AEO (generative and answer engine optimization) properties of a **Page**.
 * Every property is optional, and the API leaves out any property that isn't set.
 * Unknown properties may be added in later versions, so don't treat this shape as closed.
 * @interface GeoProperties
 * @memberof AgilityFetch.Types
 * @property {AgilityFetch.Types.SchemaType} [schemaType] - The schema.org page type (defaults to `WebPage` when not set).
 * @property {string} [summary] - A short, answer-first plain-text summary of the page.
 * @property {AgilityFetch.Types.StructuredData} [structuredData] - Editor-supplied JSON-LD, merged into the page's generated structured data.
 * @property {AgilityFetch.Types.GeoAi} [ai] - The page's AI-engine settings (llms.txt listing, AI-crawler access).
 */
export interface GeoProperties {
    schemaType?: SchemaType;
    summary?: string;
    structuredData?: StructuredData;
    ai?: GeoAi;
}
