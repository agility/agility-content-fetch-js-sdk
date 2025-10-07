/**
 * Defines a Sort Direction - Refer to {@link AgilityFetch.Types.SortDirections} Enum for available Sort Directions.
 * @typedef {string} SortDirection
 * @memberOf AgilityFetch.Types
 */

/**
 * Enum of SortDirections.
 * @enum {SortDirection} SortDirections
 * @memberOf AgilityFetch.Types
 * @default ASC
 * @readonly
 */

/*
old enum

const SortDirections = {
    ASC: "asc",
    DESC: "desc",
};

*/

    export type SortDirection = "asc" | "desc";
  
    export enum SortDirections {
      ASC = "asc",
      DESC = "desc",
    }
  