import agility from '../src/content-fetch'

// Agility Instance = 'Headless Integration Testing'
const instanceID = 'c741222b-1080-45f6-9a7f-982381c5a485';
const accessTokenFetch = 'UnitTestsFetch.2ace650991363fbcffa6776d411d1b0d616b8e3424ce842b81cba7af0039197e';
const accessTokenPreview = 'UnitTestsPreview.69e6bca345ced0b7ca5ab358b351ea5c870790a5945c25d749a865332906b124';

function createApiClient() {
    var api = agility.getApi({
        instanceID: instanceID,
        accessToken: accessTokenFetch,
        baseUrl: 'https://agility-fetch-api-dev.azurewebsites.net'
    });
    return api;
}

function createCachedApiClient() {
    var api = agility.getApi({
        instanceID: instanceID,
        accessToken: accessTokenFetch,
        caching: {
            maxAge: 5 * 60 * 1000 //==5mins
        },
        baseUrl: 'https://agility-fetch-api-dev.azurewebsites.net'
    });
    return api;
}

function createPreviewApiClient() {
    var api = agility.getApi({
        instanceID: instanceID,
        accessToken: accessTokenPreview,
        isPreview: true,
        baseUrl: 'https://agility-fetch-api-dev.azurewebsites.net'
    });
    return api;
}

export {
    createApiClient,
    createCachedApiClient,
    createPreviewApiClient
}