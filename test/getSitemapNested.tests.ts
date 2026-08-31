import { createApiClient, createPreviewApiClient } from './apiClients.config';

/*
    This file contains static references to content from the instance configured in the apiClient.config file.
*/


/* GET SITEMAP NESTED **************************************************/
describe('getSitemapNested:', () => {
    jest.setTimeout(120000); // equivalent to this.timeout('120s')

    //assert on the shape of the nested format rather than specific pageIDs, which change as the instance's content changes
    const expectNestedSitemap = (sitemap: any) => {
      expect(Array.isArray(sitemap)).toBe(true);
      expect(sitemap.length).toBeGreaterThan(0);
      expect(typeof sitemap[0].pageID).toBe('number');
      expect(typeof sitemap[0].path).toBe('string');
      //the nested format (unlike flat) exposes children arrays on nodes
      expect(sitemap.some((node: any) => Array.isArray(node.children))).toBe(true);
    };

    it('should retrieve a sitemap in a nested format in live mode', async () => {
      const api = createApiClient();
      const sitemap = await api.getSitemapNested({
        channelName: 'website',
        locale: 'en-us',
      });
      expectNestedSitemap(sitemap);
    });

    it('should retrieve a sitemap in a nested format in preview mode', async () => {
      const api = createPreviewApiClient();
      const sitemap = await api.getSitemapNested({
        channelName: 'website',
        locale: 'en-us',
      });
      expectNestedSitemap(sitemap);
    });

  });
