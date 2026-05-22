import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";


export const blogApi = createApi({
    reducerPath : "blogApi",

    baseQuery : fetchBaseQuery({
        baseUrl : "http://localhost:5000/api",
    }),

    endpoints : (builder) => ({

        getBlog : builder.query({
            query : () => `/blogs`,
        }),
    }),
});

export const { useGetBlogQuery }  = blogApi;