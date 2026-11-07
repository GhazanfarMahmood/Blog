"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { clearUser, setUser } from "@/redux/features/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useGetMeQuery } from "@/services/api/authApi";


export default function AuthInitializer() {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const {
        data: user,
        isSuccess, 
        isError,
        error,
    } = useGetMeQuery();

    useEffect(() => {
        if(isSuccess && user) {
            dispatch(setUser(user));
        }

        if(isError) {
            dispatch(clearUser());

            if(
                "status" in error &&
                error.status === 401
            ) {
                router.replace("/auth/login");
            }
        }
    }, [user, isSuccess, isError, error, dispatch, router]);

    return null;
}

