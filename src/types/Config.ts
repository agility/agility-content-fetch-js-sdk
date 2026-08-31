export interface Config {
  /**
   * The optional baseUrl for the API.  If not provided, the API will use the default baseUrl for the instance.
   * This is mostly used for testing purposes.
   */
  baseUrl?: string | null;

  /**
   * If true, the API will use the Preview API.  If false, it will use the Fetch API. Default is false.
   * Make sure the API Key provided matches this value.
   */
  isPreview?: boolean;

  /**
   * The guid that represents your instance.
   */
  guid?: string | null;

  /**
   * The Fetch or Preview API key.
   */
  apiKey?: string | null;
  locale?: string | null;
  /**
   * Additional headers to include in the request.
   */
  headers?: { [key: string]: string };
  requiresGuidInHeaders?: boolean;

  /**
   * The logging level.  Default is 'warn'.
   */
  logLevel?: 'debug' | 'info' | 'warn' | 'error' | 'silent';

  /**
   * Enable debug mode for detailed logging. Default is false.
   * Detailed logging is also enabled when logLevel is set to 'debug'.
   * When enabled:
   * - Adds comprehensive structured request/response/error logging with timing information,
   *   instance guid, api type (fetch/preview), and request/response headers
   * - Logs error details including status codes, headers, response body previews,
   *   and exception name/message/stack
   * - Sanitizes sensitive data (API keys, auth tokens) in debug output
   * - When debug is true, also includes response headers in the returned data as 'agilityResponseHeaders'
   */
  debug?: boolean;

  /**
   * Optional Caching options. Caching is disabled by default.
   * This is mostly used for Next.js and other server-side rendering frameworks.
   */
  caching?: {
    maxAge?: number; // caching disabled by default
  }
  fetchConfig?: any
}