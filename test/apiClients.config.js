import agility from '../src/content-fetch'

// Agility Instance = 'Headless Integration Testing' [Dev]
const guid = 'c1b270e3-1547-4f89-b79f-622c3dcec94a';
const apiKeyFetch = 'FetchTest.572e23a397703a40ae62d885b51eacc0520c7cdd4be9ddede9304b304b6a7284';
const apiKeyPreview = 'APITestK8.175ae1631a8c3c54b773f7e527ad5425279c9d75e06d6d84f30bc7f1c67e5024';

function createApiClient() {
    var api = agility.getApi({
        guid: guid,
        apiKey: apiKeyFetch
    });
    return api;
}


function createCachedApiClient() {
    var api = agility.getApi({
        guid: guid,
        apiKey: apiKeyFetch,
        caching: {
            maxAge: 5 * 60 * 1000 //==5mins
        }
    });
    return api;
}

function createPreviewApiClient() {
    var api = agility.getApi({
        guid: guid,
        apiKey: apiKeyPreview,
        isPreview: true
    });
    return api;
}

export {
    createApiClient,
    createCachedApiClient,
    createPreviewApiClient
}