// Assuming you have imported createApiClient, createPreviewApiClient, and the necessary dependencies
import { createApiClient, createPreviewApiClient } from './apiClients.config';

describe('getPage:', () => {
  jest.setTimeout(120000); // equivalent to this.timeout('120s')

  it('should get a page by path', async () => {
    const api = createApiClient();
    const page = await api.getPageByPath({
      pagePath: '/posts',
      channelName: 'website',
      locale: 'en-us',
    });
    expect(page).toBeDefined();
  })

});
