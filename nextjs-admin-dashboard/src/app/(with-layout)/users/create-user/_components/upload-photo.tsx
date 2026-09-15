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

const MAX_FILE_SIZE = 1 * 1024 * 1024;

const ALLOWED_FILE_TYPES  = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp"
];

type UploadPhotoFormProps = {
  onFileChange: (file: File | null) => void;
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
  onFileChange,
}: UploadPhotoFormProps) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [imageSrc, setImageSrc] = useState<string | null>(null);

  function resetInput() {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  async function handleImageChange(
    e: ChangeEvent<HTMLInputElement>,
  ) {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast.error("File too large (max 1MB)");
      resetInput();
      return;
    }

    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      toast.error("Only PNG, JPG, JPEG or WebP images are allowed");
      resetInput();
      return;
    }

    try {
      const preview = await readFileAsDataURL(file);
      setImageSrc(preview);
      onFileChange(file);
    } catch {
      toast.error("Failed to read file");
      setImageSrc(null);
      onFileChange(null);
    }
  }

  function handleRemove() {
    setImageSrc(null);
    onFileChange(null);
    resetInput();
  }

  function handleCancel() {
    setImageSrc(null);
    onFileChange(null);
    resetInput();
  }

  return (
     <ShowcaseSection
      title="Profile Photo"
      className="p-7!"
    >
      <div className="mb-4 flex items-center gap-3">
        {imageSrc ? (
          <Image
            src={imageSrc}
            width={55}
            height={55}
            alt="Selected profile photo"
            className="size-14 rounded-full object-cover"
          />
        ) : (
          <div className="flex size-14 items-center justify-center rounded-full bg-gray-2 text-dark dark:bg-dark-2 dark:text-white">
            <UserIcon className="size-7" />
          </div>
        )}

        <div>
          <span className="mb-1.5 block font-medium text-dark dark:text-white">
            Profile photo
          </span>

          {imageSrc && (
            <button
              type="button"
              onClick={handleRemove}
              className="text-body-sm text-red hover:text-red/80"
            >
              Remove
            </button>
          )}
        </div>
      </div>

      <div className="relative mb-5.5 block w-full rounded-xl border border-dashed border-gray-4 bg-gray-2 hover:border-primary dark:border-dark-3 dark:bg-dark-2 dark:hover:border-primary">
        <input
          type="file"
          name="profileImage"
          id={inputId}
          ref={inputRef}
          accept="image/png,image/jpeg,image/webp"
          hidden
          onChange={handleImageChange}
        />

        <label
          htmlFor={inputId}
          className="flex cursor-pointer flex-col items-center justify-center p-4 sm:py-7.5"
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

      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleCancel}
          className="rounded-lg border border-stroke px-6 py-1.75 font-medium text-dark hover:shadow-1 dark:border-dark-3 dark:text-white"
        >
          Cancel
        </button>
      </div>
    </ShowcaseSection>
  );
}