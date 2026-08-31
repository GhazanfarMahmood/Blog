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




export function PersonalInfoForm() {
  const [formData, setFormData] = useState({
    name : "",
    phoneNumber : "",
    email : "",
    bio : "",
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
    }));
  };

 

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };




  return (
    <ShowcaseSection title="Enter Info to create User" className="p-7!">
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
            // disabled={isLoading}
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
            // disabled={isLoading}
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
          // disabled={isLoading || !canChangeEmail}
        />
        <SelectGroup
          className="w-full sm:w-1/2"
          label="Role"
          name="role"
          placeholder="Select Role"
          handleChange={handleInputChange}
          required
          // disabled={isLoading}
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

        <TextAreaGroup
          className="mb-5.5"
          name="bio"
          label="BIO"
          placeholder="Write your bio here"
          icon={<PencilSquareIcon />}
          onChange={handleInputChange}
          // disabled={isLoading}
        />

        <div className="flex justify-end gap-3">
          {/* <button
            className={`hover:bg-opacity-90 rounded-lg bg-primary px-6 py-1.75 font-medium text-gray-2 disabled:opacity-50 ${isLoading && "cursor-not-allowed"}`}
            type="submit"
            disabled={isLoading}
          > */}
          <button
            className={`hover:bg-opacity-90 rounded-lg bg-primary px-6 py-1.75 font-medium text-gray-2 disabled:opacity-50`}
            type="submit"
          >
            {/* {isLoading ? "Saving..." : "Save"} */}
            Save
          </button>
        </div>
      </form>
    </ShowcaseSection>
  );
}
