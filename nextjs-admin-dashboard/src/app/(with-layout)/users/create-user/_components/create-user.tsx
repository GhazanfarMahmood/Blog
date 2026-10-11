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
import { useState, type FormEvent } from "react";
import { toast } from "react-toastify";
import { useCreateUserMutation } from "@/services/api/authApi";

type CreateUserFormProps = {
  selectedFile: File | null;
  onUserCreated: () => void;
};

export function CreateUserForm({
  selectedFile,
  onUserCreated,
}: CreateUserFormProps) {
  const [createUser, { isLoading }] = useCreateUserMutation();

  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    password: "",
    role: "",
    aboutMe: "",

    isWriter: false,

    designation: "",
    location: "",
    fbLink: "",
    twitterLink: "",
    instagramLink: "",
    linkedinLink: "",
    slug: "",
    isFeaturedWriter: false,
  });

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
      ...(checked === false
        ? {
            isFeaturedWriter: false,
          }
        : {}),
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

    if (!formData.password.trim()) {
      toast.error("Password is required");
      return;
    }

    if (!formData.role) {
      toast.error("Please select a role");
      return;
    }

    const isWriter =
      (formData.role === "admin" ||
        formData.role === "editor") &&
      formData.isWriter;

    try {
      const payload = new FormData();

      payload.append("name", formData.name.trim());

      payload.append(
        "email",
        formData.email.trim().toLowerCase(),
      );

      payload.append("password", formData.password);

      payload.append("role", formData.role);

      payload.append(
        "isWriter",
        String(isWriter),
      );

      payload.append(
        "phoneNumber",
        formData.phoneNumber.trim(),
      );

      payload.append(
        "aboutMe",
        formData.aboutMe.trim(),
      );

      // Writer fields
      if (isWriter) {
        payload.append(
          "designation",
          formData.designation.trim(),
        );

        payload.append(
          "location",
          formData.location.trim(),
        );

        payload.append(
          "fbLink",
          formData.fbLink.trim(),
        );

        payload.append(
          "twitterLink",
          formData.twitterLink.trim(),
        );

        payload.append(
          "instagramLink",
          formData.instagramLink.trim(),
        );

        payload.append(
          "linkedinLink",
          formData.linkedinLink.trim(),
        );

        payload.append(
          "slug",
          formData.slug.trim().toLowerCase(),
        );

        payload.append(
          "isFeaturedWriter",
          String(formData.isFeaturedWriter),
        );
      }

      // Image is optional
      if (selectedFile) {
        payload.append(
          "profileImage",
          selectedFile,
        );
      }

      const response =
        await createUser(payload).unwrap();

      toast.success(response.message);

      setFormData({
        name: "",
        phoneNumber: "",
        email: "",
        password: "",
        role: "",
        aboutMe: "",

        isWriter: false,

        designation: "",
        location: "",
        fbLink: "",
        twitterLink: "",
        instagramLink: "",
        linkedinLink: "",
        slug: "",
        isFeaturedWriter: false,
      });

      onUserCreated();
    } catch (error) {
      console.error(
        "CREATE USER ERROR:",
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
          : "Failed to create user";

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
      title="Enter Info to create User"
      className="p-7!"
    >
      <form onSubmit={handleSubmit}>
        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
          <InputGroup
            className="w-full sm:w-1/2"
            type="text"
            name="name"
            label="Full Name"
            placeholder="Enter Name"
            handleChange={handleInputChange}
            icon={<UserIcon />}
            iconPosition="left"
            height="sm"
            value={formData.name}
            disabled={isLoading}
          />

          <InputGroup
            className="w-full sm:w-1/2"
            type="text"
            name="phoneNumber"
            label="Phone Number"
            placeholder="Enter Contact Info"
            handleChange={handleInputChange}
            icon={<CallIcon />}
            iconPosition="left"
            height="sm"
            value={formData.phoneNumber}
            disabled={isLoading}
          />
        </div>

        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
          <InputGroup
            className="w-full sm:w-1/2"
            type="email"
            name="email"
            label="Email Address"
            placeholder="Enter Email Address"
            handleChange={handleInputChange}
            icon={<EmailIcon />}
            iconPosition="left"
            height="sm"
            value={formData.email}
            disabled={isLoading}
          />

          <SelectGroup
            className="w-full sm:w-1/2"
            label="Role"
            name="role"
            placeholder="Select Role"
            handleChange={handleInputChange}
            required
            disabled={isLoading}
            value={formData.role}
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

        {showWriterFields && (
          <>
            <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
              <InputGroup
                className="w-full sm:w-1/2"
                type="text"
                name="designation"
                label="Designation"
                placeholder="Enter Designation"
                handleChange={handleInputChange}
                icon={<UserIcon />}
                iconPosition="left"
                height="sm"
                value={formData.designation}
                disabled={isLoading}
              />

              <InputGroup
                className="w-full sm:w-1/2"
                type="text"
                name="location"
                label="Location"
                placeholder="Enter Location"
                handleChange={handleInputChange}
                icon={<UserIcon />}
                iconPosition="left"
                height="sm"
                value={formData.location}
                disabled={isLoading}
              />
            </div>

            <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
              <InputGroup
                className="w-full sm:w-1/2"
                type="url"
                name="fbLink"
                label="Facebook"
                placeholder="Enter Facebook URL"
                handleChange={handleInputChange}
                height="sm"
                value={formData.fbLink}
                disabled={isLoading}
              />

              <InputGroup
                className="w-full sm:w-1/2"
                type="url"
                name="twitterLink"
                label="Twitter / X"
                placeholder="Enter Twitter / X URL"
                handleChange={handleInputChange}
                height="sm"
                value={formData.twitterLink}
                disabled={isLoading}
              />
            </div>

            <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
              <InputGroup
                className="w-full sm:w-1/2"
                type="url"
                name="instagramLink"
                label="Instagram"
                placeholder="Enter Instagram URL"
                handleChange={handleInputChange}
                height="sm"
                value={formData.instagramLink}
                disabled={isLoading}
              />

              <InputGroup
                className="w-full sm:w-1/2"
                type="url"
                name="linkedinLink"
                label="LinkedIn"
                placeholder="Enter LinkedIn URL"
                handleChange={handleInputChange}
                height="sm"
                value={formData.linkedinLink}
                disabled={isLoading}
              />
            </div>

            <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
              <InputGroup
                className="w-full sm:w-1/2"
                type="text"
                name="slug"
                label="Slug"
                placeholder="Enter Writer Slug"
                handleChange={handleInputChange}
                height="sm"
                value={formData.slug}
                disabled={isLoading}
              />

              <div className="flex w-full items-center sm:w-1/2">
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
              </div>
            </div>
          </>
        )}

        <InputGroup
          className="mb-5.5"
          type="password"
          name="password"
          label="Password"
          placeholder="Enter Password"
          handleChange={handleInputChange}
          icon={<CallIcon />}
          iconPosition="left"
          height="sm"
          value={formData.password}
          disabled={isLoading}
        />

        <TextAreaGroup
          className="mb-5.5"
          name="aboutMe"
          label="BIO"
          placeholder="Write your bio here"
          icon={<PencilSquareIcon />}
          onChange={handleInputChange}
          value={formData.aboutMe}
          disabled={isLoading}
        />

        <div className="flex justify-end gap-3">
          <button
            className={`hover:bg-opacity-90 rounded-lg bg-primary px-6 py-1.75 font-medium text-gray-2 disabled:opacity-50 ${
              isLoading && "cursor-not-allowed"
            }`}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </ShowcaseSection>
  );
}