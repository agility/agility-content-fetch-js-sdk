import { buildRequestUrlPath, buildAuthHeader } from '../utils'

/**
 * Gets the details of a gallery by their Gallery ID.
 * @memberof AgilityFetch.Client.Pages
 * @param {Object} requestParams - The parameters for the API request.
 * @param {Date} [requestParams.lastAccessDate] - A Date object representing the last access date and time for the URL Redirections list.  This value should be pulled from a previous request.
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
 * let dateObj = null;
 *
 * api.getUrlRedirections({
 *     lastAccessDate: dateObj
 * })
 * .then(function({urlRedirections, lastAccessDate}) {
 *     console.log(urlRedirections.length, lastAccessDate);
 * })
 * .catch(function(error) {
 *     console.log(error);
 * });
 *
*/
function getUrlRedirections(requestParams) {

	validateRequestParams(requestParams);

	let url = "";
	if (requestParams.lastAccessDate) {
		url = `/?lastAccessDate=${requestParams.lastAccessDate.toISOString()}`
	}


	const req = {
		url: url,
		method: 'get',
		baseURL: buildRequestUrlPath(this.config, 'urlredirection'),
		headers: buildAuthHeader(this.config),
		params: {},
		returnHeaders: true
	};

	const self = this;
	let promise = new Promise(function (resolve, reject) {

		self.makeRequest(req)
			.then(response => {

				if (response == undefined || ! response)  {
					reject(new Error("The URL redirections could not be retrieved."));
				} else {

					const {headers, data} = response;

					//pull the lastAccessDate from the header
					let lastAccessDate = null;
					if (headers) {
						let dateStr = headers["x-lastaccessdate"];
						if (dateStr) lastAccessDate = new Date(dateStr);
					}

					//return an object with items and lastAccessDate
					resolve({ lastAccessDate, items: data  });
				}
			})
			.catch(error => {
				console.log("error in url redir")
				reject(error);
			}
		);
	});
	return promise;
}

function validateRequestParams(requestParams) {

	if (requestParams.lastAccessDate  && ! requestParams.lastAccessDate.toISOString) {
		throw new TypeError('You must include a valid Datetime for the lastAccessDate.');
	} else {
		return;
	}
}


export default getUrlRedirections;