import axios from 'axios'
import utils from '../utils'


/**
 * Gets the details of a content item by their Content ID.
 * @memberof AgilityFetch.Client
 * @param {number} contentID - The unique content ID of the content item you wish to retrieve in the current language.
 * @returns {Promise<AgilityFetch.Types.ContentItem>} - Returns a content item object.
 * @example
 * 
 * var api = agility.getApi({
 *   instanceID: '1234-1234',
 *   accessToken: 'fEpTcRnWO3EahHbojDCeY3PwGwAzpw2gveDuPn2l0nuqFbQYVcWrQ+a3/DHcWgCgn7UL2tgbSOS0AqrEOiXkTg==',
 *   languageCode: 'en-us'
 * });
 * 
 * const contentID = 22;
 * 
 * api.getContentItem(contentID)
 *   .then(function(response) {
 *     console.log(response);
 *   })
 *   .catch(function(response) {
 *       console.log(response);
 *   });
*/


function getContentItem(contentID) {
    const req = {
        url: `/item/${contentID}`,
        method: 'get',
        baseURL: utils.buildRequestUrlPath(this.config),
        headers: utils.buildAuthHeader(this.config),
        params:{
            contentID: contentID
        }
    };
    
    return axios(req);
        
}

export default getContentItem;