import { Comment } from "@/@types/comment-type";
import { baseApi } from "./baseApi";

export const commentApi = baseApi.injectEndpoints({
    endpoints : (builder) => ({

        getAllComments : builder.query<Comment[], void>({
            query : () => "/comments/admin",
            providesTags : ["Comments"],
        }),

        approveComment : builder.mutation<void, string>({
            query : (id) => ({
                url : `/comments/${id}/approve`,
                method : "PATCH",
            }),
            invalidatesTags : ['Comments'],
        }),

        unapproveComment: builder.mutation<void, string>({
            query : (id) => ({
                url : `/comments/${id}/unapprove`,
                method : "PATCH",
            }),
            invalidatesTags : ["Comments"],
        }),

        deleteComment : builder.mutation<void, string>({
            query : (id) => ({
                url : `/comments/${id}`,
                method : "DELETE",
            }),
            invalidatesTags : ["Comments"],
        }),
        
        getPendingCommentsCount: builder.query<
        { success: boolean; total: number },
        void
        >({
        query: () => "/comments/admin/pending-count",
        providesTags: ["Comments"],
        }),

    }),
});

export const {
    useGetAllCommentsQuery,
    useApproveCommentMutation,
    useUnapproveCommentMutation,
    useDeleteCommentMutation,
    useGetPendingCommentsCountQuery,
} = commentApi;