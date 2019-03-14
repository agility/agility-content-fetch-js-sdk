import axios from 'axios'
import getSitemapFlat from './methods/getSitemapFlat'
import getSitemapNested from './methods/getSitemapNested'
import getContentItem from './methods/getContentItem'
import getContentList from './methods/getContentList'
import getPage from './methods/getPage'

const defaultConfig = {
    fetchBaseUrl: 'https://g5s2z5b3.stackpathcdn.com',
    previewBaseUrl: 'https://g5s2z5b3.stackpathcdn.com',
    isPreview: false,
    instanceID: null,
    accessToken: null,
    languageCode: null
}


export default function createClient(userConfig) {
    
    //merge our config
    const config = {
        ...defaultConfig,
        ...userConfig
    };

    function makeRequest(reqConfig) {
        return axios(reqConfig).then(response => {
            return response.data;
        });   
    }

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


