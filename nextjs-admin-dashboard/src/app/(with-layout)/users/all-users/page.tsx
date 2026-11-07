"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { useDeleteUserMutation, useGetUsersQuery } from "@/services/api/authApi";
import Link from "next/link";

export interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  aboutMe: string;
  profileImage: string | null;
  role: Role;
  createdAt: string;
  updatedAt: string;
}

export default function Page() {
  const {
    data,
    isLoading,
    isError,
  } = useGetUsersQuery();

  const [deleteUser, { isLoading: isDeleting }] =
    useDeleteUserMutation();
    
    const users = data?.users ?? [];

    const handleDeleteUser = async (id: string, name: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${name}?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteUser(id).unwrap();

      alert("User deleted successfully.");
    } catch (error) {
      console.error("Delete user error:", error);

      alert("Failed to delete user.");
    }
  };

  return (
    <div className="mx-auto w-full max-w-270">
      <Breadcrumb pageName="All Users" />

      <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
        {/* Header */}
        <div className="flex flex-col gap-3 border-b border-stroke px-6 py-5 dark:border-dark-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-dark dark:text-white">
              All Users
            </h2>

            <p className="mt-1 text-body-sm text-dark-5 dark:text-dark-6">
              View all users in your admin panel.
            </p>
          </div>

          <div className="text-body-sm font-medium text-dark-5 dark:text-dark-6">
            Total Users:{" "}
            <span className="text-dark dark:text-white">
              {users.length}
            </span>
          </div>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="flex min-h-60 items-center justify-center px-6 py-10">
            <p className="text-body-sm text-dark-5 dark:text-dark-6">
              Loading users...
            </p>
          </div>
        )}

        {/* Error */}
        {isError && (
          <div className="flex min-h-60 items-center justify-center px-6 py-10">
            <p className="text-body-sm text-red">
              Failed to load users.
            </p>
          </div>
        )}

        {/* Empty */}
        {!isLoading && !isError && users.length === 0 && (
          <div className="flex min-h-60 items-center justify-center px-6 py-10">
            <p className="text-body-sm text-dark-5 dark:text-dark-6">
              No users found.
            </p>
          </div>
        )}

        {/* Users table */}
        {!isLoading && !isError && users.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full min-w-200">
              <thead>
                <tr className="border-b border-stroke dark:border-dark-3">
                  <th className="px-6 py-4 text-left text-body-sm font-medium text-dark-5 dark:text-dark-6">
                    User
                  </th>

                  <th className="px-6 py-4 text-left text-body-sm font-medium text-dark-5 dark:text-dark-6">
                    Email
                  </th>

                  <th className="px-6 py-4 text-left text-body-sm font-medium text-dark-5 dark:text-dark-6">
                    Role
                  </th>

                  <th className="px-6 py-4 text-left text-body-sm font-medium text-dark-5 dark:text-dark-6">
                    Phone
                  </th>

                  <th className="px-6 py-4 text-left text-body-sm font-medium text-dark-5 dark:text-dark-6">
                    Created
                  </th>

                  <th className="px-6 py-4 text-left text-body-sm font-medium text-dark-5 dark:text-dark-6">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-stroke last:border-b-0 hover:bg-gray-1 dark:border-dark-3 dark:hover:bg-dark-2"
                  >
                    {/* User */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {user.profileImage ? (
                          <img
                            src={user.profileImage}
                            alt={user.name}
                            className="size-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-[40px] h-[40px] flex items-center justify-center rounded-full bg-gray-2 font-medium text-dark dark:bg-dark-2 dark:text-white">
                            {user.name
                              .charAt(0)
                              .toUpperCase()}
                          </div>
                        )}

                        <div className="min-w-0">
                          <p className="truncate font-medium text-dark dark:text-white">
                            {user.name}
                          </p>

                          <p className="mt-0.5 truncate text-body-xs text-dark-5 dark:text-dark-6">
                            ID: {user.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="px-6 py-4 text-body-sm text-dark dark:text-dark-7">
                      {user.email}
                    </td>

                    {/* Role */}
                    <td className="px-6 py-4">
                      <span
                        className="
                          inline-flex rounded-full
                          bg-gray-2 px-3 py-1
                          text-body-xs font-medium
                          capitalize text-dark
                          dark:bg-dark-2 dark:text-white
                        "
                      >
                        {user.role.replace("-", " ")}
                      </span>
                    </td>

                    {/* Phone */}
                    <td className="px-6 py-4 text-body-sm text-dark dark:text-dark-7">
                      {user.phoneNumber || "—"}
                    </td>

                    {/* Created */}
                    <td className="px-6 py-4 text-body-sm text-dark-5 dark:text-dark-6">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>

                    {/* Action */}
                    <td className="px-6 py-4">
                      {user.role !== "super-admin" ? (
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/users/manage-user?id=${user.id}`}
                            className="inline-flex rounded-lg bg-primary px-4 py-2 text-body-sm font-medium text-white transition hover:bg-opacity-90"
                          >
                            Manage
                          </Link>

                          <button
                            type="button"
                            onClick={() => handleDeleteUser(user.id, user.name)}
                            disabled={isDeleting}
                            className="inline-flex rounded-lg bg-red px-4 py-2 text-body-sm font-medium text-white transition hover:bg-opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {isDeleting ? "Deleting..." : "Delete"}
                          </button>
                        </div>
                      ) : (
                        <span className="text-body-sm text-dark-5 dark:text-dark-6">
                          -
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>  
            </table>
          </div>
        )}
      </div>
    </div>
  );
}