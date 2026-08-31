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
import { useState, type FormEvent } from "react";
import { useUpdateProfileMutation } from "@/services/api/authApi";
import { toast } from "react-toastify";


export interface UserInfo {
  name: string;
  phoneNumber?: string;
  email: string;
  bio?: string;
  role: string;
}

export function PersonalInfoForm(personalInfo: UserInfo) {
  const { name, phoneNumber = "", email, bio = "", role } = personalInfo;
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const [formData, setFormData] = useState<UserInfo>({
    name: name,
    phoneNumber: phoneNumber,
    email: email,
    bio: bio,
    role : role
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReset = () => {
    setFormData({
      name: name,
      phoneNumber: phoneNumber,
      email: email,
      bio: bio,
      role : role
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(!formData.name.trim()) {
      toast.error("Name is Required");
      return;
    }

    if(canChangeEmail && !formData.email.trim()) {
      toast.error("Email address is required");
      return;
    }
     const updatePayload = {
        name: formData.name.trim(),
        phoneNumber: formData.phoneNumber?.trim() ?? "",
        aboutMe : formData.bio?.trim() ?? "",
        ...(canChangeEmail && {
          email: formData.email.trim().toLowerCase(),
        }),
      };


    try {
      await updateProfile(updatePayload).unwrap();
      
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("PROFILE UPDATE ERROR:", error);

      toast.error(
        error?.data?.message || "Failed to updated profile",
      );
    }
  };

  const canChangeEmail  = role === "super-admin";

  if (!personalInfo.email) {
    return (
      <ShowcaseSection title="Personal Information" className="p-7!">
        <div className="flex items-center justify-center py-8">
          <p className="text-gray-500">Loading...</p>
        </div>
      </ShowcaseSection>
    );
  }

  return (
    <ShowcaseSection title="Personal Information" className="p-7!">
      <form onSubmit={handleSubmit}>
        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
          <InputGroup
            className="w-full sm:w-1/2"
            type="text"
            name="name"
            label="Full Name"
            placeholder="David Jhon"
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
            placeholder="+990 3343 7865"
            value={formData.phoneNumber}
            handleChange={handleInputChange}
            icon={<CallIcon />}
            iconPosition="left"
            height="sm"
            disabled={isLoading}
          />
        </div>

        <InputGroup
          className="mb-5.5"
          type="email"
          name="email"
          label="Email Address"
          placeholder="devidjond45@gmail.com"
          value={formData.email}
          handleChange={handleInputChange}
          icon={<EmailIcon />}
          iconPosition="left"
          height="sm"
          disabled={isLoading || !canChangeEmail}
        />

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
            className={`hover:bg-opacity-90 rounded-lg bg-primary px-6 py-1.75 font-medium text-gray-2 disabled:opacity-50 ${isLoading && "cursor-not-allowed"}`}
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
