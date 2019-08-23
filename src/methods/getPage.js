import { buildRequestUrlPath, buildAuthHeader } from '../utils'

/**
 * Gets the details of a page by its Page ID.
 * @memberof AgilityFetch.Client
 * @param {Object} requestParams - The parameters for the API request.
 * @param {number} requestParams.pageID - The unique page ID of the page you wish to retrieve in the current language.
 * @param {string} requestParams.languageCode - The language code of the content you want to retrieve.
 * @param {number} [requestParams.contentLinkDepth] - The depth, representing the levels in which you want linked content auto-resolved. Default is 2.
 * @returns {Promise<AgilityFetch.Types.Page>} - Returns a page item object.
 * @example
 * 
 * import agility from '@agility/content-fetch'
 * 
 * const api = agility.getApi({
 *   guid: 'ade6cf3c',
 *   apiKey: 'defaultlive.201ffdd0841cacad5bb647e76547e918b0c9ecdb8b5ddb3cf92e9a79b03623cb',
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

const defaultParams = {
    contentLinkDepth: 2
}


function getPage(requestParams) {

    validateRequestParams(requestParams);

    //merge default params with request params
    requestParams = {...defaultParams, ...requestParams};

    const req = {
        url: `/page/${requestParams.pageID}?contentLinkDepth=${requestParams.contentLinkDepth}`,
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