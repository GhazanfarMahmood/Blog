import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const commentApi = createApi({
    reducerPath : 'commentApi',

    baseQuery: fetchBaseQuery({ 
        baseUrl: "http://localhost:5000/api",
    }),

    endpoints: (builder) => ({
        getCommentByName : builder.query<Comment, string>({
            query : () => `/comments`,
        }),
    }),
})

export const { useGetCommentByNameQuery } = commentApi;