"use client";

import Link from "next/link";

import { useGetUsersQuery } from "@/services/api/authApi";

export default function Page() {
  const { data, isLoading, isError } = useGetUsersQuery();

  const writers = data?.users?.filter((user) => user.isWriter) ?? [];

  if (isLoading) {
    return <div>Loading writers...</div>;
  }

  if (isError) {
    return <div>Failed to load writers.</div>;
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-dark dark:text-white">
            All Writers
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage users who have writer access.
          </p>
        </div>

        <Link
          href="/users/create-user"
          className="rounded-lg bg-primary px-5 py-2.5 font-medium text-white hover:bg-opacity-90"
        >
          Create Writer
        </Link>
      </div>

      <div className="overflow-hidden rounded-lg border border-stroke bg-white dark:border-dark-3 dark:bg-gray-dark">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="border-b border-stroke dark:border-dark-3">
                <th className="px-6 py-4 text-left text-sm font-medium text-dark dark:text-white">
                  Name
                </th>

                <th className="px-6 py-4 text-left text-sm font-medium text-dark dark:text-white">
                  Email
                </th>

                <th className="px-6 py-4 text-left text-sm font-medium text-dark dark:text-white">
                  Role
                </th>

                <th className="px-6 py-4 text-left text-sm font-medium text-dark dark:text-white">
                  Writer Access
                </th>

                <th className="px-6 py-4 text-left text-sm font-medium text-dark dark:text-white">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {writers.length > 0 ? (
                writers.map((writer) => (
                  <tr
                    key={writer.id}
                    className="border-b border-stroke last:border-0 dark:border-dark-3"
                  >
                    <td className="px-6 py-4 text-sm text-dark dark:text-white">
                      {writer.name}
                    </td>

                    <td className="px-6 py-4 text-sm text-dark-4">
                      {writer.email}
                    </td>

                    <td className="px-6 py-4 text-sm capitalize text-dark dark:text-white">
                      {writer.role}
                    </td>

                    <td className="px-6 py-4">
                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                        Writer
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <Link
                        href={`/users/manage-user?id=${writer.id}`}
                        className="text-sm font-medium text-primary hover:underline"
                      >
                        Manage Writer
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-10 text-center text-sm text-gray-500"
                  >
                    No writers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

