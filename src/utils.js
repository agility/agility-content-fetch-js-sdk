function buildRequestUrlPath(config, languageCode) {
    let apiFetchOrPreview = null;

    if(config.isPreview) {
        apiFetchOrPreview  = 'preview';
    } else {
        apiFetchOrPreview = 'fetch';
    }

    let urlPath = `${config.baseUrl}/${apiFetchOrPreview}/${languageCode}`;
    return urlPath;
}

function buildPathUrl(contentType, referenceName, sort, direction, filters, filtersLogicOperator, contentLinkDepth) {
    let url = `/${contentType}/${referenceName}?contentLinkDepth=${contentLinkDepth}&`;
    filtersLogicOperator = filtersLogicOperator ? ` ${filtersLogicOperator} ` : ' AND ';

    if (sort) {

        url += `sort=${sort}&`;

        if (direction) {
            url += `direction=${direction}&`;
        }
    }

    if (filters && filters.length > 0) {
        url += 'filter='
        for (let i = 0; i < filters.length; i++) {
            let filter = filters[i];
            url += `${filter.property}[${filter.operator}]${filter.value}` + (i < filters.length - 1 ? filtersLogicOperator : '');
        }
        url += '&';
    }
    return url;
}

function buildAuthHeader(config) {
    let defaultAuthHeaders = {
        'APIKey': config.apiKey
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
    buildPathUrl,
    buildAuthHeader,
    buildRequestUrlPath,
    isHttps
}