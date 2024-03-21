import { createApiClient } from './apiClients.config';
/*
    This file contains static references to content from the instance configured in the apiClient.config file.
*/

/* GET URL REDIRECTIONS *********************************************************/


describe('getUrlRedirections:', () => {
    jest.setTimeout(120000); // equivalent to this.timeout('120s')
  
    let persistedLastAccessDate = null;
  
    it('should retrieve the list of URL redirections', async () => {
      const api = createApiClient();
      const { lastAccessDate, isUpToDate, items } = await api.getUrlRedirections({
        lastAccessDate: null,
      });
  
      expect(Array.isArray(items)).toBe(true);
      expect(isUpToDate).toBe(false);
      expect(lastAccessDate).toBeDefined();
  
      let dt = new Date(lastAccessDate);
      expect(dt.getUTCFullYear()).toBeGreaterThan(2000);
  
      persistedLastAccessDate = lastAccessDate;
    });
  
    it('should retrieve an empty list of URL redirections with saved last access date', async () => {
      const api = createApiClient();
      const { lastAccessDate, items, isUpToDate } = await api.getUrlRedirections({
        lastAccessDate: persistedLastAccessDate,
      });
  
      expect(Array.isArray(items)).toBe(true);
      expect(isUpToDate).toBe(true);
      expect(items.length).toBe(0);
    });
  });
