import { BlogContentType, BlogDetailType } from "@/@types/blog-type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const blogApi = createApi({
    reducerPath : "blogApi",

    baseQuery : fetchBaseQuery({
        baseUrl : "http://localhost:5000/api",
    }),

    endpoints : (builder) => ({

        getBlogs : builder.query<BlogContentType[], void>({
            query : () => `/blogs`,
        }),

        getBlogsBySlug : builder.query<BlogDetailType, string>({
            query : (slug) =>  `/blogs/${slug}`,
        }),

        getBlogsByCategory : builder.query<BlogContentType[], string>({
            query: (slug) => `/blogs/category/${slug}`
        })

    }),
});

export const { useGetBlogsQuery, useGetBlogsBySlugQuery, useGetBlogsByCategoryQuery }  = blogApi;