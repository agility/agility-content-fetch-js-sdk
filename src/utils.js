function buildRequestUrlPath(config, languageCode) {
    let urlPath = null;
    if(config.isPreview) {
        urlPath = config.previewBaseUrl
    } else {
        urlPath = config.fetchBaseUrl
    }
    urlPath = `${urlPath}/${config.instanceID}/${languageCode}`;
    return urlPath;
}

function buildAuthHeader(config) {
    return {
        'APIKey': config.accessToken
    }
}

export default {
    buildAuthHeader,
    buildRequestUrlPath
}