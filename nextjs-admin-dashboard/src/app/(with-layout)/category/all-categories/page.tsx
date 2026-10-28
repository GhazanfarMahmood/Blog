"use client";

import Link from "next/link";

import {
    useDeleteCategoryMutation,
    useGetCategoriesQuery,
} from "@/services/api/categoryApi";

export default function Page() {
    const {
        data: categories = [],
        isLoading,
        isError,
    } = useGetCategoriesQuery();

    const [deleteCategory, { isLoading: isDeleting }] =
        useDeleteCategoryMutation();

    const handleDelete = async (id: string) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this category?"
        );

        if (!confirmed) return;

        try {
            await deleteCategory(id).unwrap();
        } catch (error: any) {
            console.error(
                error?.data?.message || "Failed to delete category"
            );
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-dark dark:text-white">
                        All Categories
                    </h1>

                    <p className="mt-1 text-sm text-dark-5 dark:text-dark-6">
                        Manage all categories of your blog.
                    </p>
                </div>

                <Link
                    href="/category/create-category"
                    className="inline-flex w-fit items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
                >
                    + Create Category
                </Link>
            </div>

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-dark-5 dark:text-dark-6">
                <Link
                    href="/"
                    className="transition hover:text-primary"
                >
                    Dashboard
                </Link>

                <span>/</span>

                <span className="text-dark dark:text-white">
                    Categories
                </span>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-xl border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark">
                <div className="border-b border-stroke px-6 py-5 dark:border-dark-3">
                    <h2 className="text-lg font-semibold text-dark dark:text-white">
                        Categories
                    </h2>

                    <p className="mt-1 text-sm text-dark-5 dark:text-dark-6">
                        View and manage your blog categories.
                    </p>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[900px] text-left text-sm">
                        <thead>
                            <tr className="border-b border-stroke dark:border-dark-3">
                                <th className="px-6 py-4 font-medium text-dark dark:text-white">
                                    Image
                                </th>

                                <th className="px-6 py-4 font-medium text-dark dark:text-white">
                                    Category
                                </th>

                                <th className="px-6 py-4 font-medium text-dark dark:text-white">
                                    Slug
                                </th>

                                <th className="px-6 py-4 font-medium text-dark dark:text-white">
                                    Status
                                </th>

                                <th className="px-6 py-4 font-medium text-dark dark:text-white">
                                    Created
                                </th>

                                <th className="px-6 py-4 text-right font-medium text-dark dark:text-white">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {isLoading && (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="px-6 py-12 text-center text-dark-5"
                                    >
                                        Loading categories...
                                    </td>
                                </tr>
                            )}

                            {isError && (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="px-6 py-12 text-center text-red-500"
                                    >
                                        Failed to load categories.
                                    </td>
                                </tr>
                            )}

                            {!isLoading &&
                                !isError &&
                                categories.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={6}
                                            className="px-6 py-12 text-center text-dark-5"
                                        >
                                            No categories found.
                                        </td>
                                    </tr>
                                )}

                            {!isLoading &&
                                !isError &&
                                categories.map((category) => (
                                    <tr
                                        key={category._id}
                                        className="border-b border-stroke last:border-b-0 dark:border-dark-3"
                                    >
                                        <td className="px-6 py-4">
                                            <img
                                                src={category.image}
                                                alt={category.categoryName}
                                                className="h-12 w-16 rounded-md object-cover"
                                            />
                                        </td>

                                        <td className="px-6 py-4 font-medium text-dark dark:text-white">
                                            {category.categoryName}
                                        </td>

                                        <td className="px-6 py-4 text-dark-5 dark:text-dark-6">
                                            {category.slug}
                                        </td>

                                        <td className="px-6 py-4">
                                            <span
                                                className={
                                                    category.isPublished
                                                        ? "rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700"
                                                        : "rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600"
                                                }
                                            >
                                                {category.isPublished
                                                    ? "Published"
                                                    : "Draft"}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4 text-dark-5 dark:text-dark-6">
                                            {new Date(
                                                category.createdAt
                                            ).toLocaleDateString()}
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="flex justify-end gap-2">
                                                <Link
                                                    href={`/category/edit-category?id=${category._id}`}
                                                    className="rounded-md border border-stroke px-3 py-1.5 text-sm transition hover:border-primary hover:text-primary dark:border-dark-3"
                                                >
                                                    Edit
                                                </Link>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleDelete(
                                                            category._id
                                                        )
                                                    }
                                                    disabled={isDeleting}
                                                    className="rounded-md border border-stroke px-3 py-1.5 text-sm text-red-500 transition hover:border-red-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-dark-3"
                                                >
                                                    {isDeleting
                                                        ? "Deleting..."
                                                        : "Delete"}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}