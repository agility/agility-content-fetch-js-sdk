/**
 * SDK-Specific Types
 * 
 * These types are specific to the SDK implementation and are manually maintained.
 * They include configuration, client interfaces, filtering, and error types.
 */

// Configuration Types
export * from './Config';
export * from './EnvConfig';

// Client Types
export * from './Client';

// Filtering Types
export * from './Filter';
export * from './FilterOperator';
export * from './FilterLogicOperator';
export * from './SortDirection';

// Error Types
export * from './errors/Errors';

// Re-export constants for backward compatibility
import FilterOperators from './FilterOperator';
import { FilterLogicOperators } from './FilterLogicOperator';
import { SortDirections } from './SortDirection';

export {
    FilterOperators,
    FilterLogicOperators,
    SortDirections
};

