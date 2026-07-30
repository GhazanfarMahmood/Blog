import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        login: builder.mutation({
            query: (data) => ({
                url: "/auth/login",
                method: "POST",
                body: data,
            }),
        }),

        forgotPassword: builder.mutation({
            query : (data) => ({
                url: "/auth/forgot-password",
                method: "POST",
                body: data, 
            }),
        }),

        resetPassword: builder.mutation({
            query: (data) => ({
                url: "/auth/reset-password",
                method: "POST",
                body: data, 
            }),
        }),

        logout: builder.mutation({
            query: () => ({
                url : "/auth/logout",
                method : "POST",
            }),
        }),

    }),
});

export const {
    useLoginMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
    useLogoutMutation
} = authApi;