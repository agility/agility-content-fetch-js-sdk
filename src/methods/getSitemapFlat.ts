import { buildRequestUrlPath, buildAuthHeader } from '../utils'
import { SitemapFlat } from '../types/SitemapFlat';
import { ApiClientInstance } from '../types/Client'

/**
 * The sitemap, returned in a flat list, where the dictionary key is the page path. This method is ideal for page routing.
 * @memberof AgilityFetch.Client.Pages
 * @param {Object} requestParams - The parameters for the API request.
 * @param {number} requestParams.channelName - The reference name of the digital channel of the sitemap to return. If you only have one channel, your channel reference name is likely *website*.
 * @param {string} requestParams.locale - The locale code of the content you want to retrieve.
 * @param {string} requestParams.languageCode - DEPRECATED: Use locale instead - The language code of the content you want to retrieve.
 * @returns {Promise<AgilityFetch.Types.SitemapFlat>} - The sitemap response in a flat format.
 * @example
 * 
 * import agility from '@agility/content-fetch'
 * 
 * const api = agility.getApi({
 *   guid: 'ade6cf3c',
 *   apiKey: 'defaultlive.201ffdd0841cacad5bb647e76547e918b0c9ecdb8b5ddb3cf92e9a79b03623cb',
 * });
 * 
 * api.getSitemapFlat({
 *      channelName: 'website',
 *      locale: 'en-us'
 * })
 * .then(function(sitemap) {
 *      console.log(sitemap);
 * })
 * .catch(function(error) {
 *      console.log(error);
 * });
*/

export interface SitemapFlatRequestParams {
    channelName: string;
    locale: string;
}

function getSitemapFlat(this: ApiClientInstance, requestParams: SitemapFlatRequestParams): Promise<SitemapFlat> {

    validateRequestParams(requestParams);

    const req = {
        url: `/sitemap/flat/${requestParams.channelName}`,
        method: 'get',
        baseURL: buildRequestUrlPath(this.config, requestParams.locale),
        headers: buildAuthHeader(this.config),
        params:{}
    };
    
    return this.makeRequest(req);      
}

function validateRequestParams(requestParams) {
    if(!requestParams.languageCode && !requestParams.locale) {
        throw new TypeError('You must include a locale in your request params.')
    } else if(!requestParams.channelName) {
        throw new TypeError('You must include a channelName in your request params.');
    } else {
        return;
    }
}


export default getSitemapFlat;