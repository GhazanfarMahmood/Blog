"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { useGetUserByIdQuery } from "@/services/api/authApi";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation"
import { ManageUserForm } from "./_components/manage-user";

export default function Page(){
    const searchParams = useSearchParams();

    const userId = searchParams.get("id");

    const {
        data: user,
        isLoading,
        isError
    }  = useGetUserByIdQuery(userId!, {
        skip : !userId,
    });

    if(!userId) {
        return (
            <div className="mx-auto w-full max-w-270">
                <Breadcrumb pageName="Manage User" />

                 <div className="rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark dark:shadow-card">
                    <p className="text-body-sm text-red">
                        User ID is missing.
                    </p>
                </div>
            </div>
        )
    }   

    if (isLoading) {
        return (
        <div className="mx-auto w-full max-w-270">
            <Breadcrumb pageName="Manage User" />

            <div className="rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark dark:shadow-card">
            <p className="text-body-sm text-dark-5 dark:text-dark-6">
                Loading user...
            </p>
            </div>
        </div>
        );
    }

    if (isError || !user) {
        return (
        <div className="mx-auto w-full max-w-270">
            <Breadcrumb pageName="Manage User" />

            <div className="rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark dark:shadow-card">
            <p className="text-body-sm text-red">
                Unable to load user.
            </p>

            <Link
                href="/users/all-users"
                className="mt-4 inline-flex rounded-lg bg-primary px-4 py-2 text-body-sm font-medium text-white"
            >
                Back to All Users
            </Link>
            </div>
        </div>
        );
    }

      return (
    <div className="mx-auto w-full max-w-270">
      <Breadcrumb pageName="Manage User" />

      {/* Back */}
      <div className="mb-5">
        <Link
          href="/users/all-users"
          className="text-body-sm font-medium text-primary hover:underline"
        >
          ← Back to All Users
        </Link>
      </div>
      
      <ManageUserForm user={user} />
    </div>
  );
}