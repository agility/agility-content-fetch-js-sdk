// Type-level tests for the GEO / AEO page properties (PROD-2726). ts-jest type-checks this file,
// so a shape that no longer matches the Fetch API contract fails the suite. No API calls.
import type { Page, GeoProperties, SEOProperties, SchemaType } from '../src/index';

describe('GEO types:', () => {
  it('accepts a page with geo and the new seo properties', () => {
    const seo: SEOProperties = {
      metaDescription: 'Description',
      metaKeywords: '',
      metaHTML: '',
      menuVisible: true,
      sitemapVisible: true,
      title: 'An independent <title>',
      canonicalUrl: 'https://example.com/about',
      robots: { index: true, follow: false },
      ogImage: 'https://cdn.example.com/share.png',
    };

    const geo: GeoProperties = {
      schemaType: 'AboutPage',
      summary: 'An answer-first summary.',
      structuredData: { '@context': 'https://schema.org', '@type': 'Organization', name: 'Example' },
      ai: { llmsInclude: 'include', crawl: 'inherit' },
    };

    const page: Page = {
      pageID: 1,
      name: 'about',
      path: '/about',
      title: 'About',
      menuText: 'About',
      pageType: 'static',
      templateName: 'Main',
      securePage: false,
      properties: {} as Page['properties'],
      zones: {},
      visible: { menu: true, sitemap: true },
      seo,
      geo,
    };

    expect(page.geo?.schemaType).toBe('AboutPage');
    expect(page.seo?.robots?.follow).toBe(false);
  });

  it('accepts structuredData as an array and an empty geo', () => {
    const geo: GeoProperties = {
      structuredData: [{ '@type': 'WebPage' }, { '@type': 'BreadcrumbList' }],
    };
    const empty: GeoProperties = {};
    expect(Array.isArray(geo.structuredData)).toBe(true);
    expect(empty.ai).toBeUndefined();
  });

  it('keeps the existing seo shape valid without the new properties', () => {
    const seo: SEOProperties = {
      metaDescription: '',
      metaKeywords: '',
      metaHTML: '',
      menuVisible: false,
      sitemapVisible: false,
    };
    expect(seo.title).toBeUndefined();
  });

  it('limits schemaType to the supported schema.org page types', () => {
    // @ts-expect-error Article is an entity type, not a page type
    const bad: SchemaType = 'Article';
    const good: SchemaType = 'CollectionPage';
    expect([bad, good]).toHaveLength(2);
  });
});
