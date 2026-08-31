"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { CreateUserForm } from "./_components/create-user";
import { UploadPhotoForm } from "./_components/upload-photo";
import { useState } from "react";

export default function Page(){
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  return (
    <div className="mx-auto w-full max-w-270">
      <Breadcrumb pageName="Create User" />

      <div className="grid grid-cols-5 gap-8">
        <div className="col-span-5 xl:col-span-3">
          <CreateUserForm
            selectedFile={selectedFile}
            onUserCreated={() => setSelectedFile(null)}
          />
        </div>
        <div className="col-span-5 xl:col-span-2">
          <UploadPhotoForm 
            onFileChange={setSelectedFile}
          />
        </div>
      </div>
    </div>
  );
}