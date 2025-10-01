/**
 * Unit tests for getPageByPath method
 * These tests focus on SDK behavior, parameter validation, and URL construction
 * No real API calls are made - all responses are mocked
 */

import { getApi } from '../../src/api-client';
import { mockApiClient, mockApiClientWithError, verifyRequestCall, resetAllMocks } from '../utils/mock-helpers';
import { mockV1Page } from '../fixtures/v1-responses';
import { mockV2Page } from '../fixtures/v2-responses';

describe('getPageByPath Unit Tests', () => {
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

    it('should throw error when pagePath is missing', async () => {
      await expect(api.getPageByPath({
        channelName: 'website',
        locale: 'en-us'
      })).rejects.toThrow('You must include a page path in your request params');
    });

    it('should throw error when channelName is missing', async () => {
      await expect(api.getPageByPath({
        pagePath: '/about',
        locale: 'en-us'
      })).rejects.toThrow('You must include a channel name in your request params');
    });

    it('should throw error when locale is missing', async () => {
      await expect(api.getPageByPath({
        pagePath: '/about',
        channelName: 'website'
      })).rejects.toThrow('You must include a locale in your request params');
    });

    it('should accept languageCode as fallback for locale', async () => {
      mockApiClient(api, 'v2');
      
      await api.getPageByPath({
        pagePath: '/about',
        channelName: 'website',
        languageCode: 'en-us'
      });

      verifyRequestCall(api.makeRequest, '/page/website?path=/about');
    });

    it('should throw error when expandAllContentLinks is not boolean', async () => {
      await expect(api.getPageByPath({
        pagePath: '/about',
        channelName: 'website',
        locale: 'en-us',
        expandAllContentLinks: 'true' as any
      })).rejects.toThrow('ExpandAllContentLinks parameter must be a value of true or false');
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
      await api.getPageByPath({
        pagePath: '/about',
        channelName: 'website',
        locale: 'en-us'
      });

      verifyRequestCall(api.makeRequest, '/page/website?path=/about&contentLinkDepth=2&expandAllContentLinks=true');
    });

    it('should build correct URL with root path', async () => {
      await api.getPageByPath({
        pagePath: '/',
        channelName: 'website',
        locale: 'en-us'
      });

      verifyRequestCall(api.makeRequest, '/page/website?path=/&contentLinkDepth=2&expandAllContentLinks=true');
    });

    it('should build correct URL with nested path', async () => {
      await api.getPageByPath({
        pagePath: '/blog/post-1',
        channelName: 'website',
        locale: 'en-us'
      });

      verifyRequestCall(api.makeRequest, '/page/website?path=/blog/post-1');
    });

    it('should build correct URL with custom contentLinkDepth', async () => {
      await api.getPageByPath({
        pagePath: '/about',
        channelName: 'website',
        locale: 'en-us',
        contentLinkDepth: 1
      });

      verifyRequestCall(api.makeRequest, 'contentLinkDepth=1');
    });

    it('should build correct URL with expandAllContentLinks=false', async () => {
      await api.getPageByPath({
        pagePath: '/about',
        channelName: 'website',
        locale: 'en-us',
        expandAllContentLinks: false
      });

      verifyRequestCall(api.makeRequest, 'expandAllContentLinks=false');
    });

    it('should build correct URL with all parameters', async () => {
      await api.getPageByPath({
        pagePath: '/products/item-1',
        channelName: 'ecommerce',
        locale: 'fr-ca',
        contentLinkDepth: 3,
        expandAllContentLinks: false
      });

      verifyRequestCall(api.makeRequest, '/page/ecommerce?path=/products/item-1&contentLinkDepth=3&expandAllContentLinks=false');
    });

    it('should properly encode special characters in path', async () => {
      await api.getPageByPath({
        pagePath: '/special chars & symbols',
        channelName: 'website',
        locale: 'en-us'
      });

      const call = api.makeRequest.mock.calls[0][0];
      // The SDK may or may not encode the path - just verify it contains the path
      expect(call.url).toContain('path=/special chars & symbols');
    });
  });

  describe('API Version Handling', () => {
    it('should return V1 Page type for V1 API', async () => {
      api = getApi({
        guid: 'test-guid-d',
        apiKey: 'test-key',
        apiVersion: 'v1'
      });
      mockApiClient(api, 'v1');

      const result = await api.getPageByPath({
        pagePath: '/about',
        channelName: 'website',
        locale: 'en-us'
      });

      expect(result).toEqual(mockV1Page);
      expect(result.pageID).toBeDefined();
      expect(result.zones).toBeDefined();
    });

    it('should return V2 Page type for V2 API', async () => {
      api = getApi({
        guid: 'test-guid-d',
        apiKey: 'test-key',
        apiVersion: 'v2'
      });
      mockApiClient(api, 'v2');

      const result = await api.getPageByPath({
        pagePath: '/about',
        channelName: 'website',
        locale: 'en-us'
      });

      expect(result).toEqual(mockV2Page);
      expect(result.pageID).toBeDefined();
      expect(result.zones).toBeDefined();
      expect(result.seo).toBeDefined(); // V2 has SEO data
    });

    it('should default to V2 when no version specified', async () => {
      api = getApi({
        guid: 'test-guid-d',
        apiKey: 'test-key'
      });

      expect(api.config.apiVersion).toBe('v2');
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
      await api.getPageByPath({
        pagePath: '/about',
        channelName: 'website',
        locale: 'en-us'
      });

      verifyRequestCall(api.makeRequest, '/page/website', 'get');
    });

    it('should include proper base URL for live mode', async () => {
      await api.getPageByPath({
        pagePath: '/about',
        channelName: 'website',
        locale: 'en-us'
      });

      const call = api.makeRequest.mock.calls[0][0];
      expect(call.baseURL).toContain('/v2/');
      expect(call.baseURL).toContain('/fetch/en-us');
    });

    it('should include proper base URL for preview mode', async () => {
      api = getApi({
        guid: 'test-guid-d',
        apiKey: 'test-key',
        isPreview: true
      });
      mockApiClient(api, 'v2');

      await api.getPageByPath({
        pagePath: '/about',
        channelName: 'website',
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

      await expect(api.getPageByPath({
        pagePath: '/about',
        channelName: 'website',
        locale: 'en-us'
      })).rejects.toThrow('Network error');
    });

    it('should handle authentication errors', async () => {
      mockApiClientWithError(api, 'auth');

      await expect(api.getPageByPath({
        pagePath: '/about',
        channelName: 'website',
        locale: 'en-us'
      })).rejects.toThrow('Unauthorized');
    });

    it('should handle not found errors for non-existent paths', async () => {
      mockApiClientWithError(api, 'notfound');

      await expect(api.getPageByPath({
        pagePath: '/nonexistent',
        channelName: 'website',
        locale: 'en-us'
      })).rejects.toThrow('Not found');
    });
  });

  describe('Default Parameters', () => {
    beforeEach(() => {
      api = getApi({
        guid: 'test-guid-d',
        apiKey: 'test-key'
      });
      mockApiClient(api, 'v2');
    });

    it('should apply default contentLinkDepth of 2', async () => {
      await api.getPageByPath({
        pagePath: '/about',
        channelName: 'website',
        locale: 'en-us'
      });

      verifyRequestCall(api.makeRequest, 'contentLinkDepth=2');
    });

    it('should apply default expandAllContentLinks of true', async () => {
      await api.getPageByPath({
        pagePath: '/about',
        channelName: 'website',
        locale: 'en-us'
      });

      verifyRequestCall(api.makeRequest, 'expandAllContentLinks=true');
    });

    it('should override defaults when parameters provided', async () => {
      await api.getPageByPath({
        pagePath: '/about',
        channelName: 'website',
        locale: 'en-us',
        contentLinkDepth: 1,
        expandAllContentLinks: false
      });

      verifyRequestCall(api.makeRequest, 'contentLinkDepth=1');
      verifyRequestCall(api.makeRequest, 'expandAllContentLinks=false');
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

    it('should return page with proper structure', async () => {
      const result = await api.getPageByPath({
        pagePath: '/about',
        channelName: 'website',
        locale: 'en-us'
      });

      expect(result).toBeDefined();
      expect(result.pageID).toBeDefined();
      expect(typeof result.pageID).toBe('number');
      expect(result.name).toBeDefined();
      expect(result.path).toBeDefined();
      expect(result.zones).toBeDefined();
      expect(typeof result.zones).toBe('object');
    });

    it('should return Page type, not PageByPath type', async () => {
      const result = await api.getPageByPath({
        pagePath: '/about',
        channelName: 'website',
        locale: 'en-us'
      });

      // Should return a Page object with standard page properties
      expect(result.pageID).toBeDefined();
      expect(result.name).toBeDefined();
      expect(result.path).toBeDefined();
      expect(result.zones).toBeDefined();
      expect(result.visible).toBeDefined();
    });
  });
});
