"use client";

import { clearUser, setUser } from "@/redux/features/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useGetMeQuery } from "@/services/api/authApi";
import { useEffect } from "react";

export default function AuthInitializer() {
    const dispatch = useAppDispatch();

    const {
        data: user,
        isSuccess, 
        isError,
    } = useGetMeQuery();

    useEffect(() => {
        if(isSuccess && user) {
            dispatch(setUser(user));
        }

        if(isError) {
            dispatch(clearUser());
        }
    }, [user, isSuccess, isError, dispatch]);

    return null;
}

