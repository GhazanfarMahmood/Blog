import { AuthorType } from "@/@types/author-type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const writerApi = createApi({
    reducerPath : "writerApi",

    baseQuery : fetchBaseQuery({
        baseUrl : "http://localhost:5000/api"
    }),

    endpoints : (builder) => ({

        getWriterBySlug : builder.query<AuthorType, string>({
            query: (slug) => `/writers/${slug}`
        })
    })
})

export const { useGetWriterBySlugQuery } = writerApi;