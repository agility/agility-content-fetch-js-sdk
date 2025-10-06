import {
    createV1FetchClient,
    createV2FetchClient,
    createV1PreviewClient,
    createV2PreviewClient,
    testConfig
} from '../apiClients.config';

describe('getPageByPath Integration', () => {
    jest.setTimeout(testConfig.testTimeout);

    describe('V1 API', () => {
        it('should retrieve page by path with V1 fetch API', async () => {
            const api = createV1FetchClient();
            
            // First, get the sitemap to find a real page path
            const sitemap = await api.getSitemapFlat({
                channelName: testConfig.testChannelName,
                locale: testConfig.testLocale
            });

            if (!sitemap || Object.keys(sitemap).length === 0) {
                console.log(`ℹ️  No pages found in sitemap - skipping V1 getPageByPath test`);
                return;
            }

            const firstPagePath = Object.keys(sitemap)[0];
            const expectedPageID = sitemap[firstPagePath].pageID;
            
            const result = await api.getPageByPath({
                pagePath: firstPagePath,
                channelName: testConfig.testChannelName,
                locale: testConfig.testLocale
            });

            expect(result).toBeDefined();
            expect(result.sitemapNode).toBeDefined();
            expect(result.sitemapNode.pageID).toBe(expectedPageID);
            expect(result.page).toBeDefined();
            expect(result.page.properties).toBeDefined();
        });

        it('should retrieve page by path with V1 preview API', async () => {
            const api = createV1PreviewClient();
            
            // First, get the sitemap to find a real page path
            const sitemap = await api.getSitemapFlat({
                channelName: testConfig.testChannelName,
                locale: testConfig.testLocale
            });

            if (!sitemap || Object.keys(sitemap).length === 0) {
                console.log(`ℹ️  No pages found in sitemap - skipping V1 preview getPageByPath test`);
                return;
            }

            const firstPagePath = Object.keys(sitemap)[0];
            const expectedPageID = sitemap[firstPagePath].pageID;
            
            const result = await api.getPageByPath({
                pagePath: firstPagePath,
                channelName: testConfig.testChannelName,
                locale: testConfig.testLocale
            });

            expect(result).toBeDefined();
            expect(result.sitemapNode).toBeDefined();
            expect(result.sitemapNode.pageID).toBe(expectedPageID);
            expect(result.page).toBeDefined();
            expect(result.page.properties).toBeDefined();
        });
    });

    describe('V3 API', () => {
        it('should retrieve page by path with V2 fetch API', async () => {
            const api = createV2FetchClient();
            
            // First, get the sitemap to find a real page path
            const sitemap = await api.getSitemapFlat({
                channelName: testConfig.testChannelName,
                locale: testConfig.testLocale
            });

            if (!sitemap || Object.keys(sitemap).length === 0) {
                console.log(`ℹ️  No pages found in sitemap - skipping V2 fetch getPageByPath test`);
                return;
            }

            const firstPagePath = Object.keys(sitemap)[0];
            const expectedPageID = sitemap[firstPagePath].pageID;
            
            const result = await api.getPageByPath({
                pagePath: firstPagePath,
                channelName: testConfig.testChannelName,
                locale: testConfig.testLocale
            });

            expect(result).toBeDefined();
            expect(result.sitemapNode).toBeDefined();
            expect(result.sitemapNode.pageID).toBe(expectedPageID);
            expect(result.page).toBeDefined();
            expect(result.page.properties).toBeDefined();
        });

        it('should retrieve page by path with V2 preview API', async () => {
            const api = createV2PreviewClient();
            
            // First, get the sitemap to find a real page path
            const sitemap = await api.getSitemapFlat({
                channelName: testConfig.testChannelName,
                locale: testConfig.testLocale
            });

            if (!sitemap || Object.keys(sitemap).length === 0) {
                console.log(`ℹ️  No pages found in sitemap - skipping V2 preview getPageByPath test`);
                return;
            }

            const firstPagePath = Object.keys(sitemap)[0];
            const expectedPageID = sitemap[firstPagePath].pageID;
            
            const result = await api.getPageByPath({
                pagePath: firstPagePath,
                channelName: testConfig.testChannelName,
                locale: testConfig.testLocale
            });

            expect(result).toBeDefined();
            expect(result.sitemapNode).toBeDefined();
            expect(result.sitemapNode.pageID).toBe(expectedPageID);
            expect(result.page).toBeDefined();
            expect(result.page.properties).toBeDefined();
        });
    });
});