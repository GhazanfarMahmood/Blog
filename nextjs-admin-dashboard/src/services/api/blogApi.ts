import { PaginatedBlogType } from "@/@types/paginated-blog-type";
import { baseApi } from "./baseApi";
import { BlogContentType, BlogDetailType } from "@/@types/blog-type";
import { BlogFormType } from "@/@types/blog-form-type";

export const blogApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({

        getBlogs: builder.query<
            PaginatedBlogType,
            { page: number; limit: number }
        >({
            query: ({ page, limit }) =>
                `/blogs?page=${page}&limit=${limit}`,
            providesTags: ["Blogs"],
        }),

        getBlogById : builder.query<BlogDetailType, string>({
            query: (id) => `/blogs/id/${id}`,
        }),

        createBlog: builder.mutation<
            { message: string; data: BlogDetailType },
            FormData
        >({
            query: (data) => ({
                url: "/blogs",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Blogs"],
        }),

        updateBlog: builder.mutation<
            { message: string; data: BlogDetailType },
            { id: string; data: FormData }
        >({
            query: ({ id, data }) => ({
                url: `/blogs/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["Blogs"],
        }),

        deleteBlog: builder.mutation<
            { message: string },
            string
        >({
            query: (id) => ({
                url: `/blogs/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Blogs"],
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