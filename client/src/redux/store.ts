import { aboutApi } from "@/services/api/aboutApi";
import { blogApi } from "@/services/api/blogApi";
import { categoryApi } from "@/services/api/categoryApi";
import { commentApi } from "@/services/api/commentApi";
import { contactApi } from "@/services/api/contactApi";
import { newsletterApi } from "@/services/api/newsletterApi";
import { writerApi } from "@/services/api/writerApi";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer : {
        [commentApi.reducerPath] : commentApi.reducer,
        [blogApi.reducerPath] : blogApi.reducer,
        [categoryApi.reducerPath] : categoryApi.reducer,
        [writerApi.reducerPath] : writerApi.reducer,
        [contactApi.reducerPath] : contactApi.reducer,
        [aboutApi.reducerPath] : aboutApi.reducer,
        [newsletterApi.reducerPath] : newsletterApi.reducer,
    },

    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(commentApi.middleware, blogApi.middleware, categoryApi.middleware, writerApi.middleware, contactApi.middleware, aboutApi.middleware, newsletterApi.middleware),
});


export type RootState = ReturnType<typeof store.getState>

export type AppDistpatch = typeof store.dispatch