import { Config } from "./types/Config";

interface LogProps {
	config: Config,
	message: string

}

function logDebug({ config, message }: LogProps) {
	if (config.logLevel !== 'debug' && !config.debug) return
	console.log('\x1b[33m%s\x1b[0m', message);
}

function logInfo({ config, message }: LogProps) {
	if (config.logLevel !== 'debug' && config.logLevel !== "info") return
	console.log('\x1b[33m%s\x1b[0m', message);
}

function logWarning({ config, message }: LogProps) {
	if (config.logLevel !== 'debug' && config.logLevel !== "info" && config.logLevel !== "warn") return
	console.warn('\x1b[33m%s\x1b[0m', message);
}



function logError({ config, message }: LogProps) {
	if (config.logLevel === 'silent') return
	console.error('\x1b[41m%s\x1b[0m', message);
}

interface DebugDetails {
	type: 'request' | 'response' | 'error';
	url?: string;
	method?: string;
	guid?: string | null;
	apiType?: 'fetch' | 'preview';
	requestHeaders?: Record<string, any>;
	responseHeaders?: Record<string, any>;
	statusCode?: number;
	statusText?: string;
	contentType?: string;
	contentLength?: string;
	duration?: number;
	timestamp?: string;
	errorName?: string;
	errorMessage?: string;
	errorStack?: string;
	responsePreview?: string;
	responsePreviewTruncated?: boolean;
}

const SENSITIVE_HEADERS = ['apikey', 'authorization', 'x-api-key'];

/**
 * Converts a fetch Headers instance (or plain object) to a plain object
 */
function headersToObject(headers: Record<string, any> | Headers): Record<string, any> {
	const obj: Record<string, any> = {};

	if (headers instanceof Headers) {
		headers.forEach((value, key) => {
			obj[key] = value;
		});
	} else {
		Object.keys(headers).forEach(key => {
			obj[key] = headers[key];
		});
	}

	return obj;
}

/**
 * Sanitizes sensitive information from headers (API keys, auth tokens)
 */
function sanitizeHeaders(headers: Record<string, any> | Headers): Record<string, any> {
	const sanitized = headersToObject(headers);

	Object.keys(sanitized).forEach(key => {
		if (SENSITIVE_HEADERS.includes(key.toLowerCase())) {
			sanitized[key] = '***REDACTED***';
		}
	});

	return sanitized;
}

/**
 * Logs detailed debug information about requests, responses, and errors
 * in a uniform structured format. Enabled by config.debug or logLevel 'debug'.
 */
function logDebugDetails({ config, details }: { config: Config, details: DebugDetails }) {
	if (!config.debug && config.logLevel !== 'debug') return;

	const sanitizedDetails: DebugDetails = {
		...details,
		requestHeaders: details.requestHeaders ? sanitizeHeaders(details.requestHeaders) : undefined,
		responseHeaders: details.responseHeaders ? sanitizeHeaders(details.responseHeaders) : undefined
	};

	const banner = `=== AgilityCMS Fetch API Debug [${details.type.toUpperCase()}] ===`;
	const log = details.type === 'error' ? console.error : console.log;
	log('\x1b[36m%s\x1b[0m', banner);
	log(JSON.stringify(sanitizedDetails, null, 2));
	log('\x1b[36m%s\x1b[0m', '='.repeat(banner.length));
}



function buildRequestUrlPath(config, locale) {
	let apiFetchOrPreview = '';

	if (config.isPreview === true || config.isPreview === 'true') {
		apiFetchOrPreview = 'preview';
	} else {
		apiFetchOrPreview = 'fetch';
	}

	let urlPath = `${config.baseUrl}/${apiFetchOrPreview}/${locale}`;
	return urlPath;
}

function buildPathUrl(contentType, referenceName, skip, take, sort, direction, filters, filtersLogicOperator, filterString, contentLinkDepth, expandAllContentLinks) {
	let url = `/${contentType}/${referenceName}?contentLinkDepth=${contentLinkDepth}&`;

	filtersLogicOperator = filtersLogicOperator ? ` ${filtersLogicOperator} ` : ' AND ';

	if (sort) {
		url += `sort=${sort}&`;
		if (direction) {
			url += `direction=${direction}&`;
		}
	}

	if (skip) {
		url += `skip=${skip}&`;
	}

	if (take) {
		url += `take=${take}&`;
	}

	if (filters && filters.length > 0) {
		//use the filters array if we have it
		url += 'filter='
		for (let i = 0; i < filters.length; i++) {
			let filter = filters[i];
			url += `${filter.property}[${filter.operator}]${filter.value}` + (i < filters.length - 1 ? filtersLogicOperator : '');
		}
		url += '&';
	} else if (filterString) {
		//use the filterString if we have it and no array has been pased
		url += `filter=${encodeURIComponent(filterString)}&`;
	}

	if (expandAllContentLinks) {
		url += `expandAllContentLinks=${expandAllContentLinks}&`;
	}

	return url;
}

function buildAuthHeader(config) {
	let defaultAuthHeaders = {
		APIKey: config.apiKey,
		Guid: ''

	};

	if (config.requiresGuidInHeaders) {
		defaultAuthHeaders.Guid = config.guid;
	}

	const headers = {
		...defaultAuthHeaders,
		...config.headers
	}

	return headers

}

function isHttps(url) {
	if (!url.toLowerCase().startsWith('https://')) {
		return false;
	}
	return true;
}

export {
	buildPathUrl,
	buildAuthHeader,
	buildRequestUrlPath,
	isHttps,
	logError,
	logDebug,
	logInfo,
	logWarning,
	logDebugDetails,
	headersToObject
}

export type { DebugDetails }