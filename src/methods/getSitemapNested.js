import axios from 'axios'
import utils from '../utils'


/**
 * Gets the sitemap as an array in a nested format, ideal for generating menus.
 * @memberof AgilityFetch.Client
 * @returns {Promise<AgilityFetch.Types.SitemapNested>} - The array of sitemap items returned.
 * @example
 * 
 * var api = agility.getApi({
 *   instanceID: '1234-1234',
 *   accessToken: 'fEpTcRnWO3EahHbojDCeY3PwGwAzpw2gveDuPn2l0nuqFbQYVcWrQ+a3/DHcWgCgn7UL2tgbSOS0AqrEOiXkTg==',
 *   languageCode: 'en-us'
 * });
 * 
 * api.getSitemapNested()
 *   .then(function(response) {
 *     console.log(response);
 *   })
 *   .catch(function(response) {
 *       console.log(response);
 *   });
*/
function getSitemapNested() {
    const req = {
        url: '/Sitemap/Nested',
        method: 'get',
        baseURL: utils.buildRequestUrlPath(this.config),
        headers: utils.buildAuthHeader(this.config),
        params:{}
    };
    
    return axios(req);
        
}

export default getSitemapNested;