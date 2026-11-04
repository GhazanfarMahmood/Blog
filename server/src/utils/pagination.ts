import { QueryParamType } from "../@types/query-param-type";

export const getPagination = (
  pageQuery: QueryParamType,
  limitQuery: QueryParamType,
  defaultLimit = 10
) => {
  const parsedPage = Number(pageQuery);
  const parsedLimit = Number(limitQuery);

  const page =
    Number.isInteger(parsedPage) && parsedPage > 0
      ? parsedPage
      : 1;

  const limit =
    Number.isInteger(parsedLimit) && parsedLimit > 0
      ? Math.min(parsedLimit, 100)
      : defaultLimit;

  return {
    page,
    limit,
    skip: (page - 1) * limit,
  };
};