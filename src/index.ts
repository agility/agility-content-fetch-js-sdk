import { Config } from "./types/Config"
import { ContentItem } from "./types/ContentItem"
import { ContentList } from "./types/ContentList"
import { Gallery } from "./types/Gallery"
import { Page } from "./types/Page"

import { ApiClientInstance, getApi } from "./api-client";

export type { 
    ApiClientInstance,
    Config,
    ContentItem,
    ContentList,
    Gallery,
    Page
 }

export {
    getApi
}

 module.exports = {
    getApi
}