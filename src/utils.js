function buildRequestUrlPath(config, languageCode) {
    let urlPath = null;
    let apiFetchOrPreview = null;

    if(config.isPreview) {
        apiFetchOrPreview  = 'preview';
    } else {
        apiFetchOrPreview = 'fetch';
    }

    urlPath = `${config.baseUrl}/${apiFetchOrPreview}/${languageCode}`;
    return urlPath;
}

function buildAuthHeader(config) {
    let defaultAuthHeaders = {
        'APIKey': config.accessToken
    };

    if(config.requiresGuidInHeaders) {
        defaultAuthHeaders.Guid = config.guid;
    }

    return {
        ...defaultAuthHeaders,
        ...config.headers
    }

}

function isHttps(url) {
    if(!url.toLowerCase().startsWith('https://')) {
        return false;
    }
    return true;
}


export {
    buildAuthHeader,
    buildRequestUrlPath,
    isHttps
}