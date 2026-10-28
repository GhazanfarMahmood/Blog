"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { ProfileImageUploader } from "./_components/profile-image";
import { useAppSelector } from "@/redux/hooks";

export default function Page() {
  const user = useAppSelector((state) => state.auth.user);

  if (!user) {
    return null;
  }

  return (
    <div className="mx-auto w-full max-w-242.5">
      <Breadcrumb pageName="Profile" />

      <div className="overflow-hidden rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
        <div className="relative z-20 h-35 md:h-65">
          <Image
            src="/images/cover/cover-01.png"
            alt="profile cover"
            className="h-full w-full rounded-tl-[10px] rounded-tr-[10px] object-cover object-center"
            width={970}
            height={260}
          />
        </div>

        <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
          <ProfileImageUploader
            initialImage={user.profileImage}
            name={user.name}
          />

          <div className="mt-4">
            <h3 className="mb-2 text-heading-6 font-bold text-dark dark:text-white">
              {user.name}
            </h3>

            <p className="font-medium mb-2">
              Role: {user.role}
            </p>

            {user.phoneNumber && 
              <p className="font-medium mb-2">
                Contact Info: {user.phoneNumber}
              </p>
            }

            <div className="mx-auto max-w-180">
              <h4 className="font-medium text-dark dark:text-white">
                About Me
              </h4>

              <p className="mt-0">
                {user.aboutMe || "No bio available."}
              </p>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}