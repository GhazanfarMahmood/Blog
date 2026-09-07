"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { PersonalInfoForm } from "./_components/personal-info";
import { UploadPhotoForm } from "./_components/upload-photo";
import { useGetMeQuery } from "@/services/api/authApi";
import ChangeOwnPassword from "./_components/change-own-password";


export default function SettingsPage() {
  const {
    data: user,
    isLoading,
    isError,
  } = useGetMeQuery();

  if(isLoading) {
    return <div>Loading....</div>
  }

  if(isError || !user) {
    return <div>Unable to load profile.</div>;
  }

  return (
    <div className="mx-auto w-full max-w-270">
      <Breadcrumb pageName="Settings" />

      <div className="grid grid-cols-5 gap-8">
        <div className="col-span-5 xl:col-span-3">
          <PersonalInfoForm
            name={user?.name}
            email={user?.email}
            bio={user?.aboutMe ?? ""}
            phoneNumber={user?.phoneNumber ?? ""}
            role={user.role}
          />
        </div>
        <div className="col-span-5 xl:col-span-2">
          <UploadPhotoForm initialImage={user.profileImage ?? null} />
        </div>
      </div>

      <ChangeOwnPassword />
    </div>
  );
}
