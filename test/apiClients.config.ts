import * as agilityFetch from '../dist/node';

// Suppress dotenv console logs by temporarily overriding console.log
const originalConsoleLog = console.log;
console.log = (...args: any[]) => {
  const message = args.join(' ');
  if (!message.includes('[dotenv@') && !message.includes('injecting env')) {
    originalConsoleLog(...args);
  }
};

// Load environment variables from .env file
require('dotenv').config();

// Restore console.log after dotenv is loaded
console.log = originalConsoleLog;

// Environment variable configuration
// Copy env.example to .env and configure your values
const config = {
    guid: process.env.AGILITY_GUID,
    apiKeyFetch: process.env.AGILITY_FETCH_API_KEY,
    apiKeyPreview: process.env.AGILITY_PREVIEW_API_KEY,
    baseUrl: process.env.AGILITY_BASE_URL + '/' + process.env.AGILITY_GUID, // Don't provide fallback, let buildBaseUrl handle it
    testContentId: parseInt(process.env.TEST_CONTENT_ID || '1'),
    testContentListRef: process.env.TEST_CONTENT_LIST_REFERENCE_NAME || 'posts',
    testPageId: parseInt(process.env.TEST_PAGE_ID || '1'),
    testPagePath: process.env.TEST_PAGE_PATH || '/',
    testChannelName: process.env.TEST_CHANNEL_NAME || 'website',
    testLocale: process.env.TEST_LOCALE || 'en-us',
    testGalleryId: parseInt(process.env.TEST_GALLERY_ID || '1'),
    testSpecificContentId1: parseInt(process.env.TEST_SPECIFIC_CONTENT_ID_1 || '15'),
    testSpecificContentId2: parseInt(process.env.TEST_SPECIFIC_CONTENT_ID_2 || '16'),
    testSpecificPageId: parseInt(process.env.TEST_SPECIFIC_PAGE_ID || '3'),
    testNestedContentListRef: process.env.TEST_NESTED_CONTENT_LIST_REFERENCE_NAME || 'listwithnestedcontentlink',
    testSitemapPath: process.env.TEST_SITEMAP_PATH || '/posts',
    runIntegrationTests: process.env.RUN_INTEGRATION_TESTS !== 'false', // Run by default unless explicitly disabled
    testTimeout: parseInt(process.env.TEST_TIMEOUT || '30000')
};

// Validation function to ensure required environment variables are set
export function validateTestConfig() {
    const required = ['guid', 'apiKeyFetch', 'apiKeyPreview'];
    const missing = required.filter(key => !config[key] || config[key].includes('your-') || config[key].includes('-here'));
    
    if (missing.length > 0) {
        const errorMessage = `
Integration tests require valid API credentials but found missing/invalid values for: ${missing.join(', ')}

To fix this:
1. Copy env.example to .env: cp env.example .env
2. Configure your Agility CMS credentials in .env
3. Or disable integration tests: RUN_INTEGRATION_TESTS=false

Current config:
- GUID: ${config.guid ? '✓ Set' : '✗ Missing'}
- Fetch API Key: ${config.apiKeyFetch ? '✓ Set' : '✗ Missing'}  
- Preview API Key: ${config.apiKeyPreview ? '✓ Set' : '✗ Missing'}
        `.trim();
        
        throw new Error(errorMessage);
    }
}

// Export test configuration
export const testConfig = config;

/**
 * Creates a V1 API client for fetch (live) mode
 */
export function createV1FetchClient() {
    validateTestConfig();
    
    return agilityFetch.getApi({
        guid: config.guid,
        apiKey: config.apiKeyFetch,
        // Let buildBaseUrl handle the URL construction
        apiVersion: 'v1'
    });
}

/**
 * Creates a V3 API client for fetch (live) mode
 */
export function createV3FetchClient() {
    validateTestConfig();
    
    return agilityFetch.getApi({
        guid: config.guid,
        apiKey: config.apiKeyFetch,
        // Let buildBaseUrl handle the URL construction
        apiVersion: 'v3'
    });
}

/**
 * Creates a V1 API client for preview mode
 */
export function createV1PreviewClient() {
    validateTestConfig();
    
    return agilityFetch.getApi({
        guid: config.guid,
        apiKey: config.apiKeyPreview,
        isPreview: true,
        // Let buildBaseUrl handle the URL construction
        apiVersion: 'v1'
    });
}

/**
 * Creates a V3 API client for preview mode
 */
export function createV3PreviewClient() {
    validateTestConfig();
    
    return agilityFetch.getApi({
        guid: config.guid,
        apiKey: config.apiKeyPreview,
        isPreview: true,
        // Let buildBaseUrl handle the URL construction
        apiVersion: 'v3'
    });
}

// Legacy functions for backward compatibility (default to V3)
export function createApiClient() {
    return createV3FetchClient();
}

export function createPreviewApiClient() {
    return createV3PreviewClient();
}