import utils from '../utils'

/**
 * Retrieves a list of content items by reference name.
 * @memberof AgilityFetch.Client
 * @param {Object} requestParams - The parameters for the API request.
 * @param {string} requestParams.referenceName - The unique reference name of the content list you wish to retrieve in the specified language.
 * @param {string} requestParams.languageCode - The language code of the content you want to retrieve.
 * @param {number} [requestParams.take] - The maximum number of items to retrieve in this request. Default is **10**. Maximum allowed is **50**.
 * @param {number} [requestParams.skip] - The number of items to skip from the list. Default is **0**. Used for implementing pagination.
 * @param {number} [requestParams.sort] - The field to sort the results by. Example *fields.title* or *properties.created*. 
 * @param {number} [requestParams.direction] - The direction to sort the results by. Default is **asc**. Valid values are **asc**, **desc**.
 * @param {string} [requestParams.filter] - *Note: This parameter has not been implemented, but will be in a future version.*
 * @returns {Promise<AgilityFetch.Types.ContentList>} - Returns a list of content items.
 * @example
 * 
 * import agility from '@agility/content-fetch'
 * 
 * const api = agility.getApi({
 *   instanceID: '1234-1234',
 *   accessToken: 'fEpTcRnWO3EahHbojDCeY3PwGwAzpw2gveDuPn2l0nuqFbQYVcWrQ+a3/DHcWgCgn7UL2tgbSOS0AqrEOiXkTg=='
 * });
 * 
 * api.getContentList({
 *     referenceName: 'posts',
 *     languageCode: 'en-us',
 *     take: 50,
 *     skip: 0,
 *     sort: 'properties.created',
 *     direction: 'asc'
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
        baseURL: utils.buildRequestUrlPath(this.config, requestParams.languageCode),
        headers: utils.buildAuthHeader(this.config),
        params:{}
    };
    
    return this.makeRequest(req);   
}

function validateRequestParams(requestParams) {
    if(!requestParams.languageCode) {
        throw new TypeError('You must include a languageCode in your request params.')
    }
    else if(!requestParams.referenceName) {
        //must have a referenceName
        throw new TypeError('You must include a content referenceName in your request params.');
    } else if(requestParams.take && isNaN(requestParams.take)) {
        //take parameter must be a number
        throw new TypeError('Take parameter must be a number.')
    } else if((requestParams.take || requestParams.take == 0)  && !isNaN(requestParams.take) && requestParams.take < 1) {
        //take parameter must be greater than 0
        throw new TypeError('Take parameter must be greater than 0.');
    } else if(requestParams.take && !isNaN(requestParams.take) && requestParams.take > 50) {
        //take parameter cannot be greater than 50
        throw new TypeError('Take parameter must be 50 or less.');
    } else if(requestParams.skip && isNaN(requestParams.skip)) {
        //skip parameter must be a number
        throw new TypeError('Skip parameter must be a number.');
    } else if(requestParams.skip && !isNaN(requestParams.skip) && requestParams.skip < 0) {
        //skip parameter must be a number greater than 0
        throw new TypeError('Skip parameter must be 0 or greater');
    } else if (requestParams.direction && (requestParams.direction !== 'desc' || requestParams.direction !== 'asc')){
        //check if the request direction parameter is valid
        throw new TypeError('Direction parameter must have a value of "asc" or "desc"');
    } else {
        return;
    }
}

export default getContentList;