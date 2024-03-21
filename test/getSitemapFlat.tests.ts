import { createApiClient, createPreviewApiClient } from './apiClients.config';

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
      expect(sitemap['/home'].pageID).toBe(2);
    });
  
    it('should retrieve a sitemap in a flat format in preview mode', async () => {
      const api = createPreviewApiClient();
      const sitemap = await api.getSitemapFlat({
        channelName: 'website',
        locale: 'en-us',
      });
      expect(sitemap['/home'].pageID).toBe(2);
    });
  
  });
