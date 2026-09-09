import { PaginatedBlogType } from "@/@types/paginated-blog-type";
import { baseApi } from "./baseApi";

export const blogApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({

        getblogs : builder.query<PaginatedBlogType, {page: number; limit: number}>({
            query: ({page, limit}) => `/blogs?page=${page}&limit=${limit}`
        })
    })
})

export const { useGetblogsQuery } = blogApi;