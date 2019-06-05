import { buildRequestUrlPath, buildAuthHeader } from '../utils'

/**
 * Gets the details of a content item by their Content ID.
 * @memberof AgilityFetch.Client
 * @param {Object} requestParams - The paramters for the API request.
 * @param {number} requestParams.contentID - The contentID of the requested item in this language.
 * @param {string} requestParams.languageCode - The language code of the content you want to retrieve.
 * @returns {Promise<AgilityFetch.Types.ContentItem>} - Returns a content item object.
 * @example
 * 
 * import agility from '@agility/content-fetch'
 * 
 * const api = agility.getApi({
 *   guid: '191309ca-e675-4be2-bb29-351879528707',
 *   accessToken: 'aGd13M.fa30c36e553a36f871860407e902da9a7375322457acd6bcda038e60af699411',
 * });
 * 
 * api.getContentItem({
 *     contentID: 22,
 *     languageCode: 'en-us'
 * })
 * .then(function(contentItem) {
 *     console.log(contentItem);
 * })
 * .catch(function(error) {
 *     console.log(error);
 * });
 * 
*/

function getContentItem(requestParams) {

    validateRequestParams(requestParams);

    const req = {
        url: `/item/${requestParams.contentID}`,
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
    }
    else if(!requestParams.contentID) {
        throw new TypeError('You must include a contentID number in your request params.');
    } else {
        return;
    }
}

export default getContentItem;