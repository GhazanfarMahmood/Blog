
"use client";

import Link from "next/link";
import { FileText, ArrowRight } from "lucide-react";
import { useGetBlogsQuery } from "@/services/api/blogApi";

export function RecentBlogPosts() {
  const { data, isLoading, isError } = useGetBlogsQuery({
    page: 1,
    limit: 5,
  });

  const blogs = data?.blogs ?? [];

  return (
    <div className="rounded-[10px] border border-stroke bg-white p-5 shadow-1 dark:border-dark-3 dark:bg-gray-dark sm:p-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-dark dark:text-white">
            Recent Blog Posts
          </h2>
          <p className="mt-1 text-sm text-dark-6">
            Your latest blog content
          </p>
        </div>

        <Link
          href="/posts"
          className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          View all <ArrowRight size={16} />
        </Link>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((item) => (
            <div
              key={item}
              className="h-14 animate-pulse rounded-md bg-gray-2 dark:bg-dark-2"
            />
          ))}
        </div>
      ) : isError ? (
        <p className="py-8 text-center text-sm text-red-500">
          Failed to load recent blog posts.
        </p>
      ) : blogs.length === 0 ? (
        <div className="py-10 text-center">
          <FileText className="mx-auto mb-3 text-dark-6" size={30} />
          <p className="text-sm text-dark-6">
            No blog posts found.
          </p>
        </div>
      ) : (
        <div className="space-y-1">
          {blogs.map((blog: any) => (
            <Link
              key={blog._id}
              href={`/posts/${blog._id}/edit`}
              className="flex items-center justify-between gap-4 rounded-lg p-3 transition hover:bg-gray-1 dark:hover:bg-dark-2"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-dark dark:text-white">
                  {blog.title}
                </p>
                <p className="mt-1 text-xs text-dark-6">
                  Updated{" "}
                  {blog.updatedAt
                    ? new Date(blog.updatedAt).toLocaleDateString()
                    : "—"}
                </p>
              </div>

              <span
                className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${
                  blog.isPublished
                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                    : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                }`}
              >
                {blog.isPublished ? "Published" : "Draft"}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
