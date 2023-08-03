import { types } from "util";
import { Config } from "./Config";
import FilterOperators from "./FilterOperator";

export interface ApiClientInstance {
    config: Config;
    makeRequest(req: any): Promise<any>; // Replace 'any' with the proper type for req if possible.
  }
  