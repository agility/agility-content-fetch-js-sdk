/**
 * Unit tests for getPage method
 * These tests focus on SDK behavior, parameter validation, and URL construction
 * No real API calls are made - all responses are mocked
 */

import { getApi } from '../../src/api-client';
import { mockApiClient, mockApiClientWithError, verifyRequestCall, resetAllMocks } from '../utils/mock-helpers';
import { mockV1Page } from '../fixtures/v1-responses';
import { mockV3Page } from '../fixtures/v3-responses';

describe('getPage Unit Tests', () => {
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

    it('should throw error when pageID is missing', async () => {
      await expect(api.getPage({
        locale: 'en-us'
      })).rejects.toThrow('You must include a pageID in your request params');
    });

    it('should throw error when locale is missing', async () => {
      await expect(api.getPage({
        pageID: 123
      })).rejects.toThrow('You must include a locale in your request params');
    });

    it('should accept languageCode as fallback for locale', async () => {
      mockApiClient(api, 'v3');
      
      await api.getPage({
        pageID: 123,
        languageCode: 'en-us'
      });

      verifyRequestCall(api.makeRequest, '/page/123');
    });

    it('should throw error when expandAllContentLinks is not boolean', async () => {
      await expect(api.getPage({
        pageID: 123,
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
      mockApiClient(api, 'v3');
    });

    it('should build correct URL with minimal parameters', async () => {
      await api.getPage({
        pageID: 123,
        locale: 'en-us'
      });

      verifyRequestCall(api.makeRequest, '/page/123?contentLinkDepth=2&expandAllContentLinks=true');
    });

    it('should build correct URL with custom contentLinkDepth', async () => {
      await api.getPage({
        pageID: 123,
        locale: 'en-us',
        contentLinkDepth: 1
      });

      verifyRequestCall(api.makeRequest, '/page/123?contentLinkDepth=1&expandAllContentLinks=true');
    });

    it('should build correct URL with expandAllContentLinks=false', async () => {
      await api.getPage({
        pageID: 123,
        locale: 'en-us',
        expandAllContentLinks: false
      });

      verifyRequestCall(api.makeRequest, '/page/123?contentLinkDepth=2&expandAllContentLinks=false');
    });

    it('should build correct URL with all parameters', async () => {
      await api.getPage({
        pageID: 456,
        locale: 'fr-ca',
        contentLinkDepth: 3,
        expandAllContentLinks: false
      });

      verifyRequestCall(api.makeRequest, '/page/456?contentLinkDepth=3&expandAllContentLinks=false');
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

      const result = await api.getPage({
        pageID: 123,
        locale: 'en-us'
      });

      expect(result).toEqual(mockV1Page);
      expect(result.pageID).toBeDefined();
      expect(result.zones).toBeDefined();
    });

    it('should return V3 response type for V3 API', async () => {
      api = getApi({
        guid: 'test-guid-d',
        apiKey: 'test-key',
        apiVersion: 'v3'
      });
      mockApiClient(api, 'v3');

      const result = await api.getPage({
        pageID: 123,
        locale: 'en-us'
      });

      expect(result).toEqual(mockV3Page);
      expect(result.pageID).toBeDefined();
      expect(result.zones).toBeDefined();
      expect(result.seo).toBeDefined(); // V3 has SEO data
    });

    it('should default to V3 when no version specified', async () => {
      api = getApi({
        guid: 'test-guid-d',
        apiKey: 'test-key'
      });

      expect(api.config.apiVersion).toBe('v3');
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
      await api.getPage({
        pageID: 123,
        locale: 'en-us'
      });

      verifyRequestCall(api.makeRequest, '/page/123', 'get');
    });

    it('should include proper base URL for live mode', async () => {
      await api.getPage({
        pageID: 123,
        locale: 'en-us'
      });

      const call = api.makeRequest.mock.calls[0][0];
      expect(call.baseURL).toContain('/v3/');
      expect(call.baseURL).toContain('/fetch/en-us');
    });

    it('should include proper base URL for preview mode', async () => {
      api = getApi({
        guid: 'test-guid-d',
        apiKey: 'test-key',
        isPreview: true
      });
      mockApiClient(api, 'v3');

      await api.getPage({
        pageID: 123,
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

      await expect(api.getPage({
        pageID: 123,
        locale: 'en-us'
      })).rejects.toThrow('Network error');
    });

    it('should handle authentication errors', async () => {
      mockApiClientWithError(api, 'auth');

      await expect(api.getPage({
        pageID: 123,
        locale: 'en-us'
      })).rejects.toThrow('Unauthorized');
    });

    it('should handle not found errors', async () => {
      mockApiClientWithError(api, 'notfound');

      await expect(api.getPage({
        pageID: 999999,
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
      mockApiClient(api, 'v3');
    });

    it('should apply default contentLinkDepth of 2', async () => {
      await api.getPage({
        pageID: 123,
        locale: 'en-us'
      });

      verifyRequestCall(api.makeRequest, 'contentLinkDepth=2');
    });

    it('should apply default expandAllContentLinks of true', async () => {
      await api.getPage({
        pageID: 123,
        locale: 'en-us'
      });

      verifyRequestCall(api.makeRequest, 'expandAllContentLinks=true');
    });

    it('should override defaults when parameters provided', async () => {
      await api.getPage({
        pageID: 123,
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
      mockApiClient(api, 'v3');
    });

    it('should return page with proper structure', async () => {
      const result = await api.getPage({
        pageID: 123,
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

    it('should handle page zones structure', async () => {
      const result = await api.getPage({
        pageID: 123,
        locale: 'en-us'
      });

      expect(result.zones).toBeDefined();
      expect(result.zones.MainContentZone).toBeDefined();
      expect(Array.isArray(result.zones.MainContentZone)).toBe(true);
      
      if (result.zones.MainContentZone.length > 0) {
        const firstZoneItem = result.zones.MainContentZone[0];
        expect(firstZoneItem.item).toBeDefined();
        expect(firstZoneItem.item.contentID).toBeDefined();
        expect(firstZoneItem.item.properties).toBeDefined();
        expect(firstZoneItem.item.fields).toBeDefined();
      }
    });
  });
});
