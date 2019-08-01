import { buildRequestUrlPath, buildAuthHeader } from '../utils'

/**
 * Gets the details of a page by its Page ID.
 * @memberof AgilityFetch.Client
 * @param {Object} requestParams - The parameters for the API request.
 * @param {number} requestParams.pageID - The unique page ID of the page you wish to retrieve in the current language.
 * @param {string} requestParams.languageCode - The language code of the content you want to retrieve.
 * @returns {Promise<AgilityFetch.Types.Page>} - Returns a page item object.
 * @example
 * 
 * import agility from '@agility/content-fetch'
 * 
 * const api = agility.getApi({
 *   guid: '191309ca-e675-4be2-bb29-351879528707',
 *   apiKey: 'aGd13M.fa30c36e553a36f871860407e902da9a7375322457acd6bcda038e60af699411',
 * });
 * 
 * api.getPage({
 *     pageID: 1,
 *     languageCode: 'en-us'
 * })
 * .then(function(page) {
 *     console.log(page);
 * })
 * .catch(function(error) {
 *     console.log(error);
 * });
*/


function getPage(requestParams) {

    validateRequestParams(requestParams);

    const req = {
        url: `/page/${requestParams.pageID}`,
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
    } else if(!requestParams.pageID) {
        throw new TypeError('You must include a pageID in your request params.');
    } else {
        return;
    }
}


export default getPage;