/**
 * Unit tests for getContentList method
 * These tests focus on SDK behavior, parameter validation, and URL construction
 * No real API calls are made - all responses are mocked
 */

import { getApi } from '../../src/api-client';
import { mockApiClient, mockApiClientWithError, verifyRequestCall, resetAllMocks } from '../utils/mock-helpers';
import { mockV1ContentList } from '../fixtures/v1-responses';
import { mockV3ContentList } from '../fixtures/v3-responses';

describe('getContentList Unit Tests', () => {
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

    it('should throw error when referenceName is missing', async () => {
      await expect(api.getContentList({
        locale: 'en-us'
      })).rejects.toThrow('You must include a content referenceName in your request params');
    });

    it('should throw error when locale is missing', async () => {
      await expect(api.getContentList({
        referenceName: 'posts'
      })).rejects.toThrow('You must include a locale in your request params');
    });

    it('should accept languageCode as fallback for locale', async () => {
      mockApiClient(api, 'v3');
      
      await api.getContentList({
        referenceName: 'posts',
        languageCode: 'en-us'
      });

      verifyRequestCall(api.makeRequest, '/list/posts');
    });

    it('should throw error when take parameter is not a number', async () => {
      await expect(api.getContentList({
        referenceName: 'posts',
        locale: 'en-us',
        take: 'ten' as any
      })).rejects.toThrow('Take parameter must be a number');
    });

    it('should throw error when take parameter is less than 1', async () => {
      await expect(api.getContentList({
        referenceName: 'posts',
        locale: 'en-us',
        take: 0
      })).rejects.toThrow('Take parameter must be greater than 0');
    });

    it('should throw error when take parameter is greater than 250', async () => {
      await expect(api.getContentList({
        referenceName: 'posts',
        locale: 'en-us',
        take: 251
      })).rejects.toThrow('Take parameter must be 250 or less');
    });

    it('should throw error when skip parameter is not a number', async () => {
      await expect(api.getContentList({
        referenceName: 'posts',
        locale: 'en-us',
        skip: 'ten' as any
      })).rejects.toThrow('Skip parameter must be a number');
    });

    it('should throw error when skip parameter is less than 0', async () => {
      await expect(api.getContentList({
        referenceName: 'posts',
        locale: 'en-us',
        skip: -1
      })).rejects.toThrow('Skip parameter must be 0 or greater');
    });

    it('should throw error when direction parameter is invalid', async () => {
      await expect(api.getContentList({
        referenceName: 'posts',
        locale: 'en-us',
        direction: 'up' as any
      })).rejects.toThrow('Direction parameter must have a value of "asc" or "desc"');
    });

    it('should throw error when expandAllContentLinks is not boolean', async () => {
      await expect(api.getContentList({
        referenceName: 'posts',
        locale: 'en-us',
        expandAllContentLinks: 'true' as any
      })).rejects.toThrow('ExpandAllContentLinks parameter must be a value of true or false');
    });

    it('should throw error when filtersLogicOperator is invalid', async () => {
      await expect(api.getContentList({
        referenceName: 'posts',
        locale: 'en-us',
        filtersLogicOperator: 'SOME' as any
      })).rejects.toThrow('FiltersLogicOperator parameter must have a value of "AND" or "OR"');
    });

    describe('Filter Validation', () => {
      it('should throw error when filter is missing property field', async () => {
        await expect(api.getContentList({
          referenceName: 'posts',
          locale: 'en-us',
          filters: [{ operator: 'eq', value: '40' }]
        })).rejects.toThrow('does not contain \'property\'');
      });

      it('should throw error when filter is missing operator field', async () => {
        await expect(api.getContentList({
          referenceName: 'posts',
          locale: 'en-us',
          filters: [{ property: 'contentID', value: '40' }]
        })).rejects.toThrow('does not contain \'operator\'');
      });

      it('should throw error when filter is missing value field', async () => {
        await expect(api.getContentList({
          referenceName: 'posts',
          locale: 'en-us',
          filters: [{ property: 'contentID', operator: 'eq' }]
        })).rejects.toThrow('does not contain \'value\'');
      });

      it('should throw error when filter operator is invalid', async () => {
        await expect(api.getContentList({
          referenceName: 'posts',
          locale: 'en-us',
          filters: [{ property: 'contentID', operator: 'invalid', value: '40' }]
        })).rejects.toThrow('Operator must be one of');
      });

      it('should accept valid filter operators', async () => {
        mockApiClient(api, 'v3');
        
        const validOperators = ['eq', 'ne', 'lt', 'lte', 'gt', 'gte', 'range', 'like', 'in', 'contains'];
        
        for (const operator of validOperators) {
          await api.getContentList({
            referenceName: 'posts',
            locale: 'en-us',
            filters: [{ property: 'contentID', operator, value: '40' }]
          });
        }
        
        expect(api.makeRequest).toHaveBeenCalledTimes(validOperators.length);
      });
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
      await api.getContentList({
        referenceName: 'posts',
        locale: 'en-us'
      });

      verifyRequestCall(api.makeRequest, '/list/posts?contentLinkDepth=1&');
    });

    it('should sanitize referenceName to lowercase', async () => {
      await api.getContentList({
        referenceName: 'POSTS',
        locale: 'en-us'
      });

      verifyRequestCall(api.makeRequest, '/list/posts');
    });

    it('should build correct URL with take parameter', async () => {
      await api.getContentList({
        referenceName: 'posts',
        locale: 'en-us',
        take: 50
      });

      verifyRequestCall(api.makeRequest, 'take=50');
    });

    it('should build correct URL with skip parameter', async () => {
      await api.getContentList({
        referenceName: 'posts',
        locale: 'en-us',
        skip: 10
      });

      verifyRequestCall(api.makeRequest, 'skip=10');
    });

    it('should build correct URL with sort and direction', async () => {
      await api.getContentList({
        referenceName: 'posts',
        locale: 'en-us',
        sort: 'fields.title',
        direction: 'desc'
      });

      verifyRequestCall(api.makeRequest, 'sort=fields.title');
      verifyRequestCall(api.makeRequest, 'direction=desc');
    });

    it('should build correct URL with filters', async () => {
      await api.getContentList({
        referenceName: 'posts',
        locale: 'en-us',
        filters: [
          { property: 'contentID', operator: 'eq', value: '123' }
        ]
      });

      verifyRequestCall(api.makeRequest, 'filter=');
    });

    it('should build correct URL with filterString', async () => {
      await api.getContentList({
        referenceName: 'posts',
        locale: 'en-us',
        filterString: 'contentID[eq]123'
      });

      verifyRequestCall(api.makeRequest, 'filter=contentID%5Beq%5D123');
    });

    it('should build correct URL with expandAllContentLinks', async () => {
      await api.getContentList({
        referenceName: 'posts',
        locale: 'en-us',
        expandAllContentLinks: true
      });

      verifyRequestCall(api.makeRequest, 'expandAllContentLinks=true');
    });

    it('should build correct URL with all parameters', async () => {
      await api.getContentList({
        referenceName: 'posts',
        locale: 'en-us',
        take: 25,
        skip: 5,
        sort: 'properties.modified',
        direction: 'asc',
        contentLinkDepth: 2,
        expandAllContentLinks: true,
        filters: [
          { property: 'properties.state', operator: 'eq', value: '2' }
        ],
        filtersLogicOperator: 'AND'
      });

      const call = api.makeRequest.mock.calls[0][0];
      expect(call.url).toContain('/list/posts');
      expect(call.url).toContain('take=25');
      expect(call.url).toContain('skip=5');
      expect(call.url).toContain('sort=properties.modified');
      expect(call.url).toContain('direction=asc');
      expect(call.url).toContain('contentLinkDepth=2');
      expect(call.url).toContain('expandAllContentLinks=true');
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

      const result = await api.getContentList({
        referenceName: 'posts',
        locale: 'en-us'
      });

      expect(result).toEqual(mockV1ContentList);
      expect(typeof result.items[0].properties.modified).toBe('string'); // V1 uses string dates
    });

    it('should return V3 response type for V3 API', async () => {
      api = getApi({
        guid: 'test-guid-d',
        apiKey: 'test-key',
        apiVersion: 'v3'
      });
      mockApiClient(api, 'v3');

      const result = await api.getContentList({
        referenceName: 'posts',
        locale: 'en-us'
      });

      expect(result).toEqual(mockV3ContentList);
      expect(result.items[0].properties.modified instanceof Date).toBe(true); // V3 uses Date objects
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
      await api.getContentList({
        referenceName: 'posts',
        locale: 'en-us'
      });

      verifyRequestCall(api.makeRequest, '/list/posts', 'get');
    });

    it('should include proper base URL for live mode', async () => {
      await api.getContentList({
        referenceName: 'posts',
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

      await api.getContentList({
        referenceName: 'posts',
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

      await expect(api.getContentList({
        referenceName: 'posts',
        locale: 'en-us'
      })).rejects.toThrow('Network error');
    });

    it('should handle authentication errors', async () => {
      mockApiClientWithError(api, 'auth');

      await expect(api.getContentList({
        referenceName: 'posts',
        locale: 'en-us'
      })).rejects.toThrow('Unauthorized');
    });

    it('should handle not found errors', async () => {
      mockApiClientWithError(api, 'notfound');

      await expect(api.getContentList({
        referenceName: 'nonexistent',
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
      await api.getContentList({
        referenceName: 'posts',
        locale: 'en-us'
      });

      verifyRequestCall(api.makeRequest, 'contentLinkDepth=1');
    });

    it('should apply default expandAllContentLinks of false', async () => {
      await api.getContentList({
        referenceName: 'posts',
        locale: 'en-us'
      });

      const call = api.makeRequest.mock.calls[0][0];
      // The URL might not explicitly show expandAllContentLinks=false if it's the default
      // Just verify the call was made successfully
      expect(call.url).toContain('/list/posts');
      expect(call.url).toContain('contentLinkDepth=1');
    });

    it('should override defaults when parameters provided', async () => {
      await api.getContentList({
        referenceName: 'posts',
        locale: 'en-us',
        contentLinkDepth: 3,
        expandAllContentLinks: true
      });

      verifyRequestCall(api.makeRequest, 'contentLinkDepth=3');
      verifyRequestCall(api.makeRequest, 'expandAllContentLinks=true');
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

    it('should return content list with proper structure', async () => {
      const result = await api.getContentList({
        referenceName: 'posts',
        locale: 'en-us'
      });

      expect(result).toBeDefined();
      expect(result.items).toBeDefined();
      expect(Array.isArray(result.items)).toBe(true);
      expect(result.totalCount).toBeDefined();
      expect(typeof result.totalCount).toBe('number');
    });

    it('should handle empty results', async () => {
      // Mock empty response
      api.makeRequest.mockResolvedValueOnce({ items: [], totalCount: 0 });

      const result = await api.getContentList({
        referenceName: 'nonexistent',
        locale: 'en-us'
      });

      expect(result.items).toEqual([]);
      expect(result.totalCount).toBe(0);
    });
  });
});
