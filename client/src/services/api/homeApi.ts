
import { HomeType } from "@/@types/home-type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const homeApi = createApi({
    reducerPath: "homeApi",

    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/api",
    }),

    endpoints: (builder) => ({

        // GET HOME CONTENT
        getHome: builder.query<HomeType, void>({
            query: () => `/home`,
        }),

    }),
});

export const {
    useGetHomeQuery,
} = homeApi;

export default homeApi;
