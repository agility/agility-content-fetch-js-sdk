import { buildRequestUrlPath, buildAuthHeader } from '../utils'
import { Gallery } from '../types/Gallery';
import { ApiClientInstance } from '../types/Client'
import { TypeError } from '../types/errors/Errors';

/**
 * Gets the details of a gallery by their Gallery ID.
 * @memberof AgilityFetch.Client.Media
 * @param {Object} requestParams - The parameters for the API request.
 * @param {number} requestParams.galleryID - The galleryID of the requested item in this language.
 * @returns {Promise<AgilityFetch.Types.Gallery>} - Returns a gallery object.
 * @example
 *
 * import agility from '@agility/content-fetch'
 *
 * const api = agility.getApi({
 *   guid: 'ade6cf3c',
 *   apiKey: 'defaultlive.201ffdd0841cacad5bb647e76547e918b0c9ecdb8b5ddb3cf92e9a79b03623cb',
 * });
 *
 * api.getGallery({
 *     galleryID: 22
 * })
 * .then(function(gallery) {
 *     console.log(gallery);
 * })
 * .catch(function(error) {
 *     console.log(error);
 * });
 *
*/

export interface GalleryRequestParams {
    galleryID: number;
}

function getGallery(this: ApiClientInstance, requestParams: GalleryRequestParams): Promise<Gallery> {

    validateRequestParams(requestParams);

    //merge default params with request params
    requestParams = { ...defaultParams, ...requestParams };

    const req = {
        url: `/${requestParams.galleryID}`,
        method: 'get',
        baseURL: buildRequestUrlPath(this.config, 'gallery'),
        headers: buildAuthHeader(this.config),
        params: {}
    };

    return this.makeRequest(req);
}

function validateRequestParams(requestParams) {
    if (!requestParams.galleryID) {
        throw new TypeError('You must include a galleryID number in your request params.', validateRequestParams);
    } else {
        return;
    }
}

const defaultParams = {
    contentLinkDepth: 1
}

export default getGallery;