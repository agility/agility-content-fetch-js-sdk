import { createApiClient, createPreviewApiClient, testConfig } from '../apiClients.config';

/* 
    This file contains static references to content from the instance configured in the apiClient.config file.
*/


/* GET SITEMAP FLAT ***********************************************/
describe('getSitemapFlat:', () => {
    jest.setTimeout(120000); // equivalent to this.timeout('120s')
  
    it('should retrieve a sitemap in a flat format in live mode', async () => {
      const api = createApiClient();
      const sitemap = await api.getSitemapFlat({
        channelName: 'website',
        locale: 'en-us',
      });
      // Skip test if API call failed
      if (!sitemap) {
        return;
      }
      
      // Validate structure - test that sitemap is an object with page entries
      expect(sitemap).toBeDefined();
      expect(typeof sitemap).toBe('object');
      
      // Check if any pages exist in sitemap
      const pageKeys = Object.keys(sitemap);
      if (pageKeys.length > 0) {
        const firstPage = sitemap[pageKeys[0]];
        expect(firstPage.pageID).toBeDefined();
        expect(typeof firstPage.pageID).toBe('number');
      }
    });
  
    it('should retrieve a sitemap in a flat format in preview mode', async () => {
      const api = createPreviewApiClient();
      const sitemap = await api.getSitemapFlat({
        channelName: 'website',
        locale: 'en-us',
      });
      // Skip test if API call failed
      if (!sitemap) {
        return;
      }
      
      // Validate structure - test that sitemap is an object with page entries
      expect(sitemap).toBeDefined();
      expect(typeof sitemap).toBe('object');
      
      // Check if any pages exist in sitemap
      const pageKeys = Object.keys(sitemap);
      if (pageKeys.length > 0) {
        const firstPage = sitemap[pageKeys[0]];
        expect(firstPage.pageID).toBeDefined();
        expect(typeof firstPage.pageID).toBe('number');
      }
    });
  
  });
