/**
 * Defines the custom scripts configured on a **Page** in the CMS.
 * @interface PageScripts
 * @memberof AgilityFetch.Types
 * @property {boolean} excludedFromGlobal - Whether this page opts out of the instance's global scripts. When `true`, the global head and body scripts should not be rendered on this page.
 * @property {string | null} top - The page's custom head scripts (HTML to render inside `<head>`), or `null` if none are set.
 * @property {string | null} bottom - The page's custom body scripts (HTML to render at the end of `<body>`), or `null` if none are set.
 */

export interface PageScripts {
    excludedFromGlobal: boolean;
    top: string | null;
    bottom: string | null;
}
