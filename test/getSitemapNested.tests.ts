import { createApiClient, createPreviewApiClient } from './apiClients.config';

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
      expect(sitemap[0].pageID).toBe(3);
    });
  
    it('should retrieve a sitemap in a nested format in preview mode', async () => {
      const api = createPreviewApiClient();
      const sitemap = await api.getSitemapNested({
        channelName: 'website',
        locale: 'en-us',
      });
      expect(sitemap[0].pageID).toBe(2);
    });
  
  });
