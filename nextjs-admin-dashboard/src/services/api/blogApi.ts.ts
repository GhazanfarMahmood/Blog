import { PaginatedBlogType } from "@/@types/paginated-blog-type";
import { baseApi } from "./baseApi";
import { BlogContentType, BlogDetailType } from "@/@types/blog-type";
import { BlogFormType } from "@/@types/blog-form-type";

export const blogApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({

        getBlogs : builder.query<PaginatedBlogType, {page: number; limit: number}>({
            query: ({page, limit}) => `/blogs?page=${page}&limit=${limit}`
        }),

        getBlogById : builder.query<BlogDetailType, string>({
            query: (id) => `/blogs/${id}`,
        }),

        createBlog : builder.mutation<BlogDetailType, BlogFormType>({
            query : (data) => ({
                url : "/blogs",
                method : "POST", 
                body : data,
            }),
        }),

        updateBlog : builder.mutation<
            BlogDetailType,
            {id : string; data: BlogFormType}
        >({
            query: ({ id, data}) => ({
                url : `/blogs/${id}`,
                method : "PATCH",
                body : data,
            }),
        }),

        deleteBlog : builder.mutation<
            {message : string}, 
            string
        >({
            query: (id) => ({
                url : `/blogs/${id}`,
                method : "DELETE",
            }),
        }),
    }),
});

export const {
    useGetBlogsQuery,
    useGetBlogByIdQuery,
    useCreateBlogMutation,
    useUpdateBlogMutation,
    useDeleteBlogMutation,
} = blogApi;