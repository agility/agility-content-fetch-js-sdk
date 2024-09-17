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
		url += `filter=${filterString}&`;
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
	logWarning
}