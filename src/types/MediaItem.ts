 /**
 * Defines a **MediaItem** in the CMS
 * @typedef MediaItem
 * @memberof AgilityFetch.Types
 * @property {number} mediaID - The unique ID of the media item.
 * @property {string} fileName - The file name of the media item.
 * @property {string} url - The url of the media item.
 * @property {number} size - The size of the media item in bytes.
 * @property {date} modifiedOn - The last modified date and time of the media item.
 * @property {AgilityFetch.Types.MediaItemMetaData} metaData - Meta data for the media item.
 */

 export interface MediaItem {
    mediaID: number;
    fileName: string;
    url: string;
    size: number;
    modifiedOn: Date;
    metaData: MediaItemMetaData;
  }

  export interface MediaItemMetaData {
    pixelHeight: number;
    pixelWidth: number;
  }