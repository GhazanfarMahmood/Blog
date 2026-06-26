import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const newsletterApi = createApi({
    reducerPath : "newsletterApi",

    baseQuery : fetchBaseQuery({
        baseUrl : "http://localhost:5000/api",
    }),

    endpoints : (builder) => ({
        subscribeNewsletter : builder.mutation({
            query : (emailData) => ({
                url : "/newsletter",
                method : "POST",
                body: emailData,
            }),
        }),
    }),
});

export const { useSubscribeNewsletterMutation } = newsletterApi;
