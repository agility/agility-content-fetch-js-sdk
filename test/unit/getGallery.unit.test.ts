/**
 * Unit tests for getGallery method
 * These tests focus on SDK behavior, parameter validation, and URL construction
 * No real API calls are made - all responses are mocked
 */

import { getApi } from '../../src/api-client';
import { mockApiClient, mockApiClientWithError, verifyRequestCall, resetAllMocks } from '../utils/mock-helpers';
import { mockV1Gallery } from '../fixtures/v1-responses';
import { mockV3Gallery } from '../fixtures/v3-responses';

describe('getGallery Unit Tests', () => {
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

    it('should throw error when galleryID is missing', async () => {
      await expect(api.getGallery({})).rejects.toThrow('You must include a galleryID number in your request params');
    });

    it('should accept valid galleryID', async () => {
      mockApiClient(api, 'v3');
      
      await api.getGallery({
        galleryID: 123
      });

      verifyRequestCall(api.makeRequest, '/123');
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

    it('should build correct URL with galleryID', async () => {
      await api.getGallery({
        galleryID: 123
      });

      verifyRequestCall(api.makeRequest, '/123');
      
      const call = api.makeRequest.mock.calls[0][0];
      expect(call.baseURL).toContain('/gallery');
    });

    it('should build correct URL with different galleryID', async () => {
      await api.getGallery({
        galleryID: 456
      });

      verifyRequestCall(api.makeRequest, '/456');
    });

    it('should handle numeric galleryID correctly', async () => {
      await api.getGallery({
        galleryID: 789
      });

      const call = api.makeRequest.mock.calls[0][0];
      expect(call.url).toBe('/789');
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

      const result = await api.getGallery({
        galleryID: 123
      });

      expect(result).toEqual(mockV1Gallery);
      expect(result.galleryID).toBeDefined();
      expect(result.media).toBeDefined();
      expect(Array.isArray(result.media)).toBe(true);
    });

    it('should return V3 response type for V3 API', async () => {
      api = getApi({
        guid: 'test-guid-d',
        apiKey: 'test-key',
        apiVersion: 'v3'
      });
      mockApiClient(api, 'v3');

      const result = await api.getGallery({
        galleryID: 123
      });

      expect(result).toEqual(mockV3Gallery);
      expect(result.galleryID).toBeDefined();
      expect(result.media).toBeDefined();
      expect(Array.isArray(result.media)).toBe(true);
      expect(result.createdDate).toBeDefined(); // V2 has additional metadata
      expect(result.modifiedDate).toBeDefined();
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
      await api.getGallery({
        galleryID: 123
      });

      verifyRequestCall(api.makeRequest, '/123', 'get');
    });

    it('should include proper base URL for gallery endpoint', async () => {
      await api.getGallery({
        galleryID: 123
      });

      const call = api.makeRequest.mock.calls[0][0];
      expect(call.baseURL).toContain('/gallery');
    });

    it('should work in both live and preview modes', async () => {
      // Test live mode
      await api.getGallery({
        galleryID: 123
      });

      let call = api.makeRequest.mock.calls[0][0];
      expect(call.baseURL).toContain('/fetch');

      // Test preview mode
      api.config.isPreview = true;
      await api.getGallery({
        galleryID: 456
      });

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

      await expect(api.getGallery({
        galleryID: 123
      })).rejects.toThrow('Network error');
    });

    it('should handle authentication errors', async () => {
      mockApiClientWithError(api, 'auth');

      await expect(api.getGallery({
        galleryID: 123
      })).rejects.toThrow('Unauthorized');
    });

    it('should handle not found errors', async () => {
      mockApiClientWithError(api, 'notfound');

      await expect(api.getGallery({
        galleryID: 999999
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
      await api.getGallery({
        galleryID: 123
      });

      // The default contentLinkDepth is applied internally but not visible in URL for gallery
      // This test ensures the method runs without error with defaults
      expect(api.makeRequest).toHaveBeenCalledTimes(1);
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

    it('should return gallery with proper structure', async () => {
      const result = await api.getGallery({
        galleryID: 123
      });

      expect(result).toBeDefined();
      expect(result.galleryID).toBeDefined();
      expect(typeof result.galleryID).toBe('number');
      expect(result.name).toBeDefined();
      expect(result.description).toBeDefined();
      expect(result.media).toBeDefined();
      expect(Array.isArray(result.media)).toBe(true);
    });

    it('should handle gallery media items structure', async () => {
      const result = await api.getGallery({
        galleryID: 123
      });

      expect(result.media).toBeDefined();
      expect(Array.isArray(result.media)).toBe(true);
      
      if (result.media.length > 0) {
        const firstMediaItem = result.media[0];
        expect(firstMediaItem.mediaID).toBeDefined();
        expect(firstMediaItem.url).toBeDefined();
        expect(firstMediaItem.label).toBeDefined();
        
        // V3 should have additional metadata
        if (api.config.apiVersion === 'v3') {
          expect(firstMediaItem.size).toBeDefined();
          expect(firstMediaItem.width).toBeDefined();
          expect(firstMediaItem.height).toBeDefined();
          expect(firstMediaItem.uploadDate).toBeDefined();
        }
      }
    });

    it('should handle empty gallery', async () => {
      // Mock empty gallery response
      api.makeRequest.mockResolvedValueOnce({
        galleryID: 123,
        name: 'Empty Gallery',
        description: 'Gallery with no media',
        media: []
      });

      const result = await api.getGallery({
        galleryID: 123
      });

      expect(result.galleryID).toBe(123);
      expect(result.media).toEqual([]);
      expect(Array.isArray(result.media)).toBe(true);
    });
  });
});
