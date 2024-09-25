import { buildPathUrl, buildRequestUrlPath, buildAuthHeader } from '../utils'
import { Filter } from '../types/Filter';
import { FilterLogicOperator } from '../types/FilterLogicOperator';
import { SortDirection } from '../types/SortDirection';
import { ContentList } from '../types/ContentList';
import { ApiClientInstance } from '../types/Client'
import { TypeError } from '../types/errors/Errors';

/**
 * Retrieves a list of content items by reference name.
 * @memberof AgilityFetch.Client.Content
 * @param {Object} requestParams - The parameters for the API request.
 * @param {string} requestParams.referenceName - The unique reference name of the content list you wish to retrieve in the specified language.
 * @param {string} requestParams.locale - The locale code of the content you want to retrieve.
 * @param {string} requestParams.languageCode - DEPRECATED: Use locale instead - The language code of the content you want to retrieve.
 * @param {number} [requestParams.contentLinkDepth] - The depth, representing the levels in which you want linked content auto-resolved. Default is **1**.
 * @param {boolean} [requestParams.expandAllContentLinks] - Whether or not to expand entire linked content references, includings lists and items that are rendered in the CMS as Grid or Link. Default is **false**
 * @param {number} [requestParams.take] - The maximum number of items to retrieve in this request. Default is **10**. Maximum allowed is **250**.
 * @param {number} [requestParams.skip] - The number of items to skip from the list. Default is **0**. Used for implementing pagination.
 * @param {string} [requestParams.sort] - The field to sort the results by. Example **fields.title** or **properties.modified**.
 * @param {AgilityFetch.Types.SortDirection} [requestParams.direction] - The direction to sort the results by.
 * @param {Array.<AgilityFetch.Types.Filter>}  [requestParams.filters] - The collection of filters to filter the results by.
 * @param {AgilityFetch.Types.FilterLogicOperator} [requestParams.filtersLogicOperator] - The logic operator to combine multiple filters.
 * @returns {Promise<AgilityFetch.Types.ContentList>} - Returns a list of content items.
 * @example
 *
 * import agility from '@agility/content-fetch'
 *
 * const api = agility.getApi({
 *   guid: 'ade6cf3c',
 *   apiKey: 'defaultlive.201ffdd0841cacad5bb647e76547e918b0c9ecdb8b5ddb3cf92e9a79b03623cb',
 * });
 *
 * api.getContentList({
 *     referenceName: 'posts',
 *     locale: 'en-us',
 *     take: 50,
 *     skip: 0,
 *     sort: 'properties.modified',
 *     direction: api.types.SortDirections.ASC
 * })
 * .then(function(contentList) {
 *     console.log(contentList);
 * })
 * .catch(function(error) {
 *     console.log(error);
 * });
 *
 * api.getContentList({
 *     referenceName: 'posts',
 *     locale: 'en-us',
 *     take: 50,
 *     skip: 0,
 *     filters: [
 *      {property: 'fields.title', operator: api.types.FilterOperators.EQUAL_TO, value: '"How this site works"'},
 *      {property: 'fields.details', operator: api.types.FilterOperators.LIKE, value: '"Lorem ipsum dolar"'}
 *     ],
 *     filtersLogicOperator: api.types.FilterLogicOperators.OR
 * })
 * .then(function(contentList) {
 *     console.log(contentList);
 * })
 * .catch(function(error) {
 *     console.log(error);
 * });
*/

export interface ContentListRequestParams {

	/**
	 * The unique reference name of the content list you wish to retrieve in the specified language.
	 */
	referenceName: string;

	/**
	 * The locale code of the content you want to retrieve.
	 */
	locale?: string;

	/**
	 * The language code of the content you want to retrieve.
	 * DEPRECATED: Use locale instead.
	 */
	languageCode?: string;

	/**
	 * The depth, representing the levels in which you want linked content auto-resolved.
	 */
	contentLinkDepth?: number;

	/**
	 * Whether or not to expand entire linked content references, includings lists and items that are rendered in the CMS as Grid or Link.
	 */
	expandAllContentLinks?: boolean;

	/**
	 * The number of items to retrieve in this request. Default is 10. Maximum allowed is 250.
	 */
	take?: number;

	/**
	 * The number of items to skip from the list. Used for implementing pagination.
	 */
	skip?: number;

	/**
	 * The field to sort the results by. Example fields.title or properties.modified.
	 */
	sort?: string;

	/**
	 * The direction to sort the results by.
	 */
	direction?: SortDirection;

	/**
	 * Option: you can provide a plain text filter string as opposed to an array of filters.  This is useful if you have brackets in your filter expression.
	 */
	filterString?: string;

	/**
	 * Provide an array of filters as opposed to a plain text filter string.
	 * If you need advanced filering with brackets, use the filterString operator.
	 */
	filters?: Array<Filter>;
	filtersLogicOperator?:
	FilterLogicOperator;
}

function getContentList(this: ApiClientInstance, requestParams: ContentListRequestParams): Promise<ContentList> {

	validateRequestParams(requestParams);

	requestParams.referenceName = sanitizeReferenceName(requestParams.referenceName);

	//merge default params with request params
	requestParams = { ...defaultParams, ...requestParams };

	const req = {
		url: buildPathUrl("list", requestParams.referenceName, requestParams.skip, requestParams.take, requestParams.sort, requestParams.direction, requestParams.filters, requestParams.filtersLogicOperator, requestParams.filterString, requestParams.contentLinkDepth, requestParams.expandAllContentLinks),
		method: 'get',
		baseURL: buildRequestUrlPath(this.config, requestParams.locale ? requestParams.locale : requestParams.languageCode),
		headers: buildAuthHeader(this.config),
		params: {}
	};

	return this.makeRequest(req);
}

function sanitizeReferenceName(referenceName) {
	return referenceName.toLowerCase();
}

function validateRequestParams(requestParams) {
	if (!requestParams.languageCode && !requestParams.locale) {
		throw new TypeError('You must include a locale in your request params.', validateRequestParams)
	}
	else if (!requestParams.referenceName) {
		//must have a referenceName
		throw new TypeError('You must include a content referenceName in your request params.', validateRequestParams);
	} else if (requestParams.take && isNaN(requestParams.take)) {
		//take parameter must be a number
		throw new TypeError('Take parameter must be a number.', validateRequestParams)
	} else if ((requestParams.take || requestParams.take == 0) && !isNaN(requestParams.take) && requestParams.take < 1) {
		//take parameter must be greater than 0
		throw new TypeError('Take parameter must be greater than 0.', validateRequestParams);
	} else if (requestParams.take && !isNaN(requestParams.take) && requestParams.take > 250) {
		//take parameter cannot be greater than 250
		throw new TypeError('Take parameter must be 250 or less.', validateRequestParams);
	} else if (requestParams.skip && isNaN(requestParams.skip)) {
		//skip parameter must be a number
		throw new TypeError('Skip parameter must be a number.', validateRequestParams);
	} else if (requestParams.skip && !isNaN(requestParams.skip) && requestParams.skip < 0) {
		//skip parameter must be a number greater than 0
		throw new TypeError('Skip parameter must be 0 or greater', validateRequestParams);
	} else if (requestParams.direction && (requestParams.direction !== 'desc' && requestParams.direction !== 'asc')) {
		//check if the request direction parameter is valid
		throw new TypeError('Direction parameter must have a value of "asc" or "desc"', validateRequestParams);
	} else if (requestParams.filters && requestParams.filters.length > 0) {
		//check if the request direction parameter is valid
		for (let i = 0; i < requestParams.filters.length; i++) {
			let filter = requestParams.filters[i];
			if (!filter.hasOwnProperty('property')) {
				throw new TypeError(JSON.stringify(filter) + " does not contain 'property'.", validateRequestParams);
			} else if (!filter.hasOwnProperty('operator')) {
				throw new TypeError(JSON.stringify(filter) + " does not contain 'operator'.", validateRequestParams);
			} else if (!filter.hasOwnProperty('value')) {
				throw new TypeError(JSON.stringify(filter) + " does not contain 'value'.", validateRequestParams);
			}

			if (['eq', 'ne', 'gt', 'gte', 'lt', 'lte', 'like', 'in', 'contains'
			].indexOf(filter.operator.toLowerCase()) < 0) {
				throw new TypeError(JSON.stringify(filter) + "Operator must be one of ['eq','ne','gt','gte','lt','lte','like', 'in', 'contains'].", validateRequestParams);
			}
		}
	} else if (requestParams.filtersLogicOperator && requestParams.filtersLogicOperator.toLowerCase() !== 'and' && requestParams.filtersLogicOperator.toLowerCase() !== 'or') {
		throw new TypeError('FiltersLogicOperator parameter must have a value of "AND" or "OR"', validateRequestParams);
	} else if (requestParams.expandAllContentLinks && typeof requestParams.expandAllContentLinks !== 'boolean') {
		throw new TypeError('ExpandAllContentLinks parameter must be a value of true or false', validateRequestParams);
	}

	return true;
}

const defaultParams = {
	contentLinkDepth: 1,
	expandAllContentLinks: false
}

export default getContentList;