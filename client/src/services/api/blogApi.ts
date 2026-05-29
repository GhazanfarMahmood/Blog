import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const blogApi = createApi({
    reducerPath : "blogApi",

    baseQuery : fetchBaseQuery({
        baseUrl : "http://localhost:5000/api",
    }),

    endpoints : (builder) => ({

        getBlogs : builder.query({
            query : () => `/blogs`,
        }),

        getBlogsBySlug : builder.query({
            query : (slug) =>  `/blogs/${slug}`,
        }),

    }),
});

export const { useGetBlogsQuery, useGetBlogsBySlugQuery }  = blogApi;