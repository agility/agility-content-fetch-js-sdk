/**
 * Unit tests for getSyncPages method
 * These tests focus on SDK behavior, parameter validation, and URL construction
 * No real API calls are made - all responses are mocked
 */

import { getApi } from '../../src/api-client';
import { mockApiClient, mockApiClientWithError, verifyRequestCall, resetAllMocks } from '../utils/mock-helpers';
import { mockV1SyncPages } from '../fixtures/v1-responses';
import { mockV2SyncPages } from '../fixtures/v2-responses';

describe('getSyncPages Unit Tests', () => {
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
      await expect(api.getSyncPages({
        locale: 'en-us'
      })).rejects.toThrow('You must include a syncToken value your request params');
    });

    it('should throw error when syncToken is null', async () => {
      await expect(api.getSyncPages({
        syncToken: null,
        locale: 'en-us'
      })).rejects.toThrow('You must include a syncToken value your request params');
    });

    it('should throw error when syncToken is undefined', async () => {
      await expect(api.getSyncPages({
        syncToken: undefined,
        locale: 'en-us'
      })).rejects.toThrow('You must include a syncToken value your request params');
    });

    it('should throw error when locale is missing', async () => {
      await expect(api.getSyncPages({
        syncToken: 0
      })).rejects.toThrow('You must include a locale in your request params');
    });

    it('should accept syncToken of 0 to start new sync', async () => {
      mockApiClient(api, 'v2');
      
      await api.getSyncPages({
        syncToken: 0,
        locale: 'en-us'
      });

      verifyRequestCall(api.makeRequest, 'syncToken=0');
    });

    it('should accept languageCode as fallback for locale', async () => {
      mockApiClient(api, 'v2');
      
      await api.getSyncPages({
        syncToken: 12345,
        languageCode: 'en-us'
      });

      verifyRequestCall(api.makeRequest, '/sync/pages');
    });
  });

  describe('URL Construction', () => {
    beforeEach(() => {
      api = getApi({
        guid: 'test-guid-d',
        apiKey: 'test-key'
      });
      mockApiClient(api, 'v2');
    });

    it('should build correct URL with minimal parameters', async () => {
      await api.getSyncPages({
        syncToken: 0,
        locale: 'en-us'
      });

      verifyRequestCall(api.makeRequest, '/sync/pages?pageSize=undefined&syncToken=0');
    });

    it('should build correct URL with pageSize', async () => {
      await api.getSyncPages({
        syncToken: 12345,
        locale: 'en-us',
        pageSize: 500
      });

      verifyRequestCall(api.makeRequest, '/sync/pages?pageSize=500&syncToken=12345');
    });

    it('should build correct URL with different syncToken', async () => {
      await api.getSyncPages({
        syncToken: 67890,
        locale: 'en-us',
        pageSize: 1000
      });

      verifyRequestCall(api.makeRequest, 'pageSize=1000');
      verifyRequestCall(api.makeRequest, 'syncToken=67890');
    });

    it('should include proper base URL', async () => {
      await api.getSyncPages({
        syncToken: 0,
        locale: 'en-us'
      });

      const call = api.makeRequest.mock.calls[0][0];
      expect(call.baseURL).toContain('/v2/');
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

      const result = await api.getSyncPages({
        syncToken: 0,
        locale: 'en-us'
      });

      expect(result).toEqual(mockV1SyncPages);
      expect(result.syncToken).toBeDefined();
      expect(result.items).toBeDefined();
      expect(Array.isArray(result.items)).toBe(true);
    });

    it('should return V2 response type for V2 API', async () => {
      api = getApi({
        guid: 'test-guid-d',
        apiKey: 'test-key',
        apiVersion: 'v2'
      });
      mockApiClient(api, 'v2');

      const result = await api.getSyncPages({
        syncToken: 0,
        locale: 'en-us'
      });

      expect(result).toEqual(mockV2SyncPages);
      expect(result.syncToken).toBeDefined();
      expect(result.items).toBeDefined();
      expect(Array.isArray(result.items)).toBe(true);
      expect(result.hasMore).toBeDefined(); // V2 has additional metadata
      expect(result.nextSyncToken).toBeDefined();
    });
  });

  describe('Request Configuration', () => {
    beforeEach(() => {
      api = getApi({
        guid: 'test-guid-d',
        apiKey: 'test-key'
      });
      mockApiClient(api, 'v2');
    });

    it('should use GET method', async () => {
      await api.getSyncPages({
        syncToken: 0,
        locale: 'en-us'
      });

      verifyRequestCall(api.makeRequest, '/sync/pages', 'get');
    });

    it('should work in preview mode', async () => {
      api = getApi({
        guid: 'test-guid-d',
        apiKey: 'test-key',
        isPreview: true
      });
      mockApiClient(api, 'v2');

      await api.getSyncPages({
        syncToken: 0,
        locale: 'en-us'
      });

      const call = api.makeRequest.mock.calls[0][0];
      expect(call.baseURL).toContain('/v2/');
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

      await expect(api.getSyncPages({
        syncToken: 0,
        locale: 'en-us'
      })).rejects.toThrow('Network error');
    });

    it('should handle authentication errors', async () => {
      mockApiClientWithError(api, 'auth');

      await expect(api.getSyncPages({
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
      mockApiClient(api, 'v2');
    });

    it('should return sync response with proper structure', async () => {
      const result = await api.getSyncPages({
        syncToken: 0,
        locale: 'en-us'
      });

      expect(result).toBeDefined();
      expect(result.syncToken).toBeDefined();
      expect(typeof result.syncToken).toBe('number');
      expect(result.items).toBeDefined();
      expect(Array.isArray(result.items)).toBe(true);
    });

    it('should handle sync page items structure', async () => {
      const result = await api.getSyncPages({
        syncToken: 0,
        locale: 'en-us'
      });

      if (result.items.length > 0) {
        const firstItem = result.items[0];
        expect(firstItem.pageID).toBeDefined();
        expect(firstItem.name).toBeDefined();
        expect(firstItem.path).toBeDefined();
        expect(firstItem.visible).toBeDefined();
      }
    });

    it('should handle empty sync response', async () => {
      // Mock empty sync response
      api.makeRequest.mockResolvedValueOnce({
        syncToken: 12345,
        items: []
      });

      const result = await api.getSyncPages({
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
        syncToken: 67891,
        items: [mockV2SyncPages.items[0]]
      });

      const result = await api.getSyncPages({
        syncToken: 67890,
        locale: 'en-us'
      });

      expect(result.syncToken).toBe(67891);
      expect(result.items.length).toBe(1);
    });
  });
});
