/**
 * Unit tests for getSitemapFlat method
 * These tests focus on SDK behavior, parameter validation, and URL construction
 * No real API calls are made - all responses are mocked
 */

import { getApi } from '../../src/api-client';
import { mockApiClient, mockApiClientWithError, verifyRequestCall, resetAllMocks } from '../utils/mock-helpers';
import { mockV1SitemapFlat } from '../fixtures/v1-responses';
import { mockV3SitemapFlat } from '../fixtures/v3-responses';

describe('getSitemapFlat Unit Tests', () => {
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
      await expect(api.getSitemapFlat({
        locale: 'en-us'
      })).rejects.toThrow('You must include a channelName in your request params');
    });

    it('should throw error when locale is missing', async () => {
      await expect(api.getSitemapFlat({
        channelName: 'website'
      })).rejects.toThrow('You must include a locale in your request params');
    });

    it('should accept languageCode as fallback for locale', async () => {
      mockApiClient(api, 'v3');
      
      await api.getSitemapFlat({
        channelName: 'website',
        languageCode: 'en-us'
      });

      verifyRequestCall(api.makeRequest, '/sitemap/flat/website');
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
      await api.getSitemapFlat({
        channelName: 'website',
        locale: 'en-us'
      });

      verifyRequestCall(api.makeRequest, '/sitemap/flat/website');
    });

    it('should build correct URL with different channel', async () => {
      await api.getSitemapFlat({
        channelName: 'blog',
        locale: 'en-us'
      });

      verifyRequestCall(api.makeRequest, '/sitemap/flat/blog');
    });

    it('should include proper base URL', async () => {
      await api.getSitemapFlat({
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

      const result = await api.getSitemapFlat({
        channelName: 'website',
        locale: 'en-us'
      });

      expect(result).toEqual(mockV1SitemapFlat);
      expect(typeof result).toBe('object');
      expect(result['/']).toBeDefined();
    });

    it('should return V3 response type for V3 API', async () => {
      api = getApi({
        guid: 'test-guid-d',
        apiKey: 'test-key',
        apiVersion: 'v3'
      });
      mockApiClient(api, 'v3');

      const result = await api.getSitemapFlat({
        channelName: 'website',
        locale: 'en-us'
      });

      expect(result).toEqual(mockV3SitemapFlat);
      expect(typeof result).toBe('object');
      expect(result['/']).toBeDefined();
      expect(result['/'].lastModified).toBeDefined(); // V2 has additional metadata
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
      await api.getSitemapFlat({
        channelName: 'website',
        locale: 'en-us'
      });

      verifyRequestCall(api.makeRequest, '/sitemap/flat/website', 'get');
    });

    it('should work in preview mode', async () => {
      api = getApi({
        guid: 'test-guid-d',
        apiKey: 'test-key',
        isPreview: true
      });
      mockApiClient(api, 'v3');

      await api.getSitemapFlat({
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

      await expect(api.getSitemapFlat({
        channelName: 'website',
        locale: 'en-us'
      })).rejects.toThrow('Network error');
    });

    it('should handle authentication errors', async () => {
      mockApiClientWithError(api, 'auth');

      await expect(api.getSitemapFlat({
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

    it('should return sitemap with proper flat structure', async () => {
      const result = await api.getSitemapFlat({
        channelName: 'website',
        locale: 'en-us'
      });

      expect(result).toBeDefined();
      expect(typeof result).toBe('object');
      
      // Should be a flat object with paths as keys
      const paths = Object.keys(result);
      expect(paths.length).toBeGreaterThan(0);
      
      // Each path should have page properties
      paths.forEach(path => {
        const page = result[path];
        expect(page.pageID).toBeDefined();
        expect(page.name).toBeDefined();
        expect(page.path).toBeDefined();
        expect(page.visible).toBeDefined();
      });
    });

    it('should handle empty sitemap', async () => {
      // Mock empty sitemap response
      api.makeRequest.mockResolvedValueOnce({});

      const result = await api.getSitemapFlat({
        channelName: 'empty-channel',
        locale: 'en-us'
      });

      expect(result).toEqual({});
      expect(Object.keys(result)).toHaveLength(0);
    });
  });
});
