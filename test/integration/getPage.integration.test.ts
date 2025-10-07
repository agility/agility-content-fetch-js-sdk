import {
    createV1FetchClient,
    createV2FetchClient,
    createV1PreviewClient,
    createV2PreviewClient,
    testConfig
} from '../apiClients.config';

describe('getPage Integration', () => {
    jest.setTimeout(testConfig.testTimeout);

    describe('V1 API', () => {
        it('should retrieve page with V1 fetch API', async () => {
            const api = createV1FetchClient();
            
            // First, get the sitemap to find a real page ID
            const sitemap = await api.getSitemapFlat({
                channelName: testConfig.testChannelName,
                locale: testConfig.testLocale
            });

            if (!sitemap || Object.keys(sitemap).length === 0) {
                console.log(`ℹ️  No pages found in sitemap - skipping V1 getPage test`);
                return;
            }

            const firstPagePath = Object.keys(sitemap)[0];
            const pageID = sitemap[firstPagePath].pageID;
            
            const result = await api.getPage({
                pageID: pageID,
                locale: testConfig.testLocale
            });

            expect(result).toBeDefined();
            expect(result.pageID).toBe(pageID);
            expect(result.properties).toBeDefined();
        });

        it('should retrieve page with V1 preview API', async () => {
            const api = createV1PreviewClient();
            
            // First, get the sitemap to find a real page ID
            const sitemap = await api.getSitemapFlat({
                channelName: testConfig.testChannelName,
                locale: testConfig.testLocale
            });

            if (!sitemap || Object.keys(sitemap).length === 0) {
                console.log(`ℹ️  No pages found in sitemap - skipping V1 preview getPage test`);
                return;
            }

            const firstPagePath = Object.keys(sitemap)[0];
            const pageID = sitemap[firstPagePath].pageID;
            
            const result = await api.getPage({
                pageID: pageID,
                locale: testConfig.testLocale
            });

            expect(result).toBeDefined();
            expect(result.pageID).toBe(pageID);
            expect(result.properties).toBeDefined();
        });
    });

    describe('V3 API', () => {
        it('should retrieve page with V3 fetch API', async () => {
            const api = createV2FetchClient();
            
            // First, get the sitemap to find a real page ID
            const sitemap = await api.getSitemapFlat({
                channelName: testConfig.testChannelName,
                locale: testConfig.testLocale
            });

            if (!sitemap || Object.keys(sitemap).length === 0) {
                console.log(`ℹ️  No pages found in sitemap - skipping V3 fetch getPage test`);
                return;
            }

            const firstPagePath = Object.keys(sitemap)[0];
            const pageID = sitemap[firstPagePath].pageID;
            
            const result = await api.getPage({
                pageID: pageID,
                locale: testConfig.testLocale
            });

            expect(result).toBeDefined();
            expect(result.pageID).toBe(pageID);
            expect(result.properties).toBeDefined();
        });

        it('should retrieve page with V3 preview API', async () => {
            const api = createV2PreviewClient();
            
            // First, get the sitemap to find a real page ID
            const sitemap = await api.getSitemapFlat({
                channelName: testConfig.testChannelName,
                locale: testConfig.testLocale
            });

            if (!sitemap || Object.keys(sitemap).length === 0) {
                console.log(`ℹ️  No pages found in sitemap - skipping V3 preview getPage test`);
                return;
            }

            const firstPagePath = Object.keys(sitemap)[0];
            const pageID = sitemap[firstPagePath].pageID;
            
            const result = await api.getPage({
                pageID: pageID,
                locale: testConfig.testLocale
            });

            expect(result).toBeDefined();
            expect(result.pageID).toBe(pageID);
            expect(result.properties).toBeDefined();
        });
    });
});