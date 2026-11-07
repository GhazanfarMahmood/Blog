import AuthLayout from "@/components/Auth/AuthLayout";
import LoginWithPassword from "@/components/Auth/LoginWithPassword";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Log In",
};

export default function LogIn() {
  return (
    <div className="flex min-h-screen flex-wrap items-center">
      <div className="w-full xl:w-1/2">
        <div className="mx-auto w-[570px] p-4 sm:p-12.5 xl:p-15">
          <LoginWithPassword />
        </div>
      </div>

      <AuthLayout 
        subTitle={"Sign in to your account"}
        title={"Welcome Back!"}
        description={"Please sign in to your account by completing the necessary fields below"}
      />
    </div>
  );
}
