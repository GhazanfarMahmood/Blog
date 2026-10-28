"use client";

import {
  CallIcon,
  EmailIcon,
  PencilSquareIcon,
  UserIcon,
} from "@/assets/icons";

import InputGroup from "@/components/FormElements/InputGroup";
import { TextAreaGroup } from "@/components/FormElements/InputGroup/text-area";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";

import { useUpdateProfileMutation } from "@/services/api/authApi";

import { useEffect, useState, type FormEvent } from "react";
import { toast } from "react-toastify";

export interface UserInfo {
  name: string;
  phoneNumber?: string;
  email: string;
  bio?: string;
  role: string;

  isWriter?: boolean;

  // Writer profile fields
  designation?: string;
  location?: string;
  fbLink?: string;
  twitterLink?: string;
  instagramLink?: string;
  linkedinLink?: string;

  // Super-admin only
  slug?: string;
  isFeaturedWriter?: boolean;
}

export function PersonalInfoForm(personalInfo: UserInfo) {
  const {
    name,
    phoneNumber = "",
    email,
    bio = "",
    role,

    isWriter = false,

    designation = "",
    location = "",
    fbLink = "",
    twitterLink = "",
    instagramLink = "",
    linkedinLink = "",

    slug = "",
    isFeaturedWriter = false,
  } = personalInfo;

  const [updateProfile, { isLoading }] =
    useUpdateProfileMutation();

  const [formData, setFormData] = useState<UserInfo>({
    name,
    phoneNumber,
    email,
    bio,
    role,

    isWriter,

    designation,
    location,
    fbLink,
    twitterLink,
    instagramLink,
    linkedinLink,

    slug,
    isFeaturedWriter,
  });

  useEffect(() => {
    setFormData({
      name,
      phoneNumber,
      email,
      bio,
      role,

      isWriter,

      designation,
      location,
      fbLink,
      twitterLink,
      instagramLink,
      linkedinLink,

      slug,
      isFeaturedWriter,
    });
  }, [
    name,
    phoneNumber,
    email,
    bio,
    role,
    isWriter,
    designation,
    location,
    fbLink,
    twitterLink,
    instagramLink,
    linkedinLink,
    slug,
    isFeaturedWriter,
  ]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFeaturedChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      isFeaturedWriter: e.target.checked,
    }));
  };

  const handleReset = () => {
    setFormData({
      name,
      phoneNumber,
      email,
      bio,
      role,

      isWriter,

      designation,
      location,
      fbLink,
      twitterLink,
      instagramLink,
      linkedinLink,

      slug,
      isFeaturedWriter,
    });
  };

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Name is required");
      return;
    }

    const isSuperAdmin = role === "super-admin";

    if (isSuperAdmin && !formData.slug?.trim()) {
      toast.error("Slug is required");
      return;
    }

    /*
     * Basic profile fields.
     */
    const updatePayload: Record<string, unknown> = {
      name: formData.name.trim(),
      phoneNumber: formData.phoneNumber?.trim() ?? "",
      aboutMe: formData.bio?.trim() ?? "",
    };

    /*
     * Writer profile fields.
     *
     * Super-admin also gets these fields.
     *
     * Therefore:
     * isWriter === true OR role === super-admin
     */
    if (isWriter || isSuperAdmin) {
      updatePayload.designation =
        formData.designation?.trim() ?? "";

      updatePayload.location =
        formData.location?.trim() ?? "";

      updatePayload.fbLink =
        formData.fbLink?.trim() ?? "";

      updatePayload.twitterLink =
        formData.twitterLink?.trim() ?? "";

      updatePayload.instagramLink =
        formData.instagramLink?.trim() ?? "";

      updatePayload.linkedinLink =
        formData.linkedinLink?.trim() ?? "";
    }

    /*
     * Super-admin only fields.
     */
    if (isSuperAdmin) {
      updatePayload.slug =
        formData.slug?.trim() ?? "";

      updatePayload.isFeaturedWriter =
        formData.isFeaturedWriter ?? false;

      updatePayload.email =
        formData.email.trim().toLowerCase();
    }

    try {
      await updateProfile(updatePayload).unwrap();

      toast.success("Profile updated successfully");
    } catch (error) {
      console.error(
        "PROFILE UPDATE ERROR:",
        error,
      );

      const message =
        typeof error === "object" &&
        error !== null &&
        "data" in error &&
        typeof error.data === "object" &&
        error.data !== null &&
        "message" in error.data &&
        typeof error.data.message === "string"
          ? error.data.message
          : "Failed to update profile";

      toast.error(message);
    }
  };

  const isSuperAdmin = role === "super-admin";

  /*
   * Super-admin OR writer can see writer fields.
   */
  const showWriterFields =
    isWriter || isSuperAdmin;

  return (
    <ShowcaseSection
      title="Personal Information"
      className="p-7!"
    >
      <form onSubmit={handleSubmit}>

        {/* ========================= */}
        {/* NAME + PHONE */}
        {/* ========================= */}

        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
          <InputGroup
            className="w-full sm:w-1/2"
            type="text"
            name="name"
            label="Full Name"
            placeholder="David John"
            value={formData.name}
            handleChange={handleInputChange}
            icon={<UserIcon />}
            iconPosition="left"
            height="sm"
            disabled={isLoading}
          />

          <InputGroup
            className="w-full sm:w-1/2"
            type="text"
            name="phoneNumber"
            label="Phone Number"
            placeholder="+92 300 1234567"
            value={formData.phoneNumber}
            handleChange={handleInputChange}
            icon={<CallIcon />}
            iconPosition="left"
            height="sm"
            disabled={isLoading}
          />
        </div>

        {/* ========================= */}
        {/* EMAIL */}
        {/* ========================= */}

        <InputGroup
          className="mb-5.5"
          type="email"
          name="email"
          label="Email Address"
          placeholder="example@gmail.com"
          value={formData.email}
          handleChange={handleInputChange}
          icon={<EmailIcon />}
          iconPosition="left"
          height="sm"
          disabled={
            isLoading || !isSuperAdmin
          }
        />

        {/* ========================= */}
        {/* WRITER PROFILE FIELDS */}
        {/* ========================= */}

        {showWriterFields && (
          <>
            {/* Designation + Location */}

            <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
              <InputGroup
                className="w-full sm:w-1/2"
                type="text"
                name="designation"
                label="Designation"
                placeholder="e.g. Senior Full Stack Developer"
                value={formData.designation}
                handleChange={handleInputChange}
                height="sm"
                disabled={isLoading}
              />

              <InputGroup
                className="w-full sm:w-1/2"
                type="text"
                name="location"
                label="Location"
                placeholder="e.g. Lahore, Pakistan"
                value={formData.location}
                handleChange={handleInputChange}
                height="sm"
                disabled={isLoading}
              />
            </div>

            {/* Facebook + Twitter */}

            <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
              <InputGroup
                className="w-full sm:w-1/2"
                type="url"
                name="fbLink"
                label="Facebook"
                placeholder="Enter Facebook URL"
                value={formData.fbLink}
                handleChange={handleInputChange}
                height="sm"
                disabled={isLoading}
              />

              <InputGroup
                className="w-full sm:w-1/2"
                type="url"
                name="twitterLink"
                label="Twitter / X"
                placeholder="Enter Twitter / X URL"
                value={formData.twitterLink}
                handleChange={handleInputChange}
                height="sm"
                disabled={isLoading}
              />
            </div>

            {/* Instagram + LinkedIn */}

            <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
              <InputGroup
                className="w-full sm:w-1/2"
                type="url"
                name="instagramLink"
                label="Instagram"
                placeholder="Enter Instagram URL"
                value={formData.instagramLink}
                handleChange={handleInputChange}
                height="sm"
                disabled={isLoading}
              />

              <InputGroup
                className="w-full sm:w-1/2"
                type="url"
                name="linkedinLink"
                label="LinkedIn"
                placeholder="Enter LinkedIn URL"
                value={formData.linkedinLink}
                handleChange={handleInputChange}
                height="sm"
                disabled={isLoading}
              />
            </div>
          </>
        )}

        {/* ========================= */}
        {/* SUPER ADMIN ONLY */}
        {/* ========================= */}

        {isSuperAdmin && (
          <>
            <InputGroup
              className="mb-5.5"
              type="text"
              name="slug"
              label="Slug"
              placeholder="e.g. ghazanfar-mahmood"
              value={formData.slug}
              handleChange={handleInputChange}
              height="sm"
              disabled={isLoading}
            />

            <div className="mb-5.5">
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  name="isFeaturedWriter"
                  checked={
                    formData.isFeaturedWriter
                  }
                  onChange={handleFeaturedChange}
                  disabled={isLoading}
                  className="h-4 w-4"
                />

                <span className="text-sm font-medium text-dark dark:text-white">
                  Featured Writer
                </span>
              </label>

              <p className="mt-1 text-sm text-gray-500">
                Show this profile in the featured
                writers section on the website.
              </p>
            </div>
          </>
        )}

        {/* ========================= */}
        {/* ABOUT ME */}
        {/* ========================= */}

        <TextAreaGroup
          className="mb-5.5"
          name="bio"
          label="BIO"
          placeholder="Write your bio here"
          icon={<PencilSquareIcon />}
          value={formData.bio}
          onChange={handleInputChange}
          disabled={isLoading}
        />

        {/* ========================= */}
        {/* BUTTONS */}
        {/* ========================= */}

        <div className="flex justify-end gap-3">
          <button
            className="rounded-lg border border-stroke px-6 py-1.75 font-medium text-dark hover:shadow-1 disabled:opacity-50 dark:border-dark-3 dark:text-white"
            type="button"
            onClick={handleReset}
            disabled={isLoading}
          >
            Cancel
          </button>

          <button
            className={`hover:bg-opacity-90 rounded-lg bg-primary px-6 py-1.75 font-medium text-gray-2 disabled:opacity-50 ${
              isLoading
                ? "cursor-not-allowed"
                : ""
            }`}
            type="submit"
            disabled={isLoading}
          >
            {isLoading
              ? "Saving..."
              : "Save"}
          </button>
        </div>
      </form>
    </ShowcaseSection>
  );
}