"use client";

import Image from "next/image";
import {
  type ChangeEvent,
  useEffect,
  useId,
  useState,
} from "react";
import { toast } from "sonner";

import { CameraIcon, UserIcon } from "./icons";
import { useUpdateProfileMutation } from "@/services/api/authApi";

const MAX_FILE_SIZE = 1 * 1024 * 1024;

type ProfileImageUploaderProps = {
  initialImage: string | null;
  name: string;
};

export function ProfileImageUploader({
  initialImage,
  name,
}: ProfileImageUploaderProps) {
  const inputId = useId();

  const [imageSrc, setImageSrc] = useState<string | null>(
    initialImage
  );

  const [updateProfile, { isLoading }] =
    useUpdateProfileMutation();

  useEffect(() => {
    setImageSrc(initialImage);
  }, [initialImage]);

  async function handleImageChange(
    e: ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      toast.error("File too large. Maximum size is 1MB.");
      e.target.value = "";
      return;
    }

    // Validate file type
    const allowedTypes = [
      "image/png",
      "image/jpg",
      "image/jpeg",
    ];

    if (!allowedTypes.includes(file.type)) {
      toast.error(
        "Invalid image format. Only PNG, JPG and JPEG are allowed."
      );

      e.target.value = "";
      return;
    }

    // Create temporary preview
    const previewUrl = URL.createObjectURL(file);

    setImageSrc(previewUrl);

    try {
      const formData = new FormData();

      formData.append("profileImage", file);

      await updateProfile(formData).unwrap();

      toast.success("Profile image updated successfully");
    } catch (error) {
      console.error("PROFILE IMAGE UPLOAD ERROR:", error);

      // Restore previous image if upload failed
      setImageSrc(initialImage);

      toast.error("Failed to upload profile image");
    } finally {
      URL.revokeObjectURL(previewUrl);

      // Allow selecting the same file again
      e.target.value = "";
    }
  }

  return (
    <div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
      <div className="relative flex items-center justify-center drop-shadow-2">

        {imageSrc ? (
          <Image
            src={imageSrc}
            width={160}
            height={160}
            className="size-28 overflow-hidden rounded-full object-cover sm:size-40"
            alt={`${name} profile image`}
          />
        ) : (
          <span className="mx-auto flex size-28 items-center justify-center rounded-full bg-white px-2.5 py-2.25 sm:size-40">
            <UserIcon className="size-1/2" />
          </span>
        )}

        <label
          htmlFor={inputId}
          className={`absolute right-0 bottom-0 flex size-8.5 items-center justify-center rounded-full bg-primary text-white sm:right-2 sm:bottom-2 ${
            isLoading
              ? "cursor-not-allowed opacity-60"
              : "cursor-pointer hover:bg-opacity-90"
          }`}
        >
          <CameraIcon />

          <input
            type="file"
            id={inputId}
            className="sr-only"
            onChange={handleImageChange}
            accept="image/png,image/jpg,image/jpeg"
            disabled={isLoading}
          />
        </label>

      </div>
    </div>
  );
}