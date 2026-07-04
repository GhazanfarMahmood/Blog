import { ContactFormType } from "@/@types/contact-type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const contactApi = createApi({
    reducerPath : "contactApi",

    baseQuery : fetchBaseQuery({
        baseUrl : "http://localhost:5000/api",
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