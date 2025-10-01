/**
 * Setup for integration tests
 * Validates environment and fails tests if not properly configured
 */

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

import { testConfig, validateTestConfig } from '../apiClients.config';

beforeAll(() => {
  // If integration tests are explicitly disabled, skip them
  if (!testConfig.runIntegrationTests) {
    // console.log('Integration tests disabled via RUN_INTEGRATION_TESTS=false');
    return;
  }

  // Validate configuration - this will throw and fail tests if config is invalid
  // This is the desired behavior: we want tests to fail if there are configuration issues
  try {
    validateTestConfig();
    // console.log('Integration test configuration validated successfully');
  } catch (error) {
    // console.error('Integration test configuration failed validation:');
    // console.error(error.message);
    throw error; // This will cause tests to fail, which is what we want
  }
});

// Only skip tests if integration tests are explicitly disabled
// Do NOT skip tests for configuration issues - let them fail instead
const originalDescribe = global.describe;
global.describe = ((name: string, fn: () => void) => {
  if (!testConfig.runIntegrationTests) {
    return originalDescribe.skip(name, fn);
  }
  return originalDescribe(name, fn);
}) as typeof describe;
