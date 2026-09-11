"use client";

import Link from "next/link";
import { useState } from "react";
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    type ColumnDef,
} from "@tanstack/react-table";

import { useGetBlogsQuery } from "@/services/api/blogApi.ts";
import type { BlogContentType } from "@/@types/blog-type";

export default function Page() {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    const { data, isLoading, isFetching, isError } = useGetBlogsQuery({
        page,
        limit,
    });

    const columns: ColumnDef<BlogContentType>[] = [
        {
            accessorKey: "title",
            header: "Post",
            cell: ({ row }) => (
                <div className="flex items-center gap-3">
                    <img
                        src={row.original.thumbnail}
                        alt={row.original.title}
                        className="h-10 w-14 rounded object-cover"
                    />

                    <div className="min-w-0">
                        <p className="truncate font-medium text-dark dark:text-white">
                            {row.original.title}
                        </p>

                        <p className="text-xs text-gray-500">
                            {row.original.slug}
                        </p>
                    </div>
                </div>
            ),
        },
        {
            accessorKey: "author",
            header: "Author",
            cell: ({ row }) => row.original.author?.name ?? "—",
        },
        {
            accessorKey: "category",
            header: "Category",
            cell: ({ row }) => (
                <div className="flex flex-wrap gap-1">
                    {row.original.category?.map((category) => (
                        <span
                            key={category._id}
                            className="rounded bg-gray-100 px-2 py-1 text-xs dark:bg-gray-800"
                        >
                            {category.name}
                        </span>
                    ))}
                </div> 
            ),
        },
        {
            accessorKey: "isPublished",
            header: "Status",
            cell: ({ row }) => (
                <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                        row.original.isPublished
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                    }`}
                >
                    {row.original.isPublished ? "Published" : "Draft"}
                </span>
            ),
        },
        {
            accessorKey: "isFeatured",
            header: "Featured",
            cell: ({ row }) =>
                row.original.isFeatured ? (
                    <span className="text-green-600">Yes</span>
                ) : (
                    <span className="text-gray-400">No</span>
                ),
        },
        {
            accessorKey: "createdAt",
            header: "Created",
            cell: ({ row }) =>
                new Date(row.original.createdAt).toLocaleDateString(),
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <Link
                        href={`/posts/edit-post?id=${row.original._id}`}
                        className="rounded-md border px-3 py-1.5 text-sm"
                    >
                        Edit
                    </Link>

                    <button
                        type="button"
                        className="rounded-md border px-3 py-1.5 text-sm text-red-500"
                    >
                        Delete
                    </button>
                </div>
            ),
        },
    ];

    const table = useReactTable({
        data: data?.blogs ?? [],
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    if (isLoading) {
        return (
            <div className="p-6">
                <p>Loading posts...</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="p-6">
                <p className="text-red-500">
                    Failed to load posts.
                </p>
            </div>
        );
    }

    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-dark dark:text-white">
                        All Posts
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Manage all blog posts from here.
                    </p>
                </div>

                <Link
                    href="/posts/create-post"
                    className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white"
                >
                    Create Post
                </Link>
            </div>

            {/* Table container */}
            <div className="rounded-lg border border-stroke bg-white dark:border-dark-3 dark:bg-gray-dark">
                {/* Table top */}
                <div className="flex items-center justify-between border-b border-stroke px-5 py-4 dark:border-dark-3">
                    <div>
                        <h2 className="font-medium text-dark dark:text-white">
                            Posts
                        </h2>

                        <p className="text-sm text-gray-500">
                            {data?.totalBlogs ?? 0} total posts
                        </p>
                    </div>

                    <select
                        value={limit}
                        onChange={(event) => {
                            setLimit(Number(event.target.value));
                            setPage(1);
                        }}
                        className="rounded-md border border-stroke px-3 py-2 text-sm dark:border-dark-3 dark:bg-gray-dark"
                    >
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={25}>25</option>
                    </select>
                </div>

                {/* Fetching indicator */}
                {isFetching && (
                    <div className="px-5 py-2 text-xs text-gray-500">
                        Updating posts...
                    </div>
                )}

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <tr
                                    key={headerGroup.id}
                                    className="border-b border-stroke dark:border-dark-3"
                                >
                                    {headerGroup.headers.map((header) => (
                                        <th
                                            key={header.id}
                                            className="whitespace-nowrap px-5 py-4 font-medium text-dark dark:text-white"
                                        >
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext(),
                                            )}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>

                        <tbody>
                            {table.getRowModel().rows.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={columns.length}
                                        className="px-5 py-10 text-center text-gray-500"
                                    >
                                        No posts found.
                                    </td>
                                </tr>
                            ) : (
                                table.getRowModel().rows.map((row) => (
                                    <tr
                                        key={row.id}
                                        className="border-b border-stroke last:border-0 dark:border-dark-3"
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <td
                                                key={cell.id}
                                                className="px-5 py-4 text-dark dark:text-white"
                                            >
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext(),
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between border-t border-stroke px-5 py-4 dark:border-dark-3">
                    <p className="text-sm text-gray-500">
                        Page {data?.currentPage ?? page} of{" "}
                        {data?.totalPages ?? 1}
                    </p>

                    <div className="flex gap-2">
                        <button
                            type="button"
                            disabled={!data?.hasPrevPage}
                            onClick={() => setPage((prev) => prev - 1)}
                            className="rounded-md border px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Previous
                        </button>

                        <button
                            type="button"
                            disabled={!data?.hasNextPage}
                            onClick={() => setPage((prev) => prev + 1)}
                            className="rounded-md border px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}