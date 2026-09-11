"use client";

import { ChevronUpIcon } from "@/assets/icons";
import {
  Dropdown,
  DropdownContent,
  DropdownTrigger,
} from "@/components/ui/dropdown";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LogOutIcon, SettingsIcon, UserIcon } from "./icons";
import { useLogoutMutation } from "@/services/api/authApi";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { clearUser } from "@/redux/features/authSlice";

export function UserInfo() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const [logout, { isLoading }] = useLogoutMutation();
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  async function handleLogout() {
    setIsOpen(false);
    const loadingId = toast.loading("Logging out...");

    try {
      await logout().unwrap();

      dispatch(clearUser());
      
      toast.update(loadingId, {
        render : "Logged out successfully",
        type : "success",
        isLoading : false,
        autoClose : 2000,
      });

      router.replace("/auth/login");
    } catch {
      toast.update(loadingId, {
        render : "Failed to log out",
        type : "error",
        isLoading : false,
        autoClose : 3000,
      });

      console.error("Logout error:", error);
    } 
  }

  if (isLoading) {
    return (
      <div className="flex items-center gap-3" role="presentation">
        <span className="inline-block size-12 animate-pulse rounded-full bg-gray-200" />

        <div className="relative h-7 w-fit">
          <span className="flex h-7 w-30 animate-pulse items-center justify-end rounded-full bg-gray-200 pr-2" />
          <ChevronUpIcon
            aria-hidden
            className="absolute top-1/2 right-2 -translate-y-1/2 rotate-180 text-gray-400/60"
            strokeWidth={1.5}
          />
        </div>
      </div>
    );
  }

  return (
    <Dropdown isOpen={isOpen} setIsOpen={setIsOpen}>
      <DropdownTrigger className="cursor-pointer rounded align-middle ring-primary ring-offset-2 outline-none focus-visible:ring-1 dark:ring-offset-gray-dark">
        <span className="sr-only">My Account</span>

        <figure className="flex items-center gap-3">
          {user?.profileImage ? (
            <Image
              src={user.profileImage}
              className="size-12 overflow-hidden rounded-full object-cover"
              alt={`Avatar of ${user.name}`}
              role="presentation"
              width={200}
              height={200}
            />
          ) : (
            <UserAvatar />
          )}
          <figcaption className="flex items-center gap-1 font-medium text-dark max-[1024px]:sr-only dark:text-dark-6">
            <span className="max-w-24 truncate">{user?.name || "Dummy Name"}</span>

            <ChevronUpIcon
              aria-hidden
              className={cn(
                "rotate-180 transition-transform",
                isOpen && "rotate-0",
              )}
              strokeWidth={1.5}
            />
          </figcaption>
        </figure>
      </DropdownTrigger>

      <DropdownContent
        className="border border-stroke bg-white shadow-md min-[230px]:min-w-70 dark:border-dark-3 dark:bg-gray-dark"
        align="end"
      >
        <h2 className="sr-only">User information</h2>

        <figure className="flex items-center gap-2.5 px-5 py-3.5">
          {user?.profileImage ? (
            <Image
              src={user.profileImage}
              className="size-12 shrink-0 overflow-hidden rounded-full object-cover object-center"
              alt={`Avatar of ${user.name}`}
              role="presentation"
              width={48}
              height={48}
            />
          ) : (
            <UserAvatar />
          )}

          <figcaption className="space-y-1 text-base font-medium">
            <div className="mb-2 leading-none text-dark dark:text-white">
              {user?.name || "Dummy Name"}
            </div>

            <div className="w-full max-w-47.5 truncate leading-none text-gray-6">
              {user?.email || "Dummy@email.com"}
            </div>
          </figcaption>
        </figure>

        <hr className="border-[#E8E8E8] dark:border-dark-3" />

        <div className="p-2 text-base text-[#4B5563] *:cursor-pointer dark:text-dark-6">
          <Link
            href={"/profile"}
            onClick={() => setIsOpen(false)}
            className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2.25 ring-primary outline-0 hover:bg-gray-2 hover:text-dark focus-visible:ring-1 dark:hover:bg-dark-3 dark:hover:text-white"
          >
            <UserIcon />

            <span className="mr-auto text-base font-medium">View profile</span>
          </Link>

          <Link
            href={"/settings"}
            onClick={() => setIsOpen(false)}
            className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2.25 ring-primary outline-0 hover:bg-gray-2 hover:text-dark focus-visible:ring-1 dark:hover:bg-dark-3 dark:hover:text-white"
          >
            <SettingsIcon />

            <span className="mr-auto text-base font-medium">
              Account Settings
            </span>
          </Link>
        </div>

        <hr className="border-[#E8E8E8] dark:border-dark-3" />

        <div className="p-2 text-base text-[#4B5563] dark:text-dark-6">
          <button
            disabled={isLoading}
            className="flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2.25 ring-primary outline-0 hover:bg-gray-2 hover:text-dark focus-visible:ring-1 dark:hover:bg-dark-3 dark:hover:text-white"
            onClick={handleLogout}
          >
            <LogOutIcon />

            <span className="text-base font-medium">
              {isLoading ? "Logging out..." : "Log out"}
            </span>
          </button>
        </div>
      </DropdownContent>
    </Dropdown>
  );
}

function UserAvatar() {
  return (
    <span className="flex size-12 items-center justify-center rounded-full border bg-gray-2 text-dark outline-none dark:border-dark-4 dark:bg-dark-2 dark:text-white">
      <UserIcon />
    </span>
  );
}
