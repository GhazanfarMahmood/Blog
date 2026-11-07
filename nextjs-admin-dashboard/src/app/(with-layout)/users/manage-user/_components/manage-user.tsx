"use client";

import {
  CallIcon,
  EmailIcon,
  PencilSquareIcon,
  UserIcon,
} from "@/assets/icons";
import InputGroup from "@/components/FormElements/InputGroup";
import { TextAreaGroup } from "@/components/FormElements/InputGroup/text-area";
import SelectGroup from "@/components/FormElements/InputGroup/select-group";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import {
  AuthUser,
  useUpdateUserMutation,
} from "@/services/api/authApi";
import { Role } from "@/constants/roles";
import { useEffect, useState, type FormEvent } from "react";
import { toast } from "react-toastify";

type ManageUserFormProps = {
  user: AuthUser;
};

type FormDataType = {
  name: string;
  phoneNumber: string;
  email: string;
  role: Role;
  aboutMe: string;
  isWriter: boolean;
  designation: string;
  location: string;
  fbLink: string;
  twitterLink: string;
  instagramLink: string;
  linkedinLink: string;
  slug: string;
  isFeaturedWriter: boolean;
};

export function ManageUserForm({ user }: ManageUserFormProps) {
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const [formData, setFormData] = useState<FormDataType>({
    name: user.name,
    phoneNumber: user.phoneNumber ?? "",
    email: user.email,
    role: user.role,
    aboutMe: user.aboutMe ?? "",
    isWriter: user.isWriter ?? false,
    designation: user.designation ?? "",
    location: user.location ?? "",
    fbLink: user.fbLink ?? "",
    twitterLink: user.twitterLink ?? "",
    instagramLink: user.instagramLink ?? "",
    linkedinLink: user.linkedinLink ?? "",
    slug: user.slug ?? "",
    isFeaturedWriter: user.isFeaturedWriter ?? false,
  });

  useEffect(() => {
    setFormData({
      name: user.name,
      phoneNumber: user.phoneNumber ?? "",
      email: user.email,
      role: user.role,
      aboutMe: user.aboutMe ?? "",
      isWriter: user.isWriter ?? false,
      designation: user.designation ?? "",
      location: user.location ?? "",
      fbLink: user.fbLink ?? "",
      twitterLink: user.twitterLink ?? "",
      instagramLink: user.instagramLink ?? "",
      linkedinLink: user.linkedinLink ?? "",
      slug: user.slug ?? "",
      isFeaturedWriter: user.isFeaturedWriter ?? false,
    });
  }, [user]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "role" && value === "viewer"
        ? {
            isWriter: false,
            isFeaturedWriter: false,
          }
        : {}),
    }));
  };

  const handleWriterChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const checked = e.target.checked;

    setFormData((prev) => ({
      ...prev,
      isWriter: checked,
      ...(checked ? {} : { isFeaturedWriter: false }),
    }));
  };

  const handleFeaturedWriterChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      isFeaturedWriter: e.target.checked,
    }));
  };

  const handleReset = () => {
    setFormData({
      name: user.name,
      phoneNumber: user.phoneNumber ?? "",
      email: user.email,
      role: user.role,
      aboutMe: user.aboutMe ?? "",
      isWriter: user.isWriter ?? false,
      designation: user.designation ?? "",
      location: user.location ?? "",
      fbLink: user.fbLink ?? "",
      twitterLink: user.twitterLink ?? "",
      instagramLink: user.instagramLink ?? "",
      linkedinLink: user.linkedinLink ?? "",
      slug: user.slug ?? "",
      isFeaturedWriter: user.isFeaturedWriter ?? false,
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

    if (!formData.email.trim()) {
      toast.error("Email is required");
      return;
    }

    try {
      const isWriter =
        (formData.role === "admin" ||
          formData.role === "editor") &&
        formData.isWriter;

      const response = await updateUser({
        id: user.id,
        data: {
          name: formData.name.trim(),
          phoneNumber: formData.phoneNumber.trim(),
          email: formData.email.trim().toLowerCase(),
          role: formData.role,
          aboutMe: formData.aboutMe.trim(),
          isWriter,

          ...(isWriter
            ? {
                designation: formData.designation.trim(),
                location: formData.location.trim(),
                fbLink: formData.fbLink.trim(),
                twitterLink: formData.twitterLink.trim(),
                instagramLink: formData.instagramLink.trim(),
                linkedinLink: formData.linkedinLink.trim(),
                slug: formData.slug.trim().toLowerCase(),
                isFeaturedWriter: formData.isFeaturedWriter,
              }
            : {
                isFeaturedWriter: false,
              }),
        },
      }).unwrap();

      toast.success(response.message);
    } catch (error) {
      console.error("UPDATE USER ERROR:", error);

      const message =
        typeof error === "object" &&
        error !== null &&
        "data" in error &&
        typeof error.data === "object" &&
        error.data !== null &&
        "message" in error.data &&
        typeof error.data.message === "string"
          ? error.data.message
          : "Failed to update user";

      toast.error(message);
    }
  };

  const showWriterAccess =
    formData.role === "admin" ||
    formData.role === "editor";

  const showWriterFields =
    showWriterAccess && formData.isWriter;

  return (
    <ShowcaseSection
      title="Manage User"
      className="p-7!"
    >
      <form onSubmit={handleSubmit}>
        {/* Name + Phone */}
        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
          <InputGroup
            className="w-full sm:w-1/2"
            type="text"
            name="name"
            label="Full Name"
            placeholder="Enter Name"
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
            placeholder="Enter Phone Number"
            value={formData.phoneNumber}
            handleChange={handleInputChange}
            icon={<CallIcon />}
            iconPosition="left"
            height="sm"
            disabled={isLoading}
          />
        </div>

        {/* Email + Role */}
        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
          <InputGroup
            className="w-full sm:w-1/2"
            type="email"
            name="email"
            label="Email Address"
            placeholder="Enter Email Address"
            value={formData.email}
            handleChange={handleInputChange}
            icon={<EmailIcon />}
            iconPosition="left"
            height="sm"
            disabled={isLoading}
          />

          <SelectGroup
            className="w-full sm:w-1/2"
            label="Role"
            name="role"
            value={formData.role}
            handleChange={handleInputChange}
            required
            disabled={isLoading}
            height="sm"
            options={[
              {
                label: "Admin",
                value: "admin",
              },
              {
                label: "Editor",
                value: "editor",
              },
              {
                label: "Viewer",
                value: "viewer",
              },
            ]}
          />
        </div>

        {/* Writer Access */}
        {showWriterAccess && (
          <div className="mb-5.5">
            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                name="isWriter"
                checked={formData.isWriter}
                onChange={handleWriterChange}
                disabled={isLoading}
                className="h-4 w-4"
              />

              <span className="text-sm font-medium">
                Writer Access
              </span>
            </label>

            <p className="mt-1 text-sm text-gray-5">
              Allow this user to create, edit and delete posts
              and manage categories.
            </p>
          </div>
        )}

        {/* Writer Profile Fields */}
        {showWriterFields && (
          <>
            {/* Designation + Location */}
            <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
              <InputGroup
                className="w-full sm:w-1/2"
                type="text"
                name="designation"
                label="Designation"
                placeholder="Enter Designation"
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
                placeholder="Enter Location"
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

            {/* Slug */}
            <InputGroup
              className="mb-5.5"
              type="text"
              name="slug"
              label="Writer Slug"
              placeholder="Enter writer slug"
              value={formData.slug}
              handleChange={handleInputChange}
              height="sm"
              disabled={isLoading}
            />

            {/* Featured Writer */}
            <div className="mb-5.5">
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  name="isFeaturedWriter"
                  checked={formData.isFeaturedWriter}
                  onChange={handleFeaturedWriterChange}
                  disabled={isLoading}
                  className="h-4 w-4"
                />

                <span className="text-sm font-medium">
                  Featured Writer
                </span>
              </label>

              <p className="mt-1 text-sm text-gray-5">
                Show this writer in the featured writers section.
              </p>
            </div>
          </>
        )}

        {/* About Me */}
        <TextAreaGroup
          className="mb-5.5"
          name="aboutMe"
          label="BIO"
          placeholder="Write your bio here"
          icon={<PencilSquareIcon />}
          value={formData.aboutMe}
          onChange={handleInputChange}
          disabled={isLoading}
        />

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={handleReset}
            disabled={isLoading}
            className="rounded-lg border border-stroke px-6 py-1.75 font-medium text-dark hover:shadow-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-dark-3 dark:text-white"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isLoading}
            className="rounded-lg bg-primary px-6 py-1.75 font-medium text-white hover:bg-opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </ShowcaseSection>
  );
}