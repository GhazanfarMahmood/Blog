import { CategoryAdminType, CategoryFormType } from "@/@types/category-type";
import { baseApi } from "./baseApi";

export const categoryApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({
        getCategories : builder.query<CategoryAdminType[], void>({
            query : () => "/categories",
        }),

        getCategoryBySlug: builder.query<CategoryAdminType, string>({
            query: (slug) => `/categories/${slug}`,
            providesTags : ["Categories"],
        }),

        createCategory: builder.mutation<
            {message : string; data: CategoryAdminType},
            CategoryFormType
        >({
            query: (data) => ({
                url : "/categories",
                method: "POST",
                body: data,
            }),
            invalidatesTags : ["Categories"]
        }),

        updateCategory: builder.mutation<
            { message: string; data: CategoryAdminType},
            { id: string; data: CategoryFormType}
        >({
            query : ({id, data}) => ({
                url: `/categories/${id}`,
                method : "PATCH", 
                body: data,
            }),
        }),

        deleteCategory: builder.mutation<
            {message : string},
            string
        >({
            query: (id) => ({
                url : `/categories/${id}`,
                method : "DELETE",
            }),
        }),
    }),
});