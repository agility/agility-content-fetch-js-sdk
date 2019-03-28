import axios from 'axios'
import { setupCache } from 'axios-cache-adapter'
import getSitemapFlat from './methods/getSitemapFlat'
import getSitemapNested from './methods/getSitemapNested'
import getContentItem from './methods/getContentItem'
import getContentList from './methods/getContentList'
import getPage from './methods/getPage'

const defaultConfig = {
    fetchBaseUrl: 'https://g5s2z5b3.stackpathcdn.com',
    previewBaseUrl: 'https://e5q8t3m6.stackpathcdn.com',
    baseUrl: null,
    isPreview: false,
    instanceID: null,
    accessToken: null,
    languageCode: null,
    caching: {
        maxAge: 0 //caching disabled by default
    }
};

export default function createClient(userConfig) {
    
    //set default baseUrl
    if(userConfig.isPreview) {
        defaultConfig.baseUrl = defaultConfig.previewBaseUrl
    } else {
        defaultConfig.baseUrl = defaultConfig.fetchBaseUrl
    }

    //merge our config - user values will override our defaults
    const config = {
        ...defaultConfig,
        ...userConfig
    };

    let adapter = null;

    //should we turn on caching?
    if(config.caching.maxAge > 0) {
        const cache = setupCache({
            maxAge: config.caching.maxAge
        });
        adapter = cache.adapter;
    }

    //create apply the adapter to our axios instance
    const api = axios.create({
        adapter: adapter
    })

    //the function that actually makes ALL our requests
    function makeRequest(reqConfig) {
        //make the request using our axios instance        
        return api(reqConfig).then(async (response) => {
            let data = response.data;
            //if our response is from cache, inject that property in the data response
            if(response.request.fromCache) {
                data['fromCache'] = true;
            }
            return data;
        });   
    }

    //export only these properties:
    return {
        config: config,
        makeRequest: makeRequest,
        getSitemapFlat: getSitemapFlat,
        getSitemapNested: getSitemapNested,
        getContentItem: getContentItem,
        getContentList: getContentList,
        getPage: getPage
    }

}