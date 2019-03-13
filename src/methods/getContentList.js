import utils from '../utils'

/**
 * Retrieves a list of content items by reference name.
 * @memberof AgilityFetch.Client
 * @param {Object} requestParams - The parameters for the API request.
 * @param {string} requestParams.referenceName - The unique reference name of the content list you wish to retrieve in the current language.
 * @returns {Promise<AgilityFetch.Types.ContentList>} - Returns a list of content items.
 * @example
 * 
 * import aglFetch from '&#64;agility/content-fetch'
 * 
 * const api = aglFetch.getApi({
 *   instanceID: '1234-1234',
 *   accessToken: 'fEpTcRnWO3EahHbojDCeY3PwGwAzpw2gveDuPn2l0nuqFbQYVcWrQ+a3/DHcWgCgn7UL2tgbSOS0AqrEOiXkTg==',
 *   languageCode: 'en-us'
 * });
 * 
 * api.getContentList({
 *     referenceName: 'posts'
 * })
 * .then(function(contentList) {
 *     console.log(contentList);
 * })
 * .catch(function(error) {
 *     console.log(error);
 * });
*/


function getContentList(requestParams) {

    validateRequestParams(requestParams);

    const req = {
        url: `/list/${requestParams.referenceName}`,
        method: 'get',
        baseURL: utils.buildRequestUrlPath(this.config),
        headers: utils.buildAuthHeader(this.config),
        params:{}
    };
    
    return this.makeRequest(req);   
}

function validateRequestParams(requestParams) {
    if(!requestParams.referenceName) {
        throw new TypeError('You must include a content referenceName in your request params.');
    }
}

export default getContentList;