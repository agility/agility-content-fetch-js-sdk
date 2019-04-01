import agility from '../src/content-fetch'

//Agiliy Instance = 'Headless Integration Testing'
const instanceID = 'c741222b-1080-45f6-9a7f-982381c5a485';
const accessTokenFetch = 'mn16Ui.17dc2f94908b113a6eb0869681f5cfa77df6dbd181d22943b64bf8ef728b6c5c';
const accessTokenPreview = 'tR95Pt.cc81dfbe0726263d5d9618b21f49fe33830e5449395820ade1cad3ce89d22ed8';

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