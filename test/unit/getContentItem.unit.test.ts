/**
 * Unit tests for getContentItem method
 * These tests focus on SDK behavior, parameter validation, and URL construction
 * No real API calls are made - all responses are mocked
 */

import { getApi } from '../../src/api-client';
import { mockApiClient, mockApiClientWithError, verifyRequestCall, resetAllMocks } from '../utils/mock-helpers';
import { mockV1ContentItem } from '../fixtures/v1-responses';
import { mockV3ContentItem } from '../fixtures/v3-responses';

describe('getContentItem Unit Tests', () => {
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

    it('should throw error when contentID is missing', async () => {
      await expect(api.getContentItem({
        locale: 'en-us'
      })).rejects.toThrow('You must include a contentID number in your request params');
    });

    it('should throw error when locale is missing', async () => {
      await expect(api.getContentItem({
        contentID: 123
      })).rejects.toThrow('You must include a locale in your request params');
    });

    it('should throw error when contentLinkDepth is invalid', async () => {
      await expect(api.getContentItem({
        contentID: 123,
        locale: 'en-us',
        contentLinkDepth: -1
      })).rejects.toThrow('When specifying contentLinkDepth, it must be a number greater than 0');
    });

    it('should throw error when contentLinkDepth is not a number', async () => {
      await expect(api.getContentItem({
        contentID: 123,
        locale: 'en-us',
        contentLinkDepth: 'invalid' as any
      })).rejects.toThrow('When specifying contentLinkDepth, it must be a number greater than 0');
    });

    it('should throw error when expandAllContentLinks is not boolean', async () => {
      await expect(api.getContentItem({
        contentID: 123,
        locale: 'en-us',
        expandAllContentLinks: 'true' as any
      })).rejects.toThrow('ExpandAllContentLinks parameter must be a value of true or false');
    });

    it('should accept languageCode as fallback for locale', async () => {
      mockApiClient(api, 'v3');
      
      await api.getContentItem({
        contentID: 123,
        languageCode: 'en-us'
      });

      verifyRequestCall(api.makeRequest, '/item/123');
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
      await api.getContentItem({
        contentID: 123,
        locale: 'en-us'
      });

      verifyRequestCall(api.makeRequest, '/item/123?contentLinkDepth=1&expandAllContentLinks=false');
    });

    it('should build correct URL with custom contentLinkDepth', async () => {
      await api.getContentItem({
        contentID: 123,
        locale: 'en-us',
        contentLinkDepth: 3
      });

      verifyRequestCall(api.makeRequest, '/item/123?contentLinkDepth=3&expandAllContentLinks=false');
    });

    it('should build correct URL with expandAllContentLinks=true', async () => {
      await api.getContentItem({
        contentID: 123,
        locale: 'en-us',
        expandAllContentLinks: true
      });

      verifyRequestCall(api.makeRequest, '/item/123?contentLinkDepth=1&expandAllContentLinks=true');
    });

    it('should build correct URL with all parameters', async () => {
      await api.getContentItem({
        contentID: 456,
        locale: 'fr-ca',
        contentLinkDepth: 2,
        expandAllContentLinks: true
      });

      verifyRequestCall(api.makeRequest, '/item/456?contentLinkDepth=2&expandAllContentLinks=true');
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

      const result = await api.getContentItem({
        contentID: 123,
        locale: 'en-us'
      });

      expect(result).toEqual(mockV1ContentItem);
      expect(typeof result.properties.modified).toBe('string'); // V1 uses string dates
    });

    it('should return V3 response type for V3 API', async () => {
      api = getApi({
        guid: 'test-guid-d',
        apiKey: 'test-key',
        apiVersion: 'v3'
      });
      mockApiClient(api, 'v3');

      const result = await api.getContentItem({
        contentID: 123,
        locale: 'en-us'
      });

      expect(result).toEqual(mockV3ContentItem);
      expect(result.properties.modified instanceof Date).toBe(true); // V2 uses Date objects
    });

    it('should default to V2 when no version specified', async () => {
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
      await api.getContentItem({
        contentID: 123,
        locale: 'en-us'
      });

      verifyRequestCall(api.makeRequest, '/item/123', 'get');
    });

    it('should include proper base URL for live mode', async () => {
      await api.getContentItem({
        contentID: 123,
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

      await api.getContentItem({
        contentID: 123,
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

      await expect(api.getContentItem({
        contentID: 123,
        locale: 'en-us'
      })).rejects.toThrow('Network error');
    });

    it('should handle authentication errors', async () => {
      mockApiClientWithError(api, 'auth');

      await expect(api.getContentItem({
        contentID: 123,
        locale: 'en-us'
      })).rejects.toThrow('Unauthorized');
    });

    it('should handle not found errors', async () => {
      mockApiClientWithError(api, 'notfound');

      await expect(api.getContentItem({
        contentID: 999999,
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

    it('should apply default contentLinkDepth of 1', async () => {
      await api.getContentItem({
        contentID: 123,
        locale: 'en-us'
      });

      verifyRequestCall(api.makeRequest, 'contentLinkDepth=1');
    });

    it('should apply default expandAllContentLinks of false', async () => {
      await api.getContentItem({
        contentID: 123,
        locale: 'en-us'
      });

      verifyRequestCall(api.makeRequest, 'expandAllContentLinks=false');
    });

    it('should override defaults when parameters provided', async () => {
      await api.getContentItem({
        contentID: 123,
        locale: 'en-us',
        contentLinkDepth: 5,
        expandAllContentLinks: true
      });

      verifyRequestCall(api.makeRequest, 'contentLinkDepth=5');
      verifyRequestCall(api.makeRequest, 'expandAllContentLinks=true');
    });
  });
});
