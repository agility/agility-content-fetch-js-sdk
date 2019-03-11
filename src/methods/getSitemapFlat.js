import axios from 'axios'
import utils from '../utils'


/**
 * Gets the sitemap in a flat format, ideal for page routing
 * @memberof AgilityFetch.Client
 * @returns {Promise<AgilityFetch.Types.SitemapFlat>} - the flat sitemap
 * @example
 * 
 * var api = agility.getApi({
 *   instanceID: '1234-1234',
 *   accessToken: 'fEpTcRnWO3EahHbojDCeY3PwGwAzpw2gveDuPn2l0nuqFbQYVcWrQ+a3/DHcWgCgn7UL2tgbSOS0AqrEOiXkTg==',
 *   languageCode: 'en-us'
 * });
 * 
 * api.getSitemapFlat()
 *   .then(function(response) {
 *     console.log(response);
 *   })
 *   .catch(function(response) {
 *       console.log(response);
 *   });
*/
function getSitemapFlat() {
    const req = {
        url: '/Sitemap/Flat',
        method: 'get',
        baseURL: utils.buildRequestUrlPath(this.config),
        headers: utils.buildAuthHeader(this.config),
        params:{}
    };
    
    return axios(req);
        
}

export default getSitemapFlat;