import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface CommentType {
  _id: string;
  blog: string;
  name: string;
  email: string;
  message: string;
  isApproved: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AddCommentPayload {
  blogId: string;
  name: string;
  email: string;
  message: string;
}

interface CommentResponse {
  message: string;
}

export const commentApi = createApi({
  reducerPath: "commentApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
  }),

  tagTypes: ["Comments"],

  endpoints: (builder) => ({
    getCommentsByBlog: builder.query<CommentType[], string>({
      query: (blogId) => `/comments/blog/${blogId}`,

      providesTags: (_result, _error, blogId) => [
        { type: "Comments", id: blogId },
      ],
    }),

    addComment: builder.mutation<CommentResponse, AddCommentPayload>({
      query: (commentData) => ({
        url: "/comments",
        method: "POST",
        body: commentData,
      }),

      invalidatesTags: (_result, _error, commentData) => [
        { type: "Comments", id: commentData.blogId },
      ],
    }),
  }),
});

export const {
  useGetCommentsByBlogQuery,
  useAddCommentMutation,
} = commentApi;