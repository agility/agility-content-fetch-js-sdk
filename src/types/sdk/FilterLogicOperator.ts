/**
 * Defines a FilterLogicOperator - Refer to {@link AgilityFetch.Types.FilterLogicOperators} Enum for available Logic Operators.
 * @typedef {string} FilterLogicOperator
 * @memberOf AgilityFetch.Types
 */

/**
 * Enum of FilterLogicOperators.
 * @enum {FilterLogicOperator} FilterLogicOperators
 * @memberOf AgilityFetch.Types
 * @default AND
 * @readonly
 */

/*
const FilterLogicOperators = {
    AND: "and",
    OR: "or"
};

export default FilterLogicOperators;
*/

    export type FilterLogicOperator = "AND" | "OR";
  
    export enum FilterLogicOperators {
      AND = "AND",
      OR = "OR",
    }
  