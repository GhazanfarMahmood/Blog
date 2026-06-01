import { CategoryType } from "@/@types/category-type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoryApi = createApi({
    reducerPath : "categoryApi",

    baseQuery : fetchBaseQuery({
        baseUrl : "http://localhost:5000/api"
    }),

    endpoints : (builder) => ({

        getCategory : builder.query<CategoryType[], void>({
            query: () => `/categories`,
        }),

        getCategoryBySlug : builder.query({
            query : (slug) => `/categories/${slug}`,
        }),
        
    })
});

export const { useGetCategoryQuery, useGetCategoryBySlugQuery } = categoryApi;