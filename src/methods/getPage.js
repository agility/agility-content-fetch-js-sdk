import utils from '../utils'

/**
 * Gets the details of a page by its Page ID.
 * @memberof AgilityFetch.Client
 * @param {Object} requestParams - The parameters for the API request.
 * @param {number} requestParams.pageID - The unique page ID of the page you wish to retrieve in the current language.
 * @returns {Promise<AgilityFetch.Types.Page>} - Returns a page item object.
 * @example
 * 
 * import agility from '@agility/content-fetch'
 * 
 * var api = agility.getApi({
 *   instanceID: '1234-1234',
 *   accessToken: 'fEpTcRnWO3EahHbojDCeY3PwGwAzpw2gveDuPn2l0nuqFbQYVcWrQ+a3/DHcWgCgn7UL2tgbSOS0AqrEOiXkTg==',
 *   languageCode: 'en-us'
 * });
 * 
 * api.getPage({
 *     pageID: 1
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
        baseURL: utils.buildRequestUrlPath(this.config),
        headers: utils.buildAuthHeader(this.config),
        params:{}
    };
    
    return this.makeRequest(req);       
}

function validateRequestParams(requestParams) {
    if(!requestParams.pageID) {
        throw new TypeError('You must include a pageID in your request params.');
    }
}


export default getPage;