/**
 * Defines the SEO properties for a content item.
 * @interface SEOProperties
 * @property {string} metaDescription - The meta description for the content item.
 * @property {string} metaKeywords - The meta keywords for the content item.
 * @property {string} metaHTML - The meta HTML for the content item.
 * @property {boolean} menuVisible - Whether the content item should be visible in the menu.
 * @property {boolean} sitemapVisible - Whether the content item should be visible in the sitemap.
 */

export interface SEOProperties {
    metaDescription: string;
    metaKeywords: string;
    metaHTML: string;
    menuVisible: boolean;
    sitemapVisible: boolean;
  }