/**
 * The robots directives for a page.
 * @interface SEORobots
 * @property {boolean} [index] - Whether search engines may index the page.
 * @property {boolean} [follow] - Whether search engines may follow the page's links.
 */
export interface SEORobots {
    index?: boolean;
    follow?: boolean;
}

/**
 * Defines the SEO properties for a content item.
 * @interface SEOProperties
 * @property {string} metaDescription - The meta description for the content item.
 * @property {string} metaKeywords - The meta keywords for the content item.
 * @property {string} metaHTML - The meta HTML for the content item.
 * @property {boolean} menuVisible - Whether the content item should be visible in the menu.
 * @property {boolean} sitemapVisible - Whether the content item should be visible in the sitemap.
 * @property {string} [title] - The page's `<title>`, when it differs from the page title. Pages only; omitted when not set.
 * @property {string} [canonicalUrl] - The page's canonical URL override. Pages only; omitted when not set.
 * @property {SEORobots} [robots] - The page's robots directives. Pages only; omitted when not set.
 * @property {string} [ogImage] - The URL of the page's social share (Open Graph) image. Pages only; omitted when not set.
 */

export interface SEOProperties {
    metaDescription: string;
    metaKeywords: string;
    metaHTML: string;
    menuVisible: boolean;
    sitemapVisible: boolean;
    title?: string;
    canonicalUrl?: string;
    robots?: SEORobots;
    ogImage?: string;
  }
