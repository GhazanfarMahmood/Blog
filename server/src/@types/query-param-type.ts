import { ParsedQs } from "qs";

export type QueryParamType =  
    | string
    | ParsedQs
    | (string | ParsedQs)[]
    | undefined;