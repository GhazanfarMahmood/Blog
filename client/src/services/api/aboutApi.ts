
// QUERY FROM REACT
import { AboutType } from "@/@types/about-type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const aboutApi = createApi({
    reducerPath : "aboutApi",

    baseQuery : fetchBaseQuery({
        baseUrl : "http://localhost:5000/api",
    }),

    endpoints : (builder) => ({

        getAbout : builder.query<AboutType, void>({
            query : () => `/about`,
        }),

    })
});

export const { useGetAboutQuery } = aboutApi;