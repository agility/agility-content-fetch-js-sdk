import agilityFetch from '../src/index';

// Agility Instance = 'Headless Integration Testing' [Dev]
const guid = 'c741222b-1080-45f6-9a7f-982381c5a485';
const apiKeyFetch = 'UnitTestsFetch.2ace650991363fbcffa6776d411d1b0d616b8e3424ce842b81cba7af0039197e';
const apiKeyPreview = 'UnitTestsPreview.69e6bca345ced0b7ca5ab358b351ea5c870790a5945c25d749a865332906b124';


export function createApiClient() {
    console.log(`Creating API Client for ${guid}`);
    var api = agilityFetch.getApi({
        guid: guid,
        apiKey: apiKeyFetch,
        baseUrl: `https://api-dev.aglty.io/${guid}`
    });
    return api;
}

export function createApiClientWithNewCdn() {
    console.log(`Creating API Client for ${guid}`);
    var api = agilityFetch.getApi({
        guid: '2b64a4d8-d',
        apiKey: 'JSSDK.e27e61f56d4c9b58ab98961aaf86a0d3c544dfe7d0eb385ece42123dad5d1af7'
    });
    return api;
}

export function createCachedApiClient() {
    console.log(`Creating API Client for ${guid}`);
    var api = agilityFetch.getApi({
        guid: guid,
        apiKey: apiKeyFetch,
        caching: {
            maxAge: 5 * 60 * 1000 //==5mins
        },
        baseUrl: `https://api-dev.aglty.io/${guid}`
    });
    return api;
}

export function createPreviewApiClient() {
    console.log(`Creating API Client for ${guid}`);
    var api = agilityFetch.getApi({
        guid: guid,
        apiKey: apiKeyPreview,
        isPreview: true,
        baseUrl: `https://api-dev.aglty.io/${guid}`
    });
    return api;
}