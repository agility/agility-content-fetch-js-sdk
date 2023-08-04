import { createApiClient } from './apiClients.config';

/*
    This file contains static references to content from the instance configured in the apiClient.config file.
*/
describe('getSyncContent:', () => {
    jest.setTimeout(120000); // equivalent to this.timeout('120s')
  
    it('should retrieve the oldest content items and next sync token', async () => {
      const api = createApiClient();
  
      let syncToken = 0;
  
      //sync from scratch
      const syncRet = await api.getSyncContent({
        syncToken: syncToken,
        pageSize: 100,
        locale: 'en-us',
      });
  
      expect(syncRet.syncToken).toBeGreaterThan(0);
      expect(syncRet.items.length).toBeGreaterThan(0);
    });
  });

