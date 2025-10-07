/**
 * Unit tests for getUrlRedirections method
 * These tests focus on SDK behavior, parameter validation, and URL construction
 * No real API calls are made - all responses are mocked
 */

import { getApi } from '../../src/api-client';
import { mockApiClient, mockApiClientWithError, verifyRequestCall, resetAllMocks } from '../utils/mock-helpers';
import { mockV1UrlRedirections } from '../fixtures/v1-responses';
import { mockV2UrlRedirections } from '../fixtures/v2-responses';

describe('getUrlRedirections Unit Tests', () => {
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

    it('should accept empty parameters', async () => {
      mockApiClient(api, 'v2');
      
      await api.getUrlRedirections({});

      verifyRequestCall(api.makeRequest, '');
    });

    it('should accept null lastAccessDate', async () => {
      mockApiClient(api, 'v2');
      
      await api.getUrlRedirections({
        lastAccessDate: null
      });

      verifyRequestCall(api.makeRequest, '');
    });

    it('should accept valid Date object for lastAccessDate', async () => {
      mockApiClient(api, 'v2');
      const testDate = new Date('2023-01-01T00:00:00.000Z');
      
      await api.getUrlRedirections({
        lastAccessDate: testDate
      });

      verifyRequestCall(api.makeRequest, '/?lastAccessDate=2023-01-01T00:00:00.000Z');
    });

    it('should accept date string for lastAccessDate', async () => {
      mockApiClient(api, 'v2');
      
      await api.getUrlRedirections({
        lastAccessDate: '2023-01-01T00:00:00.000Z' as any
      });

      verifyRequestCall(api.makeRequest, '/?lastAccessDate=2023-01-01T00:00:00.000Z');
    });

    it('should throw error for invalid date string', async () => {
      await expect(api.getUrlRedirections({
        lastAccessDate: 'invalid-date' as any
      })).rejects.toThrow('You must include a valid Datetime for the lastAccessDate');
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

    it('should build correct URL without lastAccessDate', async () => {
      await api.getUrlRedirections({});

      const call = api.makeRequest.mock.calls[0][0];
      expect(call.url).toBe('');
      expect(call.baseURL).toContain('/urlredirection');
    });

    it('should build correct URL with lastAccessDate', async () => {
      const testDate = new Date('2023-01-01T12:30:45.123Z');
      
      await api.getUrlRedirections({
        lastAccessDate: testDate
      });

      verifyRequestCall(api.makeRequest, '/?lastAccessDate=2023-01-01T12:30:45.123Z');
    });

    it('should properly encode lastAccessDate in URL', async () => {
      const testDate = new Date('2023-12-31T23:59:59.999Z');
      
      await api.getUrlRedirections({
        lastAccessDate: testDate
      });

      const call = api.makeRequest.mock.calls[0][0];
      expect(call.url).toContain('lastAccessDate=2023-12-31T23:59:59.999Z');
    });

    it('should include proper base URL', async () => {
      await api.getUrlRedirections({});

      const call = api.makeRequest.mock.calls[0][0];
      expect(call.baseURL).toContain('/urlredirection');
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

      const result = await api.getUrlRedirections({});

      expect(result).toEqual(mockV1UrlRedirections);
      expect(Array.isArray(result)).toBe(true);
      if (result.length > 0) {
        expect(result[0].url).toBeDefined();
        expect(result[0].destinationUrl).toBeDefined();
        expect(result[0].statusCode).toBeDefined();
      }
    });

    it('should return V2 response type for V2 API', async () => {
      api = getApi({
        guid: 'test-guid-d',
        apiKey: 'test-key',
        apiVersion: 'v2'
      });
      mockApiClient(api, 'v2');

      const result = await api.getUrlRedirections({});

      expect(result).toEqual(mockV2UrlRedirections);
      expect(Array.isArray(result)).toBe(true);
      if (result.length > 0) {
        expect(result[0].url).toBeDefined();
        expect(result[0].destinationUrl).toBeDefined();
        expect(result[0].statusCode).toBeDefined();
        expect(result[0].createdDate).toBeDefined(); // V2 has additional metadata
        expect(result[0].isActive).toBeDefined();
      }
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
      await api.getUrlRedirections({});

      verifyRequestCall(api.makeRequest, '', 'get');
    });

    it('should work in both live and preview modes', async () => {
      // Test live mode
      await api.getUrlRedirections({});

      let call = api.makeRequest.mock.calls[0][0];
      expect(call.baseURL).toContain('/fetch');

      // Test preview mode
      api.config.isPreview = true;
      await api.getUrlRedirections({});

      call = api.makeRequest.mock.calls[1][0];
      expect(call.baseURL).toContain('/preview');
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

      await expect(api.getUrlRedirections({})).rejects.toThrow('Network error');
    });

    it('should handle authentication errors', async () => {
      mockApiClientWithError(api, 'auth');

      await expect(api.getUrlRedirections({})).rejects.toThrow('Unauthorized');
    });

    it('should handle API errors and reject with custom message', async () => {
      // Mock the makeRequest to return undefined (simulating API failure)
      api.makeRequest = jest.fn().mockResolvedValue(undefined);

      await expect(api.getUrlRedirections({})).rejects.toThrow('The URL redirections could not be retrieved');
    });

    it('should handle API errors and reject with custom message for null response', async () => {
      // Mock the makeRequest to return null
      api.makeRequest = jest.fn().mockResolvedValue(null);

      await expect(api.getUrlRedirections({})).rejects.toThrow('The URL redirections could not be retrieved');
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

    it('should return array of URL redirections', async () => {
      const result = await api.getUrlRedirections({});

      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    });

    it('should handle URL redirection structure', async () => {
      const result = await api.getUrlRedirections({});

      if (result.length > 0) {
        const firstRedirection = result[0];
        expect(firstRedirection.url).toBeDefined();
        expect(typeof firstRedirection.url).toBe('string');
        expect(firstRedirection.destinationUrl).toBeDefined();
        expect(typeof firstRedirection.destinationUrl).toBe('string');
        expect(firstRedirection.statusCode).toBeDefined();
        expect(typeof firstRedirection.statusCode).toBe('number');
        expect([301, 302, 307, 308]).toContain(firstRedirection.statusCode);
      }
    });

    it('should handle empty redirections list', async () => {
      // Mock empty redirections response
      api.makeRequest.mockResolvedValueOnce([]);

      const result = await api.getUrlRedirections({});

      expect(result).toEqual([]);
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(0);
    });

    it('should handle incremental updates with lastAccessDate', async () => {
      const lastAccessDate = new Date('2023-01-01T00:00:00.000Z');
      
      // Mock response for incremental update (typically fewer items)
      api.makeRequest.mockResolvedValueOnce([mockV2UrlRedirections[0]]);

      const result = await api.getUrlRedirections({
        lastAccessDate
      });

      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(1);
    });
  });

  describe('Date Handling', () => {
    beforeEach(() => {
      api = getApi({
        guid: 'test-guid-d',
        apiKey: 'test-key'
      });
      mockApiClient(api, 'v2');
    });

    it('should convert string dates to Date objects', async () => {
      const dateString = '2023-01-01T00:00:00.000Z';
      
      await api.getUrlRedirections({
        lastAccessDate: dateString as any
      });

      verifyRequestCall(api.makeRequest, `lastAccessDate=${dateString}`);
    });

    it('should handle Date objects correctly', async () => {
      const dateObj = new Date('2023-01-01T00:00:00.000Z');
      
      await api.getUrlRedirections({
        lastAccessDate: dateObj
      });

      verifyRequestCall(api.makeRequest, 'lastAccessDate=2023-01-01T00:00:00.000Z');
    });

    it('should validate date conversion for invalid strings', async () => {
      await expect(api.getUrlRedirections({
        lastAccessDate: 'not-a-date' as any
      })).rejects.toThrow('You must include a valid Datetime for the lastAccessDate');
    });
  });
});
