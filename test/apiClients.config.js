import agility from '../src/content-fetch'

//Agiliy Instance = 'Headless Integration Testing'
const instanceID = 'c741222b-1080-45f6-9a7f-982381c5a485';
const accessTokenFetch = 'E3JaVBdQbowZWntXsvvObLyjZ82eCB/pmVGjVy8q5NVD0/6t28E/4nShCBzGT2uqleIYBXrW8F81IdKrdATZ3Q==';
const accessTokenPreview = 'hA9e0rki2BpchWXmcUkrjMcH8dQRgg7uqmRBwMviCcE5cvHSQU8ngP3+OwGO6d22bDbFpa8asJdKH8AwC9W7iw==';

function createApiClient() {
    var api = agility.getApi({
        instanceID: instanceID,
        accessToken: accessTokenFetch,
        isPreview: false
    });
    return api;
}

function createCachedApiClient() {
    var api = agility.getApi({
        instanceID: instanceID,
        accessToken: accessTokenFetch,
        isPreview: false,
        caching: {
            maxAge: 5 * 60 * 1000 //==5mins
        }
    });
    return api;
}

function createPreviewApiClient() {
    var api = agility.getApi({
        instanceID: instanceID,
        accessToken: accessTokenPreview,
        isPreview: true
    });
    return api;
}

export {
    createApiClient,
    createCachedApiClient,
    createPreviewApiClient
}