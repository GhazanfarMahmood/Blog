"use client";

import { PasswordIcon } from "@/assets/icons";
import React, { useState } from "react";
import InputGroup from "../FormElements/InputGroup";
import { useResetPasswordMutation } from "@/services/api/authApi";
import { useSearchParams } from "next/navigation";

export default function ResetPasswordForm(){
    const [password, setPassword] = useState({
        newPassword : "",
        confirmPassword : "",
    })
    const searchParams = useSearchParams();
    const [resetPassword, { isLoading }] = useResetPasswordMutation();

    const token = searchParams.get("token");
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(!token) {
            return;
        }

        if(password !== confirmPassword) {
            return;
        }

        try {
            const response = await resetPassword({
                token,
                password
            }).unwrap();

            console.log(response);
        } catch (error) {
            console.log(error)
        }
        
    };
    
     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword({
          ...password,
          [e.target.name]: e.target.value,
        });
      };

    return <form onSubmit={handleSubmit}>
         <InputGroup
            type="password"
            label="New Password"
            className="mb-4 [&_input]:py-3.75"
            placeholder="Enter your new password"
            name="newPassword"
            handleChange={handleChange}
            value={password.newPassword}
            icon={<PasswordIcon />}
        />
         <InputGroup
            type="password"
            label="Confirm Password"
            className="mb-4 [&_input]:py-3.75"
            placeholder="Confirm your new password"
            name="confirmPassword"
            handleChange={handleChange}
            value={password.confirmPassword}
            icon={<PasswordIcon />}
        />
        <div className="mb-4.5"></div>
        <button 
            type="submit"
            className="hover:bg-opacity-90 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary p-4 font-medium text-white transition disabled:cursor-not-allowed disabled:opacity-70"
        >
            Reset Password
        </button>
    </form>
}