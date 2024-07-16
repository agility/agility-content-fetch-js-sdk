/**
 * Defines a **Filter** for filtering lists.
 * @typedef Filter
 * @memberof AgilityFetch.Types
 * @property {string} property - The property to filter the request on.
 * @property {AgilityFetch.Types.FilterOperator} operator - The operator to use for the filter.
 * @property {string} value - The value to compare for the property.
 */


export interface Filter {
  property: string;
  operator: FilterOperator | "eq" | "ne" | "gt" | "lt" | "ge" | "le" | "contains" | "like" | "in";
  value: string;
}

export type FilterOperator = "eq" | "ne" | "gt" | "lt" | "ge" | "le" | "contains" | "like" | "in";
