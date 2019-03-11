import axios from 'axios'
import utils from '../utils'


/**
 * Gets the details of a page by its Page ID.
 * @memberof AgilityFetch.Client
 * @param {number} pageID - The unique page ID of the page you wish to retrieve in the current language.
 * @returns {Promise<AgilityFetch.Types.ContentItem>} - Returns a content item object.
 * @example
 * 
 * var api = agility.getApi({
 *   instanceID: '1234-1234',
 *   accessToken: 'fEpTcRnWO3EahHbojDCeY3PwGwAzpw2gveDuPn2l0nuqFbQYVcWrQ+a3/DHcWgCgn7UL2tgbSOS0AqrEOiXkTg==',
 *   languageCode: 'en-us'
 * });
 * 
 * const pageID = 1;
 * 
 * api.getPage(pageID)
 *   .then(function(response) {
 *     console.log(response);
 *   })
 *   .catch(function(response) {
 *       console.log(response);
 *   });
*/


function getPage(pageID) {
    const req = {
        url: `/page/${pageID}`,
        method: 'get',
        baseURL: utils.buildRequestUrlPath(this.config),
        headers: utils.buildAuthHeader(this.config),
        params:{}
    };
    
    return axios(req);
        
}

export default getPage;