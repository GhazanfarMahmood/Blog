import { BlogDetailType } from "@/@types/blog-type";
import { PaginatedBlogType } from "@/@types/paginated-blog-type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const blogApi = createApi({
    reducerPath : "blogApi",

    baseQuery : fetchBaseQuery({
        baseUrl : "http://localhost:5000/api",
    }),

    endpoints : (builder) => ({

        getBlogs : builder.query<PaginatedBlogType, {page : number, limit : number}>({
            query : ({ page, limit }) => `/blogs?page=${page}&limit=${limit}`,
        }),

        getBlogsBySlug : builder.query<BlogDetailType, string>({
            query : (slug) =>  `/blogs/${slug}`,
        }),

        getBlogsByCategory : builder.query<PaginatedBlogType, {slug: string, page : number, limit : number}>({
            query: ({slug, page , limit}) => ({url : `/blogs/category/${slug}`, params : {page, limit}})
        }),

        getBlogsByWriter : builder.query<PaginatedBlogType, {slug: string, page : number, limit : number}>({
            query : ({slug, page, limit}) => ({url : `/blogs/writer/${slug}`, params: {page, limit}})
        }),

        getBlogsBySearch : builder.query<PaginatedBlogType, {query: string, page: number, limit: number}>({
            query: ({query, page, limit}) => `/blogs/search?q=${query}&page=${page}&limit=${limit}`
        })

    }),
});

export const { useGetBlogsQuery, useGetBlogsBySlugQuery, useGetBlogsByCategoryQuery, useGetBlogsByWriterQuery, useGetBlogsBySearchQuery }  = blogApi;