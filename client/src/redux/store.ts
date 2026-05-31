import { blogApi } from "@/services/api/blogApi";
import { categoryApi } from "@/services/api/categoryApi";
import { commentApi } from "@/services/api/commentApi";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer : {
        [commentApi.reducerPath] : commentApi.reducer,
        [blogApi.reducerPath] : blogApi.reducer,
        [categoryApi.reducerPath] : categoryApi.reducer,
    },

    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(commentApi.middleware, blogApi.middleware, categoryApi.middleware),
});


export type RootState = ReturnType<typeof store.getState>

export type AppDistpatch = typeof store.dispatch