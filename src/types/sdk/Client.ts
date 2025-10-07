import { types } from "util";
import { Config } from "./Config";
import FilterOperators from "./FilterOperator";

export interface RequestParams {
  url: string
  method: string //'get' | 'post' | 'put' | 'delete',
  baseURL: string | null,
  headers: any,
  params: any
}

export interface ApiClientInstance {
  config: Config;
  makeRequest(req: RequestParams): Promise<any>; // Replace 'any' with the proper type for req if possible.
}
