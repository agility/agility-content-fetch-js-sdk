function buildRequestUrlPath(config, languageCode) {
    let urlPath = null;
    urlPath = `${config.baseUrl}/${config.instanceID}/${languageCode}`;
    return urlPath;
}

function buildAuthHeader(config) {
    return {
        'APIKey': config.accessToken
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