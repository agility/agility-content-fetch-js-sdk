import axios from 'axios'


/** 
 * This is the description for create client 
 * @param {Object} config - API intialization params
 * @param {string} config.instanceID - The guid that represents your instance
 * @param {string} config.accessToken - The secret token that represents your application
 * @param {string} config.languageCode - The language you want to retreive content for
 * @param {boolean} [config.isPreview] - If your access token is for preview, then set this to true
 */
function createClient(config) {
    validateConfigParams(config);
    return new client(config);
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

function buildRequestUrlPath(config) {
    let urlPath = null;
    if(config.isPreview) {
        urlPath = config.previewBaseUrl
    } else {
        urlPath = config.fetchBaseUrl
    }
    urlPath = `${urlPath}/${config.instanceID}/${config.languageCode}`;
    return urlPath;
}

function buildAuthHeader(config) {
    return {
        'APIKey': config.accessToken
    }
}

function client(userConfig) {
    
    //merge our config
    this.config = {
        ...defaultConfig,
        ...userConfig
    };

    
    /** Fetches the sitemap in a flat format, ideal for handling page routing*/
    this.getSitemapFlat = function() {
        const req = {
            url: '/Sitemap/Flat',
            method: 'get',
            baseURL: buildRequestUrlPath(this.config),
            headers: buildAuthHeader(this.config),
            params:{}
        };
        
        axios(req)
            .then(function(response) {
                console.log(response);
            })
            .catch(function(response) {
                console.log(response);
            });
    }
    
}


const defaultConfig = {
    fetchBaseUrl: 'http://stackpath.publishwithagility.com',
    previewBaseUrl: 'http://stackpath.publishwithagility.com',
    isPreview: false,
    instanceID: null,
    accessToken: null,
    languageCode: null
}

export default {
    createClient
};