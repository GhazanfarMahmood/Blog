
import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api",
  credentials: "include",
});

const baseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    const requestUrl = typeof args === "string" ? args : args.url;

    const isLoginRequest = requestUrl.includes("/auth/login");

    if (
      !isLoginRequest &&
      typeof window !== "undefined" &&
      window.location.pathname !== "/login"
    ) {
      window.location.replace("/auth/login");
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "api",

  baseQuery,

  tagTypes: [
    "Auth",
    "Users",
    "Blogs",
    "Categories",
    "Comments",
    "Newsletter",
    "Contacts",
    "About",
    "Home",
  ],

  endpoints: () => ({}),
});
