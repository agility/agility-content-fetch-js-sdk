import utils from '../utils'

/**
 * Gets the details of a content item by their Content ID.
 * @memberof AgilityFetch.Client
 * @param {Object} requestParams - The paramters for the API request.
 * @param {number} requestParams.contentID - The contentID of the requested item in this language.
 * @returns {Promise<AgilityFetch.Types.ContentItem>} - Returns a content item object.
 * @example
 * 
 * import agility from '@agility/content-fetch'
 * 
 * const api = agility.getApi({
 *   instanceID: '1234-1234',
 *   accessToken: 'fEpTcRnWO3EahHbojDCeY3PwGwAzpw2gveDuPn2l0nuqFbQYVcWrQ+a3/DHcWgCgn7UL2tgbSOS0AqrEOiXkTg==',
 *   languageCode: 'en-us'
 * });
 * 
 * api.getContentItem({
 *     contentID: 22
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
        baseURL: utils.buildRequestUrlPath(this.config),
        headers: utils.buildAuthHeader(this.config),
        params:{}
    };
    
    return this.makeRequest(req);
}

function validateRequestParams(requestParams) {
    if(!requestParams.contentID) {
        throw new TypeError('You must include a contentID number in your request params.');
    } else {
        return;
    }
}

export default getContentItem;