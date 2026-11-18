import { AuthorType } from "@/@types/author-type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const writerApi = createApi({
    reducerPath : "writerApi",

    baseQuery : fetchBaseQuery({
        baseUrl : "https://blog-bxco.vercel.app/api"
    }),

    endpoints : (builder) => ({

        getWriterBySlug : builder.query<AuthorType, string>({
            query: (slug) => `blogs/writer/${slug}`
        })
    })
})

export const { useGetWriterBySlugQuery } = writerApi;