import axios from 'axios'
import { setupCache } from 'axios-cache-adapter'
import getSitemapFlat from './methods/getSitemapFlat'
import getSitemapNested from './methods/getSitemapNested'
import getContentItem from './methods/getContentItem'
import getContentList from './methods/getContentList'
import getPage from './methods/getPage'
import FilterOperators from './types/FilterOperator'
import FilterLogicOperators from './types/FilterLogicOperator'
import SortDirections from './types/SortDirection'

const defaultConfig = {
    baseUrl: null,
    isPreview: false,
    guid: null,
    apiKey: null,
    languageCode: null,
    headers: {},
    requiresGuidInHeaders: false,
    caching: {
        maxAge: 0 //caching disabled by default
    }
};

export default function createClient(userConfig) {
    

    //merge our config - user values will override our defaults
    let config = {
        ...defaultConfig,
        ...userConfig
    };

    //compute the base Url
    if(!config.baseUrl) {
        //use default url
        config.baseUrl = `https://${config.guid}-api.agilitycms.cloud`;
    } else {
        //we are using a custom url, make sure we include the guid in the headers
        config.requiresGuidInHeaders = true;
    }

    let adapter = null;
    
    //should we turn on caching?
    if(config.caching.maxAge > 0) {
        const cache = setupCache({
            maxAge: config.caching.maxAge,
            exclude: { query: false }
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
        getPage: getPage,
        types: {
            FilterOperators: FilterOperators,
            FilterLogicOperators: FilterLogicOperators,
            SortDirections: SortDirections
        }
    }

}