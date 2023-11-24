import getSitemapFlat, { SitemapFlatRequestParams } from './methods/getSitemapFlat'
import getSitemapNested, { SitemapNestedRequestParams } from './methods/getSitemapNested'
import getContentItem, { ContentItemRequestParams } from './methods/getContentItem'
import getContentList, { ContentListRequestParams } from './methods/getContentList'
import getPage, { PageRequestParams } from './methods/getPage'
import getGallery, { GalleryRequestParams } from './methods/getGallery'
import getUrlRedirections, { UrlRedirectionsRequestParams } from './methods/getUrlRedirections'

import getSyncContent, { SyncContentRequestParams } from './methods/getSyncContent'
import getSyncPages, { SyncPagesRequestParams } from './methods/getSyncPages'

import FilterOperators from './types/FilterOperator'
import { FilterLogicOperators } from './types/FilterLogicOperator'
import { SortDirections } from './types/SortDirection'
import { logError, logDebug } from './utils'
import { Config } from './types/Config'
import { EnvConfig } from './types/EnvConfig'
import { isHttps } from './utils'
import * as types from './types'
import { RequestParams } from './types/Client'

/**
 * How to create an instance of an an API client for the Agility Content Fetch REST API.
 * @func
 * @name getApi
 * @memberof AgilityFetch
 * @param {Object} config - API intialization params.
 * @param {string} config.guid - The guid that represents your instance.
 * @param {string} config.apiKey - The secret token that represents your application.
 * @param {boolean} [config.isPreview] - If your access token is for preview, then set this to true.
 * @param {Object} [config.caching] - Optional Caching options. Caching is disabled by default.
 * @param {number} [config.caching.maxAge] - In miliseconds. Default value is *0* (disabled). Recommeded value is *180000* (3 mins). Requests are cached in memory only (node or browser).
 * @param {string} [config.baseUrl] - Optionally override the default API Base Url.
 * @return {AgilityFetch.Client}
 * @example
 *
 * import agility from '@agility/content-fetch'
 *
 * const api = agility.getApi({
 *   guid: '191309ca-e675-4be2-bb29-351879528707',
 *   apiKey: 'aGd13M.fa30c36e553a36f871860407e902da9a7375322457acd6bcda038e60af699411',
 *   isPreview: false
 * });
 */


const defaultConfig: Config = {
	baseUrl: null,
	isPreview: false,
	guid: null,
	apiKey: null,
	locale: null,
	headers: {},
	requiresGuidInHeaders: false,
	debug: false,
	caching: {
		maxAge: 0 //caching disabled by default
	}
};


function buildBaseUrl(guid: string) {

	let baseUrlSuffixes = {
		u: '',
		c: '-ca',
		e: '-eu',
		a: '-aus',
		d: '-dev'
	}

	let suffix = guid.substr(guid.length - 2, 2);
	let env = suffix.substr(1);
	// New format of guid
	if (suffix.startsWith('-') && baseUrlSuffixes.hasOwnProperty(env)) {
		return `https://api${baseUrlSuffixes[env]}.aglty.io/${guid}`
	}
	else {
		//use default url
		return `https://${guid}-api.agilitycms.cloud`;
	}
}

function validateConfigParams(configParams: Config) {

	if (!configParams.guid || configParams.guid.length == 0) {
		throw new TypeError('You must provide a guid.');
	} else if (!configParams.apiKey || configParams.apiKey.length == 0) {
		throw new TypeError('You must provide an access token.');
	} else if (configParams.caching && isNaN(configParams.caching.maxAge)) {
		throw new TypeError('When specifying a cache maxAge, you must set a number value in miliseconds, i.e. 180000 (3 mins).');
	} else if (configParams.baseUrl && !isHttps(configParams.baseUrl)) {
		throw new TypeError(`When specifying a baseUrl (${configParams.baseUrl}), it must be over HTTPs.`);
	} else {
		return;
	}
}

export interface ApiClientInstance {
	config: Config;
	makeRequest(req: any): Promise<any>; // Replace 'any' with the proper type for req if possible.
	getSitemapFlat(params: SitemapFlatRequestParams): Promise<any>;
	getSitemapNested(params: SitemapNestedRequestParams): Promise<any>;
	getContentItem(params: ContentItemRequestParams): Promise<any>;
	getContentList(params: ContentListRequestParams): Promise<any>;
	getPage(params: PageRequestParams): Promise<any>;
	getGallery(params: GalleryRequestParams): Promise<any>;
	getUrlRedirections(params: UrlRedirectionsRequestParams): Promise<any>;
	getSyncContent(params: SyncContentRequestParams): Promise<any>;
	getSyncPages(params: SyncPagesRequestParams): Promise<any>;

}

class ApiClient {
	config!: Config;

	constructor(userConfig: Config) {

		//merge our config - user values will override our defaults
		let config: Config = {
			...defaultConfig,
			...userConfig
		};

		//compute the base Url
		if (!config.baseUrl) {
			config.baseUrl = buildBaseUrl(config?.guid || '');
		} else {
			//we are using a custom url, make sure we include the guid in the headers
			config.requiresGuidInHeaders = true;
		}

		this.config = config;


	}

	types = types;

	async getContentItem(params: ContentItemRequestParams) {
		return getContentItem.call(this, params);
	}

	async getContentList(params: ContentListRequestParams) {
		return getContentList.call(this, params);
	}

	async getGallery(params: GalleryRequestParams) {
		return getGallery.call(this, params);
	}

	async getPage(params: PageRequestParams) {
		return getPage.call(this, params);
	}

	async getSitemapFlat(params: SitemapFlatRequestParams) {
		return getSitemapFlat.call(this, params);
	}

	async getSitemapNested(params: SitemapNestedRequestParams) {
		return getSitemapNested.call(this, params);
	}

	async getUrlRedirections(params: UrlRedirectionsRequestParams) {
		return getUrlRedirections.call(this, params);
	}

	async getSyncContent(params: SyncContentRequestParams) {
		return getSyncContent.call(this, params);
	}

	async getSyncPages(params: SyncPagesRequestParams) {
		return getSyncPages.call(this, params);
	}

	//the function that actually makes ALL our requests
	async makeRequest(reqConfig: RequestParams) {


		if (this.config.debug) {
			logDebug(`AgilityCMS Fetch API LOG: ${reqConfig.baseURL}${reqConfig.url}`);
		}

		//make the request using our axios instance
		try {

			const fullUrl = `${reqConfig.baseURL}${reqConfig.url}`

			let init: RequestInit = {
				method: "GET",
				headers: {
					...reqConfig.headers,
					'Content-Type': 'application/json',
					'Accept': 'application/json',

				}
			}


			const response = await fetch(fullUrl, init)
			if (!response.ok) {
				// *** NOT ok ***
				logError(`AgilityCMS Fetch API ERROR: Request returned a ${response.status} response  for ${reqConfig.baseURL}${reqConfig.url}. ${response.statusText}`)
				return
			}

			// *** OK ***
			let data = await response.json()

			if (this.config.debug) {
				data['agilityResponseHeaders'] = response.headers
			}

			return data

		} catch (error) {
			logError(`AgilityCMS Fetch API ERROR: Request failed for ${reqConfig.baseURL}${reqConfig.url} ... ${error} ... Does the item exist?`)
		}
	}
}


export function getApi(config: Config) {
	validateConfigParams(config);
	return new ApiClient(config);
}

export default getApi;