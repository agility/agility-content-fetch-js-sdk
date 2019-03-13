/**
 * Agility Fetch API JS SDK for retrieving content from the Agility CMS
 * @namespace AgilityFetch
 */

/**
 * Agility Fetch API JS SDK for retrieving content from the Agility CMS
 * @namespace AgilityFetch.Client
 */


/**
 * Types returned by the the Fetch API
 * @namespace AgilityFetch.Types
 */


import createClient from './api-client'

/** 
 * This is the description for create client 
 * @func
 * @name getApi
 * @memberof AgilityFetch
 * @param {Object} config - API intialization params
 * @param {string} config.instanceID - The guid that represents your instance
 * @param {string} config.accessToken - The secret token that represents your application
 * @param {string} config.languageCode - The language you want to retreive content for
 * @param {boolean} [config.isPreview] - If your access token is for preview, then set this to true
 * @return {AgilityFetch.Client}
 * @example
 * var client = agility.getApi({
 *   instanceID: '1234-1234',
 *   accessToken: 'fEpTcRnWO3EahHbojDCeY3PwGwAzpw2gveDuPn2l0nuqFbQYVcWrQ+a3/DHcWgCgn7UL2tgbSOS0AqrEOiXkTg==',
 *   languageCode: 'en-us'
 * })
 */
function getApi(config) {
    validateConfigParams(config);
    return createClient(config);
}

function validateConfigParams(configParams) {

    if(!configParams.instanceID || configParams.instanceID.length == 0) {
        throw new TypeError('You must provide an instanceID');
    }

    if(!configParams.accessToken || configParams.accessToken.length == 0) {
        throw new TypeError('You must provide an access token');
    }

    if(!configParams.languageCode || configParams.languageCode.length == 0) {
        throw new TypeError('You must provide a language code');
    }
}


export default {
    getApi
};