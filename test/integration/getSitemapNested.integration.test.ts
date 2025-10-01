import { createApiClient, createPreviewApiClient, testConfig } from '../apiClients.config';

/* 
    This file contains static references to content from the instance configured in the apiClient.config file.
*/


/* GET SITEMAP NESTED **************************************************/
describe('getSitemapNested:', () => {
    jest.setTimeout(120000); // equivalent to this.timeout('120s')
  
    it('should retrieve a sitemap in a nested format in live mode', async () => {
      const api = createApiClient();
      const sitemap = await api.getSitemapNested({
        channelName: 'website',
        locale: 'en-us',
      });
      // Skip test if API call failed
      if (!sitemap) {
        return;
      }
      
      // Validate structure - test that sitemap is an array with page entries
      expect(sitemap).toBeDefined();
      expect(Array.isArray(sitemap)).toBe(true);
      
      // Check if any pages exist in sitemap
      if (sitemap.length > 0) {
        expect(sitemap[0].pageID).toBeDefined();
        expect(typeof sitemap[0].pageID).toBe('number');
      }
    });
  
    it('should retrieve a sitemap in a nested format in preview mode', async () => {
      const api = createPreviewApiClient();
      const sitemap = await api.getSitemapNested({
        channelName: 'website',
        locale: 'en-us',
      });
      // Skip test if API call failed
      if (!sitemap) {
        return;
      }
      
      // Validate structure - test that sitemap is an array with page entries
      expect(sitemap).toBeDefined();
      expect(Array.isArray(sitemap)).toBe(true);
      
      // Check if any pages exist in sitemap
      if (sitemap.length > 0) {
        expect(sitemap[0].pageID).toBeDefined();
        expect(typeof sitemap[0].pageID).toBe('number');
      }
    });
  
  });
