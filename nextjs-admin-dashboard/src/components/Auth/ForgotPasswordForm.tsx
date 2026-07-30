"use client";

import React, { useState } from "react";
import InputGroup from "../FormElements/InputGroup";
import { ArrowLeftIcon, EmailIcon } from "@/assets/icons";
import Link from "next/link";
import { useForgotPasswordMutation } from "@/services/api/authApi";

export default function ForgotPasswordForm(){
    const [email, setEmail] = useState("");
    const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try{
            const response = await forgotPassword({
                email,
            }).unwrap();

            console.log(response);

        } catch (error) {
            console.log(error);
        }
    };

    return <form onSubmit={handleSubmit}>
        <InputGroup
            type="email"
            label="Email"
            className="mb-4 [&_input]:py-3.75"
            placeholder="Enter your email"
            name="email"
            handleChange={(e) => setEmail(e.target.value)}
            value={email}
            icon={<EmailIcon />}
        />
        <div className="mb-4.5">
            <button 
                type="submit"
                className="hover:bg-opacity-90 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary p-4 font-medium text-white transition disabled:cursor-not-allowed disabled:opacity-70"
            >
                Send Reset Link
            </button>
            <Link 
                href={"/auth/sign-in"} 
                aria-label="Back to sign in"
                className="flex items-center justify-center gap-1 mt-4 font-medium ring-primary outline-0 hover:text-primary focus-visible:text-primary focus-visible:ring dark:text-white dark:hover:text-primary"
            >
                <ArrowLeftIcon />
                Back to Sign In
            </Link>
        </div>
    </form>
}