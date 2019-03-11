import getSitemapFlat from './methods/getSitemapFlat'
import getSitemapNested from './methods/getSitemapNested'
import getContentItem from './methods/getContentItem'
import getContentList from './methods/getContentList'
import getPage from './methods/getPage'

const defaultConfig = {
    fetchBaseUrl: 'http://stackpath.publishwithagility.com',
    previewBaseUrl: 'http://stackpath.publishwithagility.com',
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

    return {
        config: config,
        getSitemapFlat: getSitemapFlat,
        getSitemapNested: getSitemapNested,
        getContentItem: getContentItem,
        getContentList: getContentList,
        getPage: getPage
    }

}


