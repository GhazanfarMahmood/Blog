
import { baseApi } from "./baseApi";

export type ContactStatus = "new" | "read" | "resolved";

export type ContactMessage = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
  status: ContactStatus;
  createdAt: string;
  updatedAt: string;
};

export type ContactStats = {
  success: boolean;
  total: number;
  newMessages: number;
  read: number;
  resolved: number;
};

export const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllContacts: builder.query<ContactMessage[], void>({
      query: () => "/contact/admin",
      providesTags: ["Contacts"],
    }),

    getContactById: builder.query<ContactMessage, string>({
      query: (id) => `/contact/admin/${id}`,
      providesTags: ["Contacts"],
    }),

    getContactStats: builder.query<ContactStats, void>({
      query: () => "/contact/admin/stats",
      providesTags: ["Contacts"],
    }),

    updateContactStatus: builder.mutation<
      { message: string; data: ContactMessage },
      { id: string; status: ContactStatus }
    >({
      query: ({ id, status }) => ({
        url: `/contact/admin/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Contacts"],
    }),

    deleteContact: builder.mutation<
      { message: string },
      string
    >({
      query: (id) => ({
        url: `/contact/admin/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Contacts"],
    }),
  }),
});

export const {
  useGetAllContactsQuery,
  useGetContactByIdQuery,
  useGetContactStatsQuery,
  useUpdateContactStatusMutation,
  useDeleteContactMutation,
} = contactApi;
