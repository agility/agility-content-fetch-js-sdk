/**
 * Unit tests for getSitemapNested method
 * These tests focus on SDK behavior, parameter validation, and URL construction
 * No real API calls are made - all responses are mocked
 */

import { getApi } from '../../src/api-client';
import { mockApiClient, mockApiClientWithError, verifyRequestCall, resetAllMocks } from '../utils/mock-helpers';
import { mockV1SitemapNested } from '../fixtures/v1-responses';
import { mockV3SitemapNested } from '../fixtures/v3-responses';

describe('getSitemapNested Unit Tests', () => {
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

    it('should throw error when channelName is missing', async () => {
      await expect(api.getSitemapNested({
        locale: 'en-us'
      })).rejects.toThrow('You must include a channelName in your request params');
    });

    it('should throw error when locale is missing', async () => {
      await expect(api.getSitemapNested({
        channelName: 'website'
      })).rejects.toThrow('You must include a locale in your request params');
    });

    it('should accept languageCode as fallback for locale', async () => {
      mockApiClient(api, 'v3');
      
      await api.getSitemapNested({
        channelName: 'website',
        languageCode: 'en-us'
      });

      verifyRequestCall(api.makeRequest, '/sitemap/nested/website');
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

    it('should build correct URL with basic parameters', async () => {
      await api.getSitemapNested({
        channelName: 'website',
        locale: 'en-us'
      });

      verifyRequestCall(api.makeRequest, '/sitemap/nested/website');
    });

    it('should build correct URL with different channel', async () => {
      await api.getSitemapNested({
        channelName: 'blog',
        locale: 'en-us'
      });

      verifyRequestCall(api.makeRequest, '/sitemap/nested/blog');
    });

    it('should include proper base URL', async () => {
      await api.getSitemapNested({
        channelName: 'website',
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

      const result = await api.getSitemapNested({
        channelName: 'website',
        locale: 'en-us'
      });

      expect(result).toEqual(mockV1SitemapNested);
      expect(Array.isArray(result)).toBe(true);
      expect(result[0].pageID).toBeDefined();
      expect(result[0].children).toBeDefined();
    });

    it('should return V3 response type for V3 API', async () => {
      api = getApi({
        guid: 'test-guid-d',
        apiKey: 'test-key',
        apiVersion: 'v3'
      });
      mockApiClient(api, 'v3');

      const result = await api.getSitemapNested({
        channelName: 'website',
        locale: 'en-us'
      });

      expect(result).toEqual(mockV3SitemapNested);
      expect(Array.isArray(result)).toBe(true);
      expect(result[0].pageID).toBeDefined();
      expect(result[0].children).toBeDefined();
      expect(result[0].lastModified).toBeDefined(); // V2 has additional metadata
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
      await api.getSitemapNested({
        channelName: 'website',
        locale: 'en-us'
      });

      verifyRequestCall(api.makeRequest, '/sitemap/nested/website', 'get');
    });

    it('should work in preview mode', async () => {
      api = getApi({
        guid: 'test-guid-d',
        apiKey: 'test-key',
        isPreview: true
      });
      mockApiClient(api, 'v3');

      await api.getSitemapNested({
        channelName: 'website',
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

      await expect(api.getSitemapNested({
        channelName: 'website',
        locale: 'en-us'
      })).rejects.toThrow('Network error');
    });

    it('should handle authentication errors', async () => {
      mockApiClientWithError(api, 'auth');

      await expect(api.getSitemapNested({
        channelName: 'website',
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

    it('should return sitemap with proper nested structure', async () => {
      const result = await api.getSitemapNested({
        channelName: 'website',
        locale: 'en-us'
      });

      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      
      // Each top-level item should have page properties and children array
      result.forEach(item => {
        expect(item.pageID).toBeDefined();
        expect(item.name).toBeDefined();
        expect(item.path).toBeDefined();
        expect(item.visible).toBeDefined();
        expect(Array.isArray(item.children)).toBe(true);
      });
    });

    it('should handle nested children structure', async () => {
      const result = await api.getSitemapNested({
        channelName: 'website',
        locale: 'en-us'
      });

      // Check if any items have children
      const itemWithChildren = result.find(item => item.children.length > 0);
      if (itemWithChildren) {
        const child = itemWithChildren.children[0];
        expect(child.pageID).toBeDefined();
        expect(child.name).toBeDefined();
        expect(child.path).toBeDefined();
        expect(child.visible).toBeDefined();
        expect(Array.isArray(child.children)).toBe(true);
      }
    });

    it('should handle empty sitemap', async () => {
      // Mock empty sitemap response
      api.makeRequest.mockResolvedValueOnce([]);

      const result = await api.getSitemapNested({
        channelName: 'empty-channel',
        locale: 'en-us'
      });

      expect(result).toEqual([]);
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(0);
    });
  });
});
