"use client";

import { UploadIcon } from "@/assets/icons";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import Image from "next/image";
import {
  type ChangeEvent,
  type FormEvent,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { toast } from "sonner";
import { UserIcon } from "./icons";
import { useDeleteProfileImageMutation, useUpdateProfileMutation } from "@/services/api/authApi";

const MAX_FILE_SIZE = 1 * 1024 * 1024;

type UploadPhotoFormProps = {
  initialImage: string | null;
};

function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("Failed to read file"));
      }
    };

    reader.onerror = () => {
      reject(new Error("Failed to read file"));
    };

    reader.readAsDataURL(file);
  });
}

export function UploadPhotoForm({
  initialImage,
}: UploadPhotoFormProps) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [imageSrc, setImageSrc] = useState<string | null>(
    initialImage,
  );

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // const [updateProfile, { isLoading }] =
  //   useUpdateProfileMutation();
  // const [deleteProfileImage, { isLoading: isDeleting }] =
  //   useDeleteProfileImageMutation();

  useEffect(() => {
    setImageSrc(initialImage);
    setSelectedFile(null);
  }, [initialImage]);

  function resetInput() {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  function openFilePicker() {
    // CHECKING LOADING
    // if (!isLoading) {
    //   inputRef.current?.click();
    // }
  }

  async function handleImageChange(
    e: ChangeEvent<HTMLInputElement>,
  ) {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      toast.error("File too large (max 1MB)");
      resetInput();
      return;
    }

    // Validate file type
    const allowedTypes = [
      "image/png",
      "image/jpeg",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      toast.error("Only PNG, JPG, JPEG or WebP images are allowed");
      resetInput();
      return;
    }

    try {
      // Create preview
      const preview = await readFileAsDataURL(file);

      setImageSrc(preview);

      // Keep the actual File for API upload
      setSelectedFile(file);
    } catch {
      toast.error("Failed to read file");
      setSelectedFile(null);
    }
  }

  async function handleDelete() {
    if (!imageSrc) {
      toast.info("No profile image to delete");
      return;
    }

    try {
      // await deleteProfileImage().unwrap();

      setImageSrc(null);
      resetInput();

      toast.success("Profile photo deleted successfully");
    } catch (error) {
      console.error("DELETE PROFILE IMAGE ERROR:", error);

      toast.error("Failed to delete profile photo");
    }
  }

  function handleCancel() {
    setImageSrc(initialImage);
    setSelectedFile(null);
    resetInput();
  }

  async function handleSubmit(
    e: FormEvent<HTMLFormElement>,
  ) {
    e.preventDefault();

    if (!selectedFile) {
      toast.info("No photo changes to save");
      return;
    }

    try {
      const formData = new FormData();

      
      formData.append("profileImage", selectedFile);

      // await updateProfile(formData).unwrap();

      toast.success("Photo updated successfully");

      setSelectedFile(null);
      resetInput();
    } catch (error: any) {
      console.error("PROFILE IMAGE UPDATE ERROR:", error);

      const message =
        error?.data?.message ||
        "Failed to update profile photo";

      toast.error(message);

      setImageSrc(initialImage);
      setSelectedFile(null);
      resetInput();
    }
  }

  return (
    <ShowcaseSection
      title="Your Photo"
      className="p-7!"
    >
      <form onSubmit={handleSubmit}>
        {/* Current / Preview Image */}
        <div className="mb-4 flex items-center gap-3">
          {imageSrc ? (
            <Image
              src={imageSrc}
              width={55}
              height={55}
              alt="User photo"
              className="size-14 rounded-full object-cover"
              quality={90}
            />
          ) : (
            <div className="flex size-14 items-center justify-center rounded-full bg-gray-2 text-dark dark:bg-dark-2 dark:text-white">
              <UserIcon className="size-7" />
            </div>
          )}

          <div>
            <span className="mb-1.5 block font-medium text-dark dark:text-white">
              Edit your photo
            </span>

            <span className="flex gap-3">
              <button
                type="button"
                onClick={handleDelete}
                // disabled={isLoading}
                className="text-body-sm hover:text-red disabled:opacity-50"
              >
                Delete
              </button>

              <button
                type="button"
                onClick={openFilePicker}
                // disabled={isLoading}
                className="text-body-sm hover:text-primary disabled:opacity-50"
              >
                Update
              </button>
            </span>
          </div>
        </div>

        {/* Upload Area */}
        <div
          className="
            relative mb-5.5 block w-full rounded-xl
            border border-dashed border-gray-4 bg-gray-2
            hover:border-primary
            dark:border-dark-3 dark:bg-dark-2
            dark:hover:border-primary
          "
        >
          <input
            type="file"
            name="profileImage"
            id={inputId}
            ref={inputRef}
            accept="image/png,image/jpeg,image/webp"
            hidden
            // disabled={isLoading}
            onChange={handleImageChange}
          />
{/* 
          <label
            htmlFor={inputId}
            className={`flex flex-col items-center justify-center p-4 sm:py-7.5 ${
              isLoading
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer"
            }`}
          > */}
          <label
            htmlFor={inputId}
            className={`flex flex-col items-center justify-center p-4 sm:py-7.5 cursor-pointer`}
          >
            <div className="flex size-13.5 items-center justify-center rounded-full border border-stroke bg-white dark:border-dark-3 dark:bg-gray-dark">
              <UploadIcon />
            </div>

            <p className="mt-2.5 text-body-sm font-medium">
              <span className="text-primary">
                Click to upload
              </span>{" "}
              or drag and drop
            </p>

            <p className="mt-1 text-body-xs">
              PNG, JPG, JPEG or WebP (max 1MB)
            </p>
          </label>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={handleCancel}
            className="
              flex justify-center rounded-lg border
              border-stroke px-6 py-1.75 font-medium
              text-dark hover:shadow-1
              disabled:cursor-not-allowed disabled:opacity-50
              dark:border-dark-3 dark:text-white
            "
            type="button"
            // disabled={isLoading}
          >
            Cancel
          </button>

          <button
            className="
              hover:bg-opacity-90 flex items-center
              justify-center rounded-lg bg-primary
              px-6 py-1.75 font-medium text-gray-2
              disabled:cursor-not-allowed disabled:opacity-50
            "
            type="submit"
            // disabled={isLoading || !selectedFile}
          >
            {/* {isLoading ? "Saving..." : "Save"} */}
            Save
          </button>
        </div>
      </form>
    </ShowcaseSection>
  );
}