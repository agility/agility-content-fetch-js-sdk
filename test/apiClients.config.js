import agility from '../src/content-fetch'

// Agiliy Instance = 'Headless Integration Testing'
const instanceID = 'c741222b-1080-45f6-9a7f-982381c5a485';
const accessTokenFetch = 'mn16Ui.a70c306e57eb682bf6dc5e42325dd77b06ddde33f5a8e46530e680ad334c7e6d';
const accessTokenPreview = 'tR95Pt.3c66512540fbbb00944602c9be1ca913fe3d83f41fbec172fa005ef10d9d1273';

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