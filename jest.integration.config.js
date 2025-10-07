const baseConfig = require('./jest.config.js');

// Suppress dotenv logs before any tests run
process.env.DOTENV_CONFIG_SILENT = 'true';

module.exports = {
  ...baseConfig,
  displayName: 'Integration Tests',
  testMatch: [
    '<rootDir>/test/integration/**/*.integration.test.ts',
    '<rootDir>/test/integration/**/*.integration.test.js'
  ],
  testTimeout: 30000, // Integration tests can be slower
  setupFilesAfterEnv: [
    '<rootDir>/test/integration/setup.ts'
  ],
  // Don't collect coverage for integration tests
  collectCoverage: false
};
