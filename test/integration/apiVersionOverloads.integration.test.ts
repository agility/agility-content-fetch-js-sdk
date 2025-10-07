import { 
  createV1FetchClient, 
  createV2FetchClient,
  testConfig 
} from '../apiClients.config';

// Integration tests with real API - these should fail if there are API communication issues
describe('API Version Integration Tests', () => {
  jest.setTimeout(testConfig.testTimeout);

  describe('V1 API', () => {
    it('should successfully call V1 getContentList endpoint', async () => {
      const api = createV1FetchClient();
      
      const result = await api.getContentList({
        referenceName: testConfig.testContentListRef,
        locale: testConfig.testLocale,
        take: 1
      });

      // Basic structure validation
      expect(result).toBeDefined();
      expect(result.items).toBeDefined();
      expect(Array.isArray(result.items)).toBe(true);
      expect(api.config.apiVersion).toBe('v1');
    });
  });

  describe('V2 API', () => {
    it('should successfully call V2 getContentList endpoint', async () => {
      const api = createV2FetchClient();
      
      const result = await api.getContentList({
        referenceName: testConfig.testContentListRef,
        locale: testConfig.testLocale,
        take: 1
      });

      // Basic structure validation
      expect(result).toBeDefined();
      expect(result.items).toBeDefined();
      expect(Array.isArray(result.items)).toBe(true);
      expect(api.config.apiVersion).toBe('v2');
    });

    it('should default to V2 API version', () => {
      const api = createV2FetchClient();
      expect(api.config.apiVersion).toBe('v2');
    });
  });
});
