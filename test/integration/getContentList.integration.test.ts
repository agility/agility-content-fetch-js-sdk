import {
	createV1FetchClient,
	createV2FetchClient,
	createV1PreviewClient,
	createV2PreviewClient,
	testConfig
} from '../apiClients.config';

describe('getContentList Integration', () => {
	jest.setTimeout(testConfig.testTimeout);

	describe('V1 API', () => {
		it('should retrieve content list with V1 fetch API', async () => {
			const api = createV1FetchClient();
			const result = await api.getContentList({
				referenceName: testConfig.testContentListRef,
				locale: testConfig.testLocale,
				take: 1
			});

			expect(result).toBeDefined();
			expect(result.items).toBeDefined();
			expect(Array.isArray(result.items)).toBe(true);
		});

		it('should retrieve content list with V1 preview API', async () => {
			const api = createV1PreviewClient();
			const result = await api.getContentList({
				referenceName: testConfig.testContentListRef,
				locale: testConfig.testLocale,
				take: 1
			});

			expect(result).toBeDefined();
			expect(result.items).toBeDefined();
			expect(Array.isArray(result.items)).toBe(true);
		});
	});

	describe('V3 API', () => {
		it('should retrieve content list with V3 fetch API', async () => {
			const api = createV2FetchClient();
			const result = await api.getContentList({
				referenceName: testConfig.testContentListRef,
				locale: testConfig.testLocale,
				take: 1
			});

			expect(result).toBeDefined();
			expect(result.items).toBeDefined();
			expect(Array.isArray(result.items)).toBe(true);
		});

		it('should retrieve content list with V3 preview API', async () => {
			const api = createV2PreviewClient();
			const result = await api.getContentList({
				referenceName: testConfig.testContentListRef,
				locale: testConfig.testLocale,
				take: 1
			});

			expect(result).toBeDefined();
			expect(result.items).toBeDefined();
			expect(Array.isArray(result.items)).toBe(true);
		});
	});

});
