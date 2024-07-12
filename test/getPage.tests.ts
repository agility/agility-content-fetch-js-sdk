// Assuming you have imported createApiClient, createPreviewApiClient, and the necessary dependencies
import { createApiClient, createPreviewApiClient } from './apiClients.config';

describe('getPage:', () => {
  jest.setTimeout(120000); // equivalent to this.timeout('120s')

  it('should retrieve a page in live mode', async () => {
    const api = createApiClient();
    const page = await api.getPage({
      pageID: 3,
      locale: 'en-us',
    });

    expect(page.pageID).toBe(3);
  });


  it('should retrieve a page in preview mode', async () => {
    const api = createPreviewApiClient();
    const page = await api.getPage({
      pageID: 3,
      locale: 'en-us',
    });

    expect(page.pageID).toBe(3);
  });

  it('should not show a console error if a page is not found', async () => {
    const api = createPreviewApiClient();
    const page = await api.getPage({
      pageID: 999999,
      locale: 'en-us',
    });

    expect(page).toBe(undefined);
  });

  it('should retrieve a page and expand all content links when expandAllContentLink is set to true', async () => {
    const api = createApiClient();
    const page = await api.getPage({
      pageID: 3,
      locale: 'en-us',
      expandAllContentLinks: true,
      contentLinkDepth: 2,
    });
    expect(Array.isArray(page.zones.MainContentZone[0].item.fields.posts)).toBe(true);
  });


});
