"use client";

import { useAppSelector } from "@/redux/hooks";
import { Header } from "@/components/Layouts/header";
import { Sidebar } from "@/components/Layouts/sidebar";
import AuthInitializer from "@/provider/AuthInitializer";

import { type PropsWithChildren } from "react";

export default function ProtectedLayout({
  children,
}: PropsWithChildren) {
  const { isAuthInitialized, isAuthenticated } = useAppSelector(
    (state) => state.auth
  );

  if (!isAuthInitialized) {
    return (
      <>
        <AuthInitializer />

        <div className="flex min-h-screen items-center justify-center">
          <p>Checking authentication...</p>
        </div>
      </>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="w-full bg-gray-2 dark:bg-[#020d1a]">
        <Header />

        <main className="isolate mx-auto w-full max-w-(--breakpoint-2xl) overflow-hidden p-4 md:p-6 2xl:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}