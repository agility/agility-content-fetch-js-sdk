// Assuming you have imported createApiClient, createPreviewApiClient, and the necessary dependencies
import { createApiClient, createPreviewApiClient } from './apiClients.config';

describe('getPage:', () => {
  jest.setTimeout(120000); // equivalent to this.timeout('120s')

  it('should retrieve a page in live mode', async () => {
    const api = createApiClient();
    const page = await api.getPage({
      pageID: 2,
      locale: 'en-us',
    });
    console.log(page, 'check this')
    expect(page.pageID).toBe(2);
  });


  it('should retrieve a page in preview mode', async () => {
    const api = createPreviewApiClient();
    const page = await api.getPage({
      pageID: 2,
      locale: 'en-us',
    });
    console.log(page, 'check this')
    expect(page.pageID).toBe(2);
  });

  it('should retrieve a page and expand all content links when expandAllContentLink is set to true', async () => {
    const api = createApiClient();
    const page = await api.getPage({
      pageID: 2,
      locale: 'en-us',
      expandAllContentLinks: true,
    });
    expect(Array.isArray(page.zones.MainContentZone[2].item.fields.posts)).toBe(true);
  });

  
});
