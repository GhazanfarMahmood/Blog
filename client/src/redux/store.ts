import { blogApi } from "@/services/api/blogApi";
import { commentApi } from "@/services/api/commentApi";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer : {
        [commentApi.reducerPath] : commentApi.reducer,
        [blogApi.reducerPath] : blogApi.reducer,
    },

    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(commentApi.middleware, blogApi.middleware),
});


export type RootState = ReturnType<typeof store.getState>

export type AppDistpatch = typeof store.dispatch