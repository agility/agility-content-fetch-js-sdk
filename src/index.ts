import { Config } from "./types/Config"
import { ContentItem } from "./types/ContentItem"
import { ContentList } from "./types/ContentList"
import { Filter } from "./types/Filter"
import { Gallery } from "./types/Gallery"
import { Page } from "./types/Page"

import { ApiClientInstance, getApi } from "./api-client";
import { ContentReference } from "./types/ContentReference"

export type {
    ApiClientInstance,
    Config,
    ContentItem,
    ContentList,
    ContentReference,
    Filter,
    Gallery,
    Page
}

export {
    getApi
}

module.exports = {
    getApi
}