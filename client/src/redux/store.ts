import { commentApi } from "@/services/api/commentApi";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer : {
        [commentApi.reducerPath] : commentApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(commentApi.middleware),
    
});


export type RootState = ReturnType<typeof store.getState>

export type AppDistpatch = typeof store.dispatch