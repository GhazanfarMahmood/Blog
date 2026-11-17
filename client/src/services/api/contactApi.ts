import { ContactFormType } from "@/@types/contact-type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const contactApi = createApi({
    reducerPath : "contactApi",

    baseQuery : fetchBaseQuery({
        baseUrl : "https://blog-red-gamma-77.vercel.app/api",
    }),

    endpoints : (builder) => ({

        addContact : builder.mutation<ContactFormType, ContactFormType>({
            query: (contactData) => ({
                url: "/contacts",
                method : "POST",
                body: contactData,
            })
        })
    })
})

export const { useAddContactMutation } = contactApi;