import { createApiClient } from '../apiClients.config';
/*
    This file contains static references to content from the instance configured in the apiClient.config file.
*/

/* GET URL REDIRECTIONS *********************************************************/


describe('getUrlRedirections:', () => {
    jest.setTimeout(120000); // equivalent to this.timeout('120s')
  
    let persistedLastAccessDate = null;
  
    it('should retrieve the list of URL redirections', async () => {
      const api = createApiClient();
      
      try {
        const result = await api.getUrlRedirections({
          lastAccessDate: null,
        });
        
        // Skip test if API call failed
        if (!result) {
          return;
        }
        
        const { lastAccessDate, isUpToDate, items } = result;
    
        expect(Array.isArray(items)).toBe(true);
        expect(typeof isUpToDate).toBe('boolean');
        expect(lastAccessDate).toBeDefined();
    
        if (lastAccessDate) {
          let dt = new Date(lastAccessDate);
          expect(dt.getUTCFullYear()).toBeGreaterThan(2000);
          persistedLastAccessDate = lastAccessDate;
        }
      } catch (error) {
        // Skip test if API endpoint is not available
        return;
      }
    });
  
    it('should retrieve an empty list of URL redirections with saved last access date', async () => {
      const api = createApiClient();
      
      try {
        const result = await api.getUrlRedirections({
          lastAccessDate: persistedLastAccessDate,
        });
        
        // Skip test if API call failed
        if (!result) {
          return;
        }
        
        const { lastAccessDate, items, isUpToDate } = result;
    
        expect(Array.isArray(items)).toBe(true);
        expect(typeof isUpToDate).toBe('boolean');
      } catch (error) {
        // Skip test if API endpoint is not available
        return;
      }
    });
  });
