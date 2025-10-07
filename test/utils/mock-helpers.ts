/**
 * Mock utilities for unit testing
 * Provides helpers for mocking API client methods and responses
 */

import { ApiClientInstance } from '../../src/types/sdk';
import * as v1Fixtures from '../fixtures/v1-responses';
import * as v2Fixtures from '../fixtures/v2-responses';

/**
 * Mock the makeRequest method of an API client
 * @param apiClient - The API client instance to mock
 * @param apiVersion - The API version to mock responses for ('v1' | 'v2')
 */
export function mockApiClient(apiClient: any, apiVersion: 'v1' | 'v2' = 'v2') {
  
  jest.spyOn(apiClient, 'makeRequest').mockImplementation((req: any) => {
    const url = req.url;
    const baseURL = req.baseURL || '';
    const fullUrl = `${baseURL}${url}`;
    
    // Content Item requests
    if (url.includes('/item/')) {
      const contentId = extractIdFromUrl(url, '/item/');
      if (contentId === 999999) {
        return Promise.reject(new Error('Content not found'));
      }
      return Promise.resolve(apiVersion === 'v1' ? v1Fixtures.mockV1ContentItem : v2Fixtures.mockV2ContentItem);
    }
    
    // Content List requests
    if (url.includes('/list/')) {
      const referenceName = extractReferenceFromUrl(url, '/list/');
      if (referenceName === 'nonexistent') {
        return Promise.resolve({ items: [], totalCount: 0 });
      }
      return Promise.resolve(apiVersion === 'v1' ? v1Fixtures.mockV1ContentList : v2Fixtures.mockV2ContentList);
    }
    
    // Page requests
    if (url.includes('/page/') && !url.includes('?path=')) {
      const pageId = extractIdFromUrl(url, '/page/');
      if (pageId === 999999) {
        return Promise.reject(new Error('Page not found'));
      }
      return Promise.resolve(apiVersion === 'v1' ? v1Fixtures.mockV1Page : v2Fixtures.mockV2Page);
    }
    
    // Page by path requests
    if (url.includes('/page/') && url.includes('?path=')) {
      const path = extractPathFromUrl(url);
      if (path === '/nonexistent') {
        return Promise.reject(new Error('Page not found'));
      }
      return Promise.resolve(apiVersion === 'v1' ? v1Fixtures.mockV1Page : v2Fixtures.mockV2Page);
    }
    
    // Gallery requests
    if (fullUrl.includes('/gallery/')) {
      const galleryId = extractIdFromUrl(url, '/');
      if (galleryId === 999999) {
        return Promise.reject(new Error('Gallery not found'));
      }
      return Promise.resolve(apiVersion === 'v1' ? v1Fixtures.mockV1Gallery : v2Fixtures.mockV2Gallery);
    }
    
    // Sitemap flat requests
    if (url.includes('/sitemap/flat/')) {
      return Promise.resolve(apiVersion === 'v1' ? v1Fixtures.mockV1SitemapFlat : v2Fixtures.mockV2SitemapFlat);
    }
    
    // Sitemap nested requests
    if (url.includes('/sitemap/nested/')) {
      return Promise.resolve(apiVersion === 'v1' ? v1Fixtures.mockV1SitemapNested : v2Fixtures.mockV2SitemapNested);
    }
    
    // Sync content requests
    if (url.includes('/sync/items')) {
      return Promise.resolve(apiVersion === 'v1' ? v1Fixtures.mockV1SyncContent : v2Fixtures.mockV2SyncContent);
    }
    
    // Sync pages requests
    if (url.includes('/sync/pages')) {
      return Promise.resolve(apiVersion === 'v1' ? v1Fixtures.mockV1SyncPages : v2Fixtures.mockV2SyncPages);
    }
    
    // URL redirections requests
    if (fullUrl.includes('/urlredirection')) {
      return Promise.resolve(apiVersion === 'v1' ? v1Fixtures.mockV1UrlRedirections : v2Fixtures.mockV2UrlRedirections);
    }
    
    // Default: return error for unhandled requests
    return Promise.reject(new Error(`Unhandled mock request: ${fullUrl}`));
  });
}

/**
 * Mock API client to simulate errors
 * @param apiClient - The API client instance to mock
 * @param errorType - Type of error to simulate
 */
export function mockApiClientWithError(apiClient: any, errorType: 'network' | 'auth' | 'notfound' | 'badrequest' = 'network') {
  jest.spyOn(apiClient, 'makeRequest').mockImplementation(() => {
    switch (errorType) {
      case 'network':
        return Promise.reject(new Error('Network error'));
      case 'auth':
        return Promise.reject(new Error('Unauthorized'));
      case 'notfound':
        return Promise.reject(new Error('Not found'));
      case 'badrequest':
        return Promise.reject(new Error('Bad request'));
      default:
        return Promise.reject(new Error('Unknown error'));
    }
  });
}

/**
 * Create a mock API client with specific configuration
 * @param config - Configuration for the mock client
 */
export function createMockApiClient(config: { apiVersion?: 'v1' | 'v2', guid?: string, apiKey?: string } = {}) {
  const mockClient = {
    config: {
      apiVersion: config.apiVersion || 'v2',
      guid: config.guid || 'test-guid',
      apiKey: config.apiKey || 'test-key',
      baseUrl: 'https://api.example.com/test-guid',
      isPreview: false
    },
    makeRequest: jest.fn(),
    // Add method stubs that will be mocked
    getContentItem: jest.fn(),
    getContentList: jest.fn(),
    getPage: jest.fn(),
    getPageByPath: jest.fn(),
    getGallery: jest.fn(),
    getSitemapFlat: jest.fn(),
    getSitemapNested: jest.fn(),
    getSyncContent: jest.fn(),
    getSyncPages: jest.fn(),
    getUrlRedirections: jest.fn()
  };
  
  // Mock the client with appropriate responses
  mockApiClient(mockClient, config.apiVersion);
  
  return mockClient;
}

/**
 * Verify that a request was made with correct parameters
 * @param mockFn - The mocked function to verify
 * @param expectedUrl - Expected URL pattern
 * @param expectedMethod - Expected HTTP method
 */
export function verifyRequestCall(mockFn: jest.Mock, expectedUrl: string | RegExp, expectedMethod: string = 'get') {
  expect(mockFn).toHaveBeenCalled();
  const call = mockFn.mock.calls[mockFn.mock.calls.length - 1][0];
  
  if (typeof expectedUrl === 'string') {
    expect(call.url).toContain(expectedUrl);
  } else {
    expect(call.url).toMatch(expectedUrl);
  }
  
  expect(call.method).toBe(expectedMethod);
}

/**
 * Verify that proper headers were sent
 * @param mockFn - The mocked function to verify
 * @param expectedHeaders - Expected headers object
 */
export function verifyRequestHeaders(mockFn: jest.Mock, expectedHeaders: Record<string, string>) {
  expect(mockFn).toHaveBeenCalled();
  const call = mockFn.mock.calls[mockFn.mock.calls.length - 1][0];
  
  Object.entries(expectedHeaders).forEach(([key, value]) => {
    expect(call.headers[key]).toBe(value);
  });
}

// Helper functions for URL parsing
function extractIdFromUrl(url: string, pattern: string): number {
  const regex = new RegExp(`${pattern.replace('/', '\\/')}(\\d+)`);
  const match = url.match(regex);
  return match ? parseInt(match[1], 10) : 0;
}

function extractReferenceFromUrl(url: string, pattern: string): string {
  const regex = new RegExp(`${pattern.replace('/', '\\/')}([^?]+)`);
  const match = url.match(regex);
  return match ? match[1] : '';
}

function extractPathFromUrl(url: string): string {
  const match = url.match(/path=([^&]+)/);
  return match ? decodeURIComponent(match[1]) : '';
}

/**
 * Reset all mocks - useful in beforeEach/afterEach
 */
export function resetAllMocks() {
  jest.clearAllMocks();
  jest.resetAllMocks();
}
