import {
    createV1FetchClient,
    createV3FetchClient,
    createV1PreviewClient,
    createV3PreviewClient,
    testConfig
} from '../apiClients.config';

describe('getContentItem Integration', () => {
    jest.setTimeout(testConfig.testTimeout);

    describe('V1 API', () => {
        it('should retrieve content item with V1 fetch API', async () => {
            const api = createV1FetchClient();
            
            // First, get the posts list to find a real content ID
            const contentList = await api.getContentList({
                referenceName: testConfig.testContentListRef,
                locale: testConfig.testLocale,
                take: 1
            });

            if (!contentList || !contentList.items || contentList.items.length === 0) {
                console.log(`ℹ️  No content found in '${testConfig.testContentListRef}' list - skipping getContentItem test`);
                return;
            }

            const contentID = contentList.items[0].contentID;
            
            // Now test getContentItem with the real content ID
            const result = await api.getContentItem({
                contentID: contentID,
                locale: testConfig.testLocale
            });

            expect(result).toBeDefined();
            expect(result.contentID).toBe(contentID);
            expect(result.properties).toBeDefined();
            expect(result.fields).toBeDefined();
        });

        it('should retrieve content item with V1 preview API', async () => {
            const api = createV1PreviewClient();
            
            // First, get the posts list to find a real content ID
            const contentList = await api.getContentList({
                referenceName: testConfig.testContentListRef,
                locale: testConfig.testLocale,
                take: 1
            });

            if (!contentList || !contentList.items || contentList.items.length === 0) {
                console.log(`ℹ️  No content found in '${testConfig.testContentListRef}' list - skipping V1 preview getContentItem test`);
                return;
            }

            const contentID = contentList.items[0].contentID;
            
            const result = await api.getContentItem({
                contentID: contentID,
                locale: testConfig.testLocale
            });

            expect(result).toBeDefined();
            expect(result.contentID).toBe(contentID);
            expect(result.properties).toBeDefined();
            expect(result.fields).toBeDefined();
        });
    });

    describe('V3 API', () => {
        it('should retrieve content item with V3 fetch API', async () => {
            const api = createV3FetchClient();
            
            // First, get the posts list to find a real content ID
            const contentList = await api.getContentList({
                referenceName: testConfig.testContentListRef,
                locale: testConfig.testLocale,
                take: 1
            });

            if (!contentList || !contentList.items || contentList.items.length === 0) {
                console.log(`ℹ️  No content found in '${testConfig.testContentListRef}' list - skipping V3 fetch getContentItem test`);
                return;
            }

            const contentID = contentList.items[0].contentID;
            
            const result = await api.getContentItem({
                contentID: contentID,
                locale: testConfig.testLocale
            });

            expect(result).toBeDefined();
            expect(result.contentID).toBe(contentID);
            expect(result.properties).toBeDefined();
            expect(result.fields).toBeDefined();
        });

        it('should retrieve content item with V3 preview API', async () => {
            const api = createV3PreviewClient();
            
            // First, get the posts list to find a real content ID
            const contentList = await api.getContentList({
                referenceName: testConfig.testContentListRef,
                locale: testConfig.testLocale,
                take: 1
            });

            if (!contentList || !contentList.items || contentList.items.length === 0) {
                console.log(`ℹ️  No content found in '${testConfig.testContentListRef}' list - skipping V3 preview getContentItem test`);
                return;
            }

            const contentID = contentList.items[0].contentID;
            
            const result = await api.getContentItem({
                contentID: contentID,
                locale: testConfig.testLocale
            });

            expect(result).toBeDefined();
            expect(result.contentID).toBe(contentID);
            expect(result.properties).toBeDefined();
            expect(result.fields).toBeDefined();
        });
    });
});