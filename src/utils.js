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

export default {
    buildAuthHeader,
    buildRequestUrlPath
}