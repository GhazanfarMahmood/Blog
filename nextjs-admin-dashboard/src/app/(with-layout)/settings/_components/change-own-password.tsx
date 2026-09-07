"use client";

import { PasswordIcon } from "@/assets/icons";
import InputGroup from "@/components/FormElements/InputGroup";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import { useState, type FormEvent } from "react";
import { toast } from "react-toastify";
import { useChangeOwnPasswordMutation } from "@/services/api/authApi";

export default function ChangeOwnPassword() {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [
    changeOwnPassword,
    { isLoading },
  ] = useChangeOwnPasswordMutation();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReset = () => {
    setFormData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    if (!formData.currentPassword) {
      toast.error("Current password is required");
      return;
    }

    if (!formData.newPassword) {
      toast.error("New password is required");
      return;
    }

    if (formData.newPassword.length < 8) {
      toast.error("New password must be at least 8 characters");
      return;
    }

    if (!formData.confirmPassword) {
      toast.error("Please confirm your new password");
      return;
    }

    if (
      formData.newPassword !==
      formData.confirmPassword
    ) {
      toast.error("Passwords do not match");
      return;
    }

    if (
      formData.currentPassword ===
      formData.newPassword
    ) {
      toast.error(
        "New password must be different from your current password",
      );
      return;
    }

    try {
      await changeOwnPassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      }).unwrap();

      toast.success("Password updated successfully");

      handleReset();
    } catch (error: any) {
      console.error(
        "CHANGE OWN PASSWORD ERROR:",
        error,
      );

      toast.error(
        error?.data?.message ||
          "Failed to update password",
      );
    }
  };

  return (
    <ShowcaseSection
      title="Security"
      className="mt-8 p-7!"
    >
      <form onSubmit={handleSubmit}>
        {/* Current Password */}
        <div className="mb-5.5">
          <InputGroup
            className="w-full"
            type="password"
            name="currentPassword"
            label="Current Password"
            placeholder="Enter Current Password"
            value={formData.currentPassword}
            handleChange={handleInputChange}
            icon={<PasswordIcon />}
            iconPosition="left"
            height="sm"
            disabled={isLoading}
          />
        </div>

        {/* New Password + Confirm Password */}
        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
          <InputGroup
            className="w-full sm:w-1/2"
            type="password"
            name="newPassword"
            label="New Password"
            placeholder="Enter New Password"
            value={formData.newPassword}
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
            className="rounded-lg bg-primary px-6 py-1.75 font-medium text-white hover:bg-opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading
              ? "Updating..."
              : "Update Password"}
          </button>
        </div>
      </form>
    </ShowcaseSection>
  );
}