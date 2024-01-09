export interface Config {
  baseUrl?: string | null;
  isPreview?: boolean;
  guid?: string | null;
  apiKey?: string | null;
  locale?: string | null;
  headers?: { [key: string]: string };
  requiresGuidInHeaders?: boolean;
  debug?: boolean;
  caching?: {
    maxAge?: number; // caching disabled by default
  }
  fetchConfig?: any
}