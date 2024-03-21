import {
    createApiClient,
  } from './apiClients.config';
  

/*
    This file contains static references to content from the instance configured in the apiClient.config file.
*/

/* GET GALLERY *********************************************************/
describe('getGallery:', () => {
  jest.setTimeout(120000); // equivalent to this.timeout('120s')

  it('should retrieve a Gallery in live mode', async () => {
    const api = createApiClient();
    const gallery = await api.getGallery({
      galleryID: 1,
    });
    expect(gallery.galleryID).toBe(1);
  });
});

