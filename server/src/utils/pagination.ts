import { ParsedQs } from "qs";
import { QueryParamType } from "../@types/query-param-type";

export const getPagination = (
    pageQuery : QueryParamType,
    limitQuery: QueryParamType,
    defaultLimit = 10
) => {
    const page = Math.max(1, Number(pageQuery) || 1);
    const limit = Math.max(1, Number(limitQuery) || defaultLimit);

    return {
        page, limit, skip: (page - 1) * limit,
    }
}