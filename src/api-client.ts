import axios, { AxiosAdapter, AxiosInstance } from 'axios'
import { setupCache } from 'axios-cache-adapter'
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

function buildEnvConfig() {
    const envConfig: EnvConfig = {
        baseUrl: null,
        isPreview: false,
        guid: null,
        apiKey: null
    };

    if (process && process.env) {
        let env = process.env;
        if (env.AGILITY_BASEURL) {
            envConfig.baseUrl = env.AGILITY_BASEURL;
        }
        if (env.AGILITY_GUID) {
            envConfig.guid = env.AGILITY_GUID;
        }
        if (env.AGILITY_APIKEY) {
            envConfig.apiKey = env.AGILITY_APIKEY;
        }
        
        envConfig.isPreview = env.AGILITY_ISPREVIEW === 'true';
    }

    return envConfig;
}

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

    if(!configParams.guid || configParams.guid.length == 0) {
        throw new TypeError('You must provide an guid.');
    } else if(!configParams.apiKey || configParams.apiKey.length == 0) {
        throw new TypeError('You must provide an access token.');
    } else if(configParams.caching && isNaN(configParams.caching.maxAge)) {
        throw new TypeError('When specifying a cache maxAge, you must set a number value in miliseconds, i.e. 180000 (3 mins).');
    } else if(configParams.baseUrl && !isHttps(configParams.baseUrl)) {
        throw new TypeError(`When specifying a baseUrl (${configParams.baseUrl}), it must be over HTTPs.`);
    } else {
        return;
    }
}

export interface ApiClientInstance {
    config: Config;
    makeRequest(req: any): Promise<any>; // Replace 'any' with the proper type for req if possible.
  }

class ApiClient {
    config!: Config;
    _api!: AxiosInstance;

    constructor(userConfig: Config){
        const envConfig = buildEnvConfig();

        //merge our config - user values will override our defaults
        let config: Config = {
            ...defaultConfig,
            ...envConfig,
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
    
        let adapter: AxiosAdapter | undefined = undefined;
    
        //should we turn on caching?
        if (config.caching.maxAge > 0) {
            const cache = setupCache({
                maxAge: config.caching.maxAge,
                exclude: { query: false }
            });
            adapter = cache.adapter;
        }
    
        this._api = axios.create({
            adapter: adapter,
        })

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
    async makeRequest(reqConfig : {
        baseURL: string,
        url: string,
    }){
    
        if (this.config.debug) {
            logDebug(`AgilityCMS Fetch API LOG: ${reqConfig.baseURL}${reqConfig.url}`);
        }

        //make the request using our axios instance
        try {
            const response = await this._api(reqConfig)
            let data = response.data
            //if our response is from cache, inject that property in the data response
            if (response.request.fromCache) {
                data['fromCache'] = true
            }

            if (this.config.debug) {
                data['agilityResponseHeaders'] = response.headers
            }
            return await data
        } catch (error) {
            logError(`AgilityCMS Fetch API ERROR: Request failed for ${reqConfig.baseURL}${reqConfig.url} ... ${error} ... Does the item exist?`)
        }
    }
}

export default types

export function getApi(config: Config) {
    validateConfigParams(config);
    return new ApiClient(config);
}