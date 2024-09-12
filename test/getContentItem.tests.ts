import {
    createApiClient,
    createPreviewApiClient
} from './apiClients.config';

/*
    This file contains static references to content from the instance configured in the apiClient.config file.
*/

const ref = {
    publishedContentItemID: 15,
    updatesMadeToPublishedContentItemID: 15
}

describe('getContentItem:', () => {
    jest.setTimeout(120000);

    it('should retrieve a content item in live/fetch mode and only return published content', async () => {
        const api = createApiClient();
        const contentItem = await api.getContentItem({
            contentID: ref.updatesMadeToPublishedContentItemID,
            locale: 'en-us'
        });
        expect(contentItem.contentID).toBe(ref.updatesMadeToPublishedContentItemID);
        expect(contentItem.fields.title).not.toMatch(/\[Staging\]/);
    });

    it('should retrieve a content item in preview mode and return the latest staging version', async () => {
        const api = createPreviewApiClient();
        const contentItem = await api.getContentItem({
            contentID: ref.updatesMadeToPublishedContentItemID,
            locale: 'en-us'
        });
        expect(contentItem.contentID).toBe(ref.updatesMadeToPublishedContentItemID);
        expect(contentItem.fields.title).toMatch(/\[Staging\]/);
    });

    // it('should retrieve a content item in live/fetch mode, then subsequent requests are returned from cache (memory)', async () => {
    //     const api = createCachedApiClient();
    //     const contentItem = await api.getContentItem({
    //         contentID: ref.updatesMadeToPublishedContentItemID,
    //         locale: 'en-us'
    //     });

    //     expect(contentItem.contentID).toBe(ref.updatesMadeToPublishedContentItemID);
    //     expect(contentItem.fromCache).toBeFalsy();

    //     const contentItem2 = await api.getContentItem({
    //         contentID: ref.updatesMadeToPublishedContentItemID,
    //         locale: 'en-us'
    //     });

    //     expect(contentItem2.contentID).toBe(ref.updatesMadeToPublishedContentItemID);
    //     expect(contentItem2.fromCache).toBeTruthy();
    // });

    it('should throw error if locale not passed as argument for getContentItem', async () => {
        const api = createApiClient();
        let err
        try {
            await api.getContentItem({
                contentID: 22
            })
        } catch (error) {
            err = error
        }
        expect(err).toBeDefined()
    });

    it('should expand all content links when expandContentLinks are set to true', async () => {
        const api = createApiClient();
        const contentItem = await api.getContentItem({
            contentID: 65,
            locale: 'en-us',
            expandAllContentLinks: true
        });
        expect(Array.isArray(contentItem.fields.posts)).toBe(true);
    });

    it('should NOT expand all content links when expandContentLinks are set to false', async () => {
        const api = createApiClient();
        const contentItem = await api.getContentItem({
            contentID: 65,
            locale: 'en-us',
            expandAllContentLinks: false
        });
        expect(Array.isArray(contentItem.fields.posts)).toBe(false);
    });

    it('should NOT expand all content links when expandContentLinks is not set', async () => {
        const api = createApiClient();
        const contentItem = await api.getContentItem({
            contentID: 65,
            locale: 'en-us'
        });
        expect(Array.isArray(contentItem.fields.posts)).toBe(false);
    });
