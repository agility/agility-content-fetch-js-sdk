import axios from 'axios'
import utils from '../utils'


/**
 * Retrieves a list of content items by reference name.
 * @memberof AgilityFetch.Client
 * @param {string} referenceName - The unique reference name of the content list you wish to retrieve in the current language.
 * @returns {Promise<AgilityFetch.Types.ContentList>} - Returns a list of content items.
 * @example
 * 
 * var api = agility.getApi({
 *   instanceID: '1234-1234',
 *   accessToken: 'fEpTcRnWO3EahHbojDCeY3PwGwAzpw2gveDuPn2l0nuqFbQYVcWrQ+a3/DHcWgCgn7UL2tgbSOS0AqrEOiXkTg==',
 *   languageCode: 'en-us'
 * });
 * 
 * const referenceName = "Posts";
 * 
 * api.getContentItem(referenceName)
 *   .then(function(response) {
 *     console.log(response);
 *   })
 *   .catch(function(response) {
 *       console.log(response);
 *   });
*/


function getContentList(referenceName) {
    const req = {
        url: `/list/${referenceName}`,
        method: 'get',
        baseURL: utils.buildRequestUrlPath(this.config),
        headers: utils.buildAuthHeader(this.config),
        params:{}
    };
    
    return axios(req);
        
}

export default getContentList;