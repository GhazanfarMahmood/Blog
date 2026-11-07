
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface SubscribeNewsletterRequest {
  email: string;
}

interface SubscribeNewsletterResponse {
  success: boolean;
  message: string;
}

export const newsletterApi = createApi({
  reducerPath: "newsletterApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
  }),

  endpoints: (builder) => ({
    subscribeNewsletter: builder.mutation<
      SubscribeNewsletterResponse,
      SubscribeNewsletterRequest
    >({
      query: (emailData) => ({
        url: "/newsletter/subscribe",
        method: "POST",
        body: emailData,
      }),
    }),
  }),
});

export const { useSubscribeNewsletterMutation } = newsletterApi;
