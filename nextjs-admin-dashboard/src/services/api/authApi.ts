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
                user: AuthUser;
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

        deleteProfileImage : builder.mutation<
            {message : string},
            void
            >({
            query : () => ({
                url : "/auth/profile-image",
                method : 'DELETE',
            }),
            invalidatesTags : ["Auth"],
        }),

        createUser: builder.mutation<
            {
                message : string;
                user : AuthUser;
            },
            {
                name : string;
                email : string;
                password : string; 
                role : Role;
                phoneNumber?: string;
                aboutMe?: string;
            }
            >({
            query : (data) => ({
                url : "/auth/create-user",
                method : "POST",
                body : data,
            }),
            invalidatesTags : ["Users"],
        }),

        getUsers: builder.query<
            {
                users: AuthUser[];
            },
            void
            >({
            query: () => "/auth/users",
            providesTags : ["Users"],
        }),

        getUserById: builder.query<AuthUser, string>({
            query : (id) => `/auth/user/${id}`,
        })
    }),
});

export const {
    useLoginMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
    useLogoutMutation,
    useGetMeQuery,
    useUpdateProfileMutation,
    useDeleteProfileImageMutation,
    useCreateUserMutation,
    useGetUsersQuery,
    useGetUserByIdQuery
} = authApi;