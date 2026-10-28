
import { baseApi } from "./baseApi";

export type AboutContentItem = {
  _id?: string;
  icon: string;
  title: string;
  excerpt: string;
};

export type About = {
  _id: string;
  title: string;
  images: string[];
  description: string;
  moreContent: AboutContentItem[];
};

export type AboutFormData = {
  title: string;
  images: string[];
  description: string;
  moreContent: AboutContentItem[];
};

type AboutResponse = {
  message: string;
  data: About;
};

type DeleteAboutResponse = {
  message: string;
};

export const aboutApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET ABOUT
    getAbout: builder.query<About, void>({
      query: () => "/about",
      providesTags: ["About"],
    }),

    // CREATE ABOUT
    createAbout: builder.mutation<AboutResponse, AboutFormData>({
      query: (body) => ({
        url: "/about",
        method: "POST",
        body,
      }),
      invalidatesTags: ["About"],
    }),

    // UPDATE ABOUT
    updateAbout: builder.mutation<
      AboutResponse,
      { id: string; data: AboutFormData }
    >({
      query: ({ id, data }) => ({
        url: `/about/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["About"],
    }),

    // DELETE ABOUT
    deleteAbout: builder.mutation<DeleteAboutResponse, string>({
      query: (id) => ({
        url: `/about/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["About"],
    }),
  }),
});

export const {
  useGetAboutQuery,
  useCreateAboutMutation,
  useUpdateAboutMutation,
  useDeleteAboutMutation,
} = aboutApi;
