import { CommentFormType } from "@/@types/form-type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const commentApi = createApi({
    reducerPath : 'commentApi',

    baseQuery: fetchBaseQuery({ 
        baseUrl: "http://localhost:5000/api",
    }),

    endpoints: (builder) => ({

        getComment : builder.query<CommentFormType[], string>({
            query : () => `/comments`,
        }),

        addComment : builder.mutation<CommentFormType , CommentFormType>({
            query: (commentData) => ({
                url: "/comments",
                method : "POST",
                body: commentData,
            })
        })
    }),
})

export const { useGetCommentQuery, useAddCommentMutation } = commentApi;