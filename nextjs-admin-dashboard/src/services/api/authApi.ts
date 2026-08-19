import { clearUser, setUser } from "@/redux/features/authSlice";
import { baseApi } from "./baseApi";
import { Role } from "@/constants/roles";

export interface AuthUser {
    id: string;
    name: string;
    email: string;
    aboutMe: string;
    profileImage: string | null;
    role: Role;
}

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        login: builder.mutation({
            query: (data) => ({
                url: "/auth/login",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Auth"],
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

        getMe: builder.query<AuthUser, void>({
            query: () => "/auth/me",

            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;

                    dispatch(setUser(data));
                } catch {
                    dispatch(clearUser());
                }
            },

            providesTags : ["Auth"],
        }),

        updateProfile: builder.mutation<
            {
                message: string; 
                user: {
                    id: string;
                    name: string;
                    email: string;
                    aboutMe: string;
                    profileImage: string;
                    role: string;
                }
            },
            FormData
        >({
            query: (formData) => ({
                url : "/auth/profile",
                method : "PATCH",
                body: formData,
            }),
            invalidatesTags: ["Auth"],
        }),

    }),
});

export const {
    useLoginMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
    useLogoutMutation,
    useGetMeQuery,
    useUpdateProfileMutation
} = authApi;