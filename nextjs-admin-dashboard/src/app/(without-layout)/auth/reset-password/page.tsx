import AuthLayout from "@/components/Auth/AuthLayout";
import ResetPasswordForm from "@/components/Auth/ResetPasswordForm";
import type { Metadata } from "next"

export const metadata : Metadata = {
    title : "Reset Password",
};

export default function ResetPassword(){
    return <div className="flex min-h-screen flex-wrap items-center">
        <div className="w-full xl:w-1/2">
            <div className="mx-auto w-[570px] p-4 sm:p-12.5 xl:p-15">
                <ResetPasswordForm />
            </div>
        </div>

        <AuthLayout
            subTitle="Create a new password"
            title="Choose a new password"
            description="Enter your new password below to securely regain access to your account."
        />
    </div>
}