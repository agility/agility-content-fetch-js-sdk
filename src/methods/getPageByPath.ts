import { buildRequestUrlPath, buildAuthHeader } from "../utils";
import { Page } from "../types/Page";
import { ApiClientInstance } from "../types/Client";
import { TypeError } from "../types/errors/Errors";

/**
 * Gets the details of a page by its Page ID.
 * @memberof AgilityFetch.Client.Pages
 * @param {Object} requestParams - The parameters for the API request.
 * @param {number} requestParams.pageID - The unique page ID of the page you wish to retrieve in the current language.
 * @param {string} requestParams.locale - The locale code of the content you want to retrieve.
 * @param {string} requestParams.languageCode - DEPRECATED: Use locale instead - The language code of the content you want to retrieve.
 * @param {boolean} [requestParams.expandAllContentLinks] - Whether or not to expand entire linked content references, includings lists and items that are rendered in the CMS as Grid or Link. Default is **false**
 * @param {number} [requestParams.contentLinkDepth] - The depth, representing the levels in which you want linked content auto-resolved. Default is **2**.
 * @returns {Promise<AgilityFetch.Types.Page>} - Returns a page item object.
 * @example
 *
 * import agility from '@agility/content-fetch'
 *
 * const api = agility.getApi({
 *   guid: 'ade6cf3c',
 *   apiKey: 'defaultlive.201ffdd0841cacad5bb647e76547e918b0c9ecdb8b5ddb3cf92e9a79b03623cb',
 * });
 *
 * api.getPage({
 *     pageID: 1,
 *     locale: 'en-us'
 * })
 * .then(function(page) {
 *     console.log(page);
 * })
 * .catch(function(error) {
 *     console.log(error);
 * });
 */

export interface PageByPathRequestParams {
  pagePath: string;
  channelName: string;
  locale?: string;
  expandAllContentLinks?: boolean;
  contentLinkDepth?: number;
  languageCode?: string;
}

function getPageByPath(
  this: ApiClientInstance,
  requestParams: PageByPathRequestParams
): Promise<Page> {
  validateRequestParams(requestParams);
  const { channelName, pagePath } = requestParams;

  //merge default params with request params
  requestParams = { ...defaultParams, ...requestParams };

  const req = {
    url: `/page/${channelName}?path=${pagePath}&contentLinkDepth=${requestParams.contentLinkDepth}&expandAllContentLinks=${requestParams.expandAllContentLinks}`,
    method: "get",
    baseURL: buildRequestUrlPath(
      this.config,
      requestParams.locale || requestParams.languageCode
    ),
    headers: buildAuthHeader(this.config),
    params: {},
  };

  return this.makeRequest(req);
}

function validateRequestParams(requestParams: PageByPathRequestParams) {
  if (!requestParams.languageCode && !requestParams.locale) {
    throw new TypeError(
      "You must include a locale in your request params.",
      validateRequestParams
    );
  } else if (!requestParams.pagePath) {
    throw new TypeError(
      "You must include a page path in your request params.",
      validateRequestParams
    );
  } else if (!requestParams.channelName) {
    throw new TypeError(
      "You must include a channel name in your request params.",
      validateRequestParams
    );
  } else if (
    requestParams.expandAllContentLinks &&
    typeof requestParams.expandAllContentLinks !== "boolean"
  ) {
    throw new TypeError(
      "ExpandAllContentLinks parameter must be a value of true or false",
      validateRequestParams
    );
  } else {
    return;
  }
}

const defaultParams = {
  contentLinkDepth: 2,
  expandAllContentLinks: true,
};

export default getPageByPath;
