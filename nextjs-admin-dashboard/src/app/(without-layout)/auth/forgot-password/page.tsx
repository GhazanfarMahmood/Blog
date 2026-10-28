import AuthLayout from "@/components/Auth/AuthLayout";
import ForgotPasswordForm from "@/components/Auth/ForgotPasswordForm"
import type { Metadata } from "next"

export const metadata : Metadata = {
    title : "Forgot Password",
};

export default function ForgotPassword(){
    return <div className="flex min-h-screen flex-wrap items-center">
        <div className="w-full xl:w-1/2">
            <div className="mx-auto w-[570px] p-4 sm:p-12.5 xl:p-15">
                <ForgotPasswordForm />
            </div>
        </div>

        <AuthLayout
            subTitle="Forgot your password?"
            title="Reset your password"
            description="Enter your email address and we'll send you a link to reset your password."
        />
    </div>
}