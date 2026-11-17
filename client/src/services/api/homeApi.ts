
import { HomeType } from "@/@types/home-type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const homeApi = createApi({
    reducerPath: "homeApi",

    baseQuery: fetchBaseQuery({
        baseUrl: "https://blog-red-gamma-77.vercel.app/api",
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
