
import { baseApi } from "./baseApi";

export interface NewsletterSubscriber {
  _id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface NewsletterResponse {
  success: boolean;
  total: number;
  subscribers: NewsletterSubscriber[];
}

export interface SendNewsletterRequest {
  subject: string;
  content: string;
}

export interface SendNewsletterResponse {
  success: boolean;
  message: string;
  total: number;
  sent: number;
  failed: number;
}

export interface DeleteNewsletterResponse {
  success: boolean;
  message: string;
}

export const newsletterApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSubscribers: builder.query<NewsletterResponse, void>({
      query: () => "/newsletter/admin",
      providesTags: ["Newsletter"],
    }),

    sendNewsletter: builder.mutation<
      SendNewsletterResponse,
      SendNewsletterRequest
    >({
      query: (body) => ({
        url: "/newsletter/send",
        method: "POST",
        body,
      }),
    }),

     deleteNewsletterSubscriber: builder.mutation<
      DeleteNewsletterResponse,
      string
    >({
      query: (id) => ({
        url: `/newsletter/admin/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Newsletter"],
    }),

  }),
});

export const {
  useGetAllSubscribersQuery,
  useSendNewsletterMutation,
  useDeleteNewsletterSubscriberMutation
} = newsletterApi;
