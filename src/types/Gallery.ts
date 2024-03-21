 /**
 * Defines a **Gallery** in the CMS
 * @typedef Gallery
 * @memberof AgilityFetch.Types
 * @property {number} galleryID - The unique ID of the gallery.
 * @property {string} name - The name of the gallery.
 * @property {string} description - The description of the gallery.
 * @property {number} count - The count of media items in the gallery.
 * @property {Array<AgilityFetch.Types.MediaItem>} media - Array of media items in the gallery.
 */

    export interface MediaItem {
      mediaID: number;
      name: string;
      // Define other properties of AgilityFetch.Types.MediaItem if necessary
      // For example:
      // url: string;
      // altText: string;
    }
  
    export interface Gallery {
      galleryID: number;
      name: string;
      description: string;
      count: number;
      media: MediaItem[];
    }
  