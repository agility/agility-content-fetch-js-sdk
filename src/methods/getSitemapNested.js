import { buildRequestUrlPath, buildAuthHeader } from '../utils'

/**
 * Gets the sitemap as an array in a nested format, ideal for generating menus.
 * @memberof AgilityFetch.Client
 * @param {Object} requestParams - The parameters for the API request.
 * @param {number} requestParams.channelName - The reference name of the digital channel of the sitemap to return. If you only have one channel, your channel reference name is likely *website*.
 * @param {string} requestParams.languageCode - The language code of the content you want to retrieve.
 * @returns {Promise<AgilityFetch.Types.SitemapNested>} - The array of sitemap items returned.
 * @example
 * 
 * import agility from '@agility/content-fetch'
 * 
 * const api = agility.getApi({
 *   guid: '191309ca-e675-4be2-bb29-351879528707',
 *   apiKey: 'aGd13M.fa30c36e553a36f871860407e902da9a7375322457acd6bcda038e60af699411',
 * });
 * 
 * api.getSitemapNested({
 *      channelName: 'website',
 *      languageCode: 'en-us'
 * })
 * .then(function(sitemap) {
 *      console.log(sitemap);
 * })
 * .catch(function(error) {
 *      console.log(error);
 * });
*/

function getSitemapNested(requestParams) {

    validateRequestParams(requestParams);

    const req = {
        url: `/Sitemap/Nested/${requestParams.channelName}`,
        method: 'get',
        baseURL: buildRequestUrlPath(this.config, requestParams.languageCode),
        headers: buildAuthHeader(this.config),
        params:{}
    };
    
    return this.makeRequest(req);   
}

function validateRequestParams(requestParams) {
    if(!requestParams.languageCode) {
        throw new TypeError('You must include a languageCode in your request params.')
    } else if(!requestParams.channelName) {
        throw new TypeError('You must include a channelName in your request params.');
    }
}

export default getSitemapNested;