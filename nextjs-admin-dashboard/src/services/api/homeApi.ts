
import { baseApi } from "./baseApi";

// HOME CONTENT TYPE
export type HomeContent = {
  _id: string;
  title: string;
  highlightText: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
};

// FORM DATA TYPE
export type HomeFormData = {
  title: string;
  highlightText: string;
  description: string;
};

// API RESPONSE TYPE
type HomeResponse = {
  message: string;
  data: HomeContent;
};

type DeleteHomeResponse = {
  message: string;
};

export const homeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET HOME CONTENT
    getHome: builder.query<HomeContent, void>({
      query: () => "/home",
      providesTags: ["Home"],
    }),

    // CREATE HOME CONTENT
    createHome: builder.mutation<HomeResponse, HomeFormData>({
      query: (body) => ({
        url: "/home",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Home"],
    }),

    // UPDATE HOME CONTENT
    updateHome: builder.mutation<
      HomeResponse,
      { id: string; data: HomeFormData }
    >({
      query: ({ id, data }) => ({
        url: `/home/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Home"],
    }),

    // DELETE HOME CONTENT
    deleteHome: builder.mutation<DeleteHomeResponse, string>({
      query: (id) => ({
        url: `/home/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Home"],
    }),
  }),
});

export const {
  useGetHomeQuery,
  useCreateHomeMutation,
  useUpdateHomeMutation,
  useDeleteHomeMutation,
} = homeApi;
