/**
 * Unit tests for getSyncContent method
 * These tests focus on SDK behavior, parameter validation, and URL construction
 * No real API calls are made - all responses are mocked
 */

import { getApi } from '../../src/api-client';
import { mockApiClient, mockApiClientWithError, verifyRequestCall, resetAllMocks } from '../utils/mock-helpers';
import { mockV1SyncContent } from '../fixtures/v1-responses';
import { mockV3SyncContent } from '../fixtures/v3-responses';

describe('getSyncContent Unit Tests', () => {
  let api: any;

  beforeEach(() => {
    resetAllMocks();
  });

  describe('Parameter Validation', () => {
    beforeEach(() => {
      api = getApi({
        guid: 'test-guid-d',
        apiKey: 'test-key'
      });
    });

    it('should throw error when syncToken is missing', async () => {
      await expect(api.getSyncContent({
        locale: 'en-us'
      })).rejects.toThrow('You must include a syncToken value your request params');
    });

    it('should throw error when syncToken is null', async () => {
      await expect(api.getSyncContent({
        syncToken: null,
        locale: 'en-us'
      })).rejects.toThrow('You must include a syncToken value your request params');
    });

    it('should throw error when syncToken is undefined', async () => {
      await expect(api.getSyncContent({
        syncToken: undefined,
        locale: 'en-us'
      })).rejects.toThrow('You must include a syncToken value your request params');
    });

    it('should throw error when locale is missing', async () => {
      await expect(api.getSyncContent({
        syncToken: 0
      })).rejects.toThrow('You must include a locale in your request params');
    });

    it('should accept syncToken of 0 to start new sync', async () => {
      mockApiClient(api, 'v3');
      
      await api.getSyncContent({
        syncToken: 0,
        locale: 'en-us'
      });

      verifyRequestCall(api.makeRequest, 'syncToken=0');
    });

    it('should accept languageCode as fallback for locale', async () => {
      mockApiClient(api, 'v3');
      
      await api.getSyncContent({
        syncToken: 12345,
        languageCode: 'en-us'
      });

      verifyRequestCall(api.makeRequest, '/sync/items');
    });
  });

  describe('URL Construction', () => {
    beforeEach(() => {
      api = getApi({
        guid: 'test-guid-d',
        apiKey: 'test-key'
      });
      mockApiClient(api, 'v3');
    });

    it('should build correct URL with minimal parameters', async () => {
      await api.getSyncContent({
        syncToken: 0,
        locale: 'en-us'
      });

      verifyRequestCall(api.makeRequest, '/sync/items?pageSize=undefined&syncToken=0');
    });

    it('should build correct URL with pageSize', async () => {
      await api.getSyncContent({
        syncToken: 12345,
        locale: 'en-us',
        pageSize: 100
      });

      verifyRequestCall(api.makeRequest, '/sync/items?pageSize=100&syncToken=12345');
    });

    it('should build correct URL with different syncToken', async () => {
      await api.getSyncContent({
        syncToken: 67890,
        locale: 'en-us',
        pageSize: 250
      });

      verifyRequestCall(api.makeRequest, 'pageSize=250');
      verifyRequestCall(api.makeRequest, 'syncToken=67890');
    });

    it('should include proper base URL', async () => {
      await api.getSyncContent({
        syncToken: 0,
        locale: 'en-us'
      });

      const call = api.makeRequest.mock.calls[0][0];
      expect(call.baseURL).toContain('/v3/');
      expect(call.baseURL).toContain('/fetch/en-us');
    });
  });

  describe('API Version Handling', () => {
    it('should return V1 response type for V1 API', async () => {
      api = getApi({
        guid: 'test-guid-d',
        apiKey: 'test-key',
        apiVersion: 'v1'
      });
      mockApiClient(api, 'v1');

      const result = await api.getSyncContent({
        syncToken: 0,
        locale: 'en-us'
      });

      expect(result).toEqual(mockV1SyncContent);
      expect(result.syncToken).toBeDefined();
      expect(result.items).toBeDefined();
      expect(Array.isArray(result.items)).toBe(true);
    });

    it('should return V3 response type for V3 API', async () => {
      api = getApi({
        guid: 'test-guid-d',
        apiKey: 'test-key',
        apiVersion: 'v3'
      });
      mockApiClient(api, 'v3');

      const result = await api.getSyncContent({
        syncToken: 0,
        locale: 'en-us'
      });

      expect(result).toEqual(mockV3SyncContent);
      expect(result.syncToken).toBeDefined();
      expect(result.items).toBeDefined();
      expect(Array.isArray(result.items)).toBe(true);
      expect(result.hasMore).toBeDefined(); // V3 has additional metadata
      expect(result.nextSyncToken).toBeDefined();
    });
  });

  describe('Request Configuration', () => {
    beforeEach(() => {
      api = getApi({
        guid: 'test-guid-d',
        apiKey: 'test-key'
      });
      mockApiClient(api, 'v3');
    });

    it('should use GET method', async () => {
      await api.getSyncContent({
        syncToken: 0,
        locale: 'en-us'
      });

      verifyRequestCall(api.makeRequest, '/sync/items', 'get');
    });

    it('should work in preview mode', async () => {
      api = getApi({
        guid: 'test-guid-d',
        apiKey: 'test-key',
        isPreview: true
      });
      mockApiClient(api, 'v3');

      await api.getSyncContent({
        syncToken: 0,
        locale: 'en-us'
      });

      const call = api.makeRequest.mock.calls[0][0];
      expect(call.baseURL).toContain('/v3/');
      expect(call.baseURL).toContain('/preview/en-us');
    });
  });

  describe('Error Handling', () => {
    beforeEach(() => {
      api = getApi({
        guid: 'test-guid-d',
        apiKey: 'test-key'
      });
    });

    it('should handle network errors', async () => {
      mockApiClientWithError(api, 'network');

      await expect(api.getSyncContent({
        syncToken: 0,
        locale: 'en-us'
      })).rejects.toThrow('Network error');
    });

    it('should handle authentication errors', async () => {
      mockApiClientWithError(api, 'auth');

      await expect(api.getSyncContent({
        syncToken: 0,
        locale: 'en-us'
      })).rejects.toThrow('Unauthorized');
    });
  });

  describe('Response Processing', () => {
    beforeEach(() => {
      api = getApi({
        guid: 'test-guid-d',
        apiKey: 'test-key'
      });
      mockApiClient(api, 'v3');
    });

    it('should return sync response with proper structure', async () => {
      const result = await api.getSyncContent({
        syncToken: 0,
        locale: 'en-us'
      });

      expect(result).toBeDefined();
      expect(result.syncToken).toBeDefined();
      expect(typeof result.syncToken).toBe('number');
      expect(result.items).toBeDefined();
      expect(Array.isArray(result.items)).toBe(true);
    });

    it('should handle sync items structure', async () => {
      const result = await api.getSyncContent({
        syncToken: 0,
        locale: 'en-us'
      });

      if (result.items.length > 0) {
        const firstItem = result.items[0];
        expect(firstItem.contentID).toBeDefined();
        expect(firstItem.properties).toBeDefined();
        expect(firstItem.fields).toBeDefined();
        expect(firstItem.properties.referenceName).toBeDefined();
      }
    });

    it('should handle empty sync response', async () => {
      // Mock empty sync response
      api.makeRequest.mockResolvedValueOnce({
        syncToken: 12345,
        items: []
      });

      const result = await api.getSyncContent({
        syncToken: 12345,
        locale: 'en-us'
      });

      expect(result.syncToken).toBe(12345);
      expect(result.items).toEqual([]);
      expect(Array.isArray(result.items)).toBe(true);
    });

    it('should handle incremental sync', async () => {
      // Mock incremental sync response
      api.makeRequest.mockResolvedValueOnce({
        syncToken: 12346,
        items: [mockV3SyncContent.items[0]]
      });

      const result = await api.getSyncContent({
        syncToken: 12345,
        locale: 'en-us'
      });

      expect(result.syncToken).toBe(12346);
      expect(result.items.length).toBe(1);
    });
  });
});
