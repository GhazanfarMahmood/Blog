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
import { AuthUser, useUpdateUserMutation } from "@/services/api/authApi";
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
};

export function ManageUserForm({
  user,
}: ManageUserFormProps) {
  const [updateUser, { isLoading }] =
    useUpdateUserMutation();

  const [formData, setFormData] = useState<FormDataType>({
    name: user.name,
    phoneNumber: user.phoneNumber ?? "",
    email: user.email,
    role: user.role,
    aboutMe: user.aboutMe ?? "",
  });

  useEffect(() => {
    setFormData({
      name: user.name,
      phoneNumber: user.phoneNumber ?? "",
      email: user.email,
      role: user.role,
      aboutMe: user.aboutMe ?? "",
    });
  }, [user]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReset = () => {
    setFormData({
      name: user.name,
      phoneNumber: user.phoneNumber ?? "",
      email: user.email,
      role: user.role,
      aboutMe: user.aboutMe ?? "",
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
      const response = await updateUser({
        id: user.id,
        data: {
          name: formData.name.trim(),
          phoneNumber: formData.phoneNumber.trim(),
          email: formData.email.trim().toLowerCase(),
          role: formData.role,
          aboutMe: formData.aboutMe.trim(),
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