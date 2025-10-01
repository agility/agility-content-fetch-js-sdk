/**
 * Integration tests for API connectivity
 * Simple tests to verify each API endpoint works with real credentials
 */

import {
  createV1FetchClient,
  createV2FetchClient,
  createV1PreviewClient,
  createV2PreviewClient,
  testConfig
} from '../apiClients.config';

describe('API Connectivity Integration Tests', () => {
  jest.setTimeout(testConfig.testTimeout);

  describe('V1 API', () => {
    it('should connect to V1 fetch API', async () => {
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

    it('should connect to V1 preview API', async () => {
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

  describe('V2 API', () => {
    it('should connect to V2 fetch API', async () => {
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

    it('should connect to V2 preview API', async () => {
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
