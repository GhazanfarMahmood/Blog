import { CategoryType } from "@/@types/category-type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoryApi = createApi({
    reducerPath : "categoryApi",

    baseQuery : fetchBaseQuery({
        baseUrl : "http://localhost:5000/api"
    }),

    refetchOnFocus : false,
    refetchOnReconnect : false,

    endpoints : (builder) => ({

        getCategory : builder.query<CategoryType[], void>({
            query: () => `/categories`,
            keepUnusedDataFor: 86400,
        }),

        getCategoryBySlug : builder.query({
            query : (slug) => `/categories/${slug}`,
        }),
        

    })
});

export const { useGetCategoryQuery, useGetCategoryBySlugQuery } = categoryApi;