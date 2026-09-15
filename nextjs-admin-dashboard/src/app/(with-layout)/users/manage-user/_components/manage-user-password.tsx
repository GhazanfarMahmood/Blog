"use client";

import { PasswordIcon } from "@/assets/icons";
import InputGroup from "@/components/FormElements/InputGroup";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import { useSetUserPasswordMutation } from "@/services/api/authApi";
import { useState, type FormEvent } from "react";
import { toast } from "react-toastify";

type ManageUserPasswordProps = {
  userId: string;
};

export default function ManageUserPassword({
  userId,
}: ManageUserPasswordProps) {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [setUserPassword, { isLoading }] = useSetUserPasswordMutation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReset = () => {
    setFormData({
      password: "",
      confirmPassword: "",
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.password) {
      toast.error("New password is required");
      return;
    }

    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    if (!formData.confirmPassword) {
      toast.error("Please confirm the new password");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await setUserPassword({
        id: userId,
        password: formData.password,
      }).unwrap();

      toast.success(response.message);
      handleReset();
    } catch (error) {
      console.error("UPDATE USER PASSWORD ERROR:", error);

      const message =
        typeof error === "object" &&
        error !== null &&
        "data" in error &&
        typeof error.data === "object" &&
        error.data !== null &&
        "message" in error.data &&
        typeof error.data.message === "string"
          ? error.data.message
          : "Failed to update password";

      toast.error(message);
    }
  };

  return (
    <div className="mt-8">
      <ShowcaseSection title="Security" className="p-7!">
        <form onSubmit={handleSubmit}>
          {/* New Password + Confirm Password */}
          <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
            <InputGroup
              className="w-full sm:w-1/2"
              type="password"
              name="password"
              label="New Password"
              placeholder="Enter New Password"
              value={formData.password}
              handleChange={handleInputChange}
              icon={<PasswordIcon />}
              iconPosition="left"
              height="sm"
              disabled={isLoading}
            />

            <InputGroup
              className="w-full sm:w-1/2"
              type="password"
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Confirm New Password"
              value={formData.confirmPassword}
              handleChange={handleInputChange}
              icon={<PasswordIcon />}
              iconPosition="left"
              height="sm"
              disabled={isLoading}
            />
          </div>

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
              className="hover:bg-opacity-90 rounded-lg bg-primary px-6 py-1.75 font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? "Updating..." : "Update Password"}
            </button>
          </div>
        </form>
      </ShowcaseSection>
    </div>
  );
}
