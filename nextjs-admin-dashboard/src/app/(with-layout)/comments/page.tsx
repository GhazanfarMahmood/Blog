
"use client";

import { useState } from "react";
import {
  MessageSquare,
  CheckCircle2,
  Clock3,
  RefreshCw,
  AlertCircle,
} from "lucide-react";

import {
  useGetAllCommentsQuery,
  useApproveCommentMutation,
  useUnapproveCommentMutation,
  useDeleteCommentMutation,
} from "@/services/api/commentApi";

import CommentsTable from "./_components/comments-table";

export default function Page() {
  const {
    data: comments = [],
    isLoading,
    isError,
    refetch,
  } = useGetAllCommentsQuery();

  const [approveComment, { isLoading: isApproving }] =
    useApproveCommentMutation();

  const [unapproveComment, { isLoading: isUnapproving }] =
    useUnapproveCommentMutation();

  const [deleteComment, { isLoading: isDeleting }] =
    useDeleteCommentMutation();

  const [notice, setNotice] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const isProcessing = isApproving || isUnapproving || isDeleting;

  const approvedCount = comments.filter(
    (comment) => comment.isApproved,
  ).length;

  const pendingCount = comments.length - approvedCount;

  const handleApprove = async (id: string) => {
    setNotice(null);

    try {
      await approveComment(id).unwrap();

      setNotice({
        type: "success",
        message: "Comment approved successfully.",
      });
    } catch {
      setNotice({
        type: "error",
        message: "Unable to approve this comment. Please try again.",
      });
    }
  };

  const handleUnapprove = async (id: string) => {
    setNotice(null);

    try {
      await unapproveComment(id).unwrap();

      setNotice({
        type: "success",
        message: "Comment approval removed successfully.",
      });
    } catch {
      setNotice({
        type: "error",
        message: "Unable to update this comment. Please try again.",
      });
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this comment? This action cannot be undone.",
    );

    if (!confirmed) return;

    setNotice(null);

    try {
      await deleteComment(id).unwrap();

      setNotice({
        type: "success",
        message: "Comment deleted successfully.",
      });
    } catch {
      setNotice({
        type: "error",
        message: "Unable to delete this comment. Please try again.",
      });
    }
  };

  const handleRefresh = async () => {
    setNotice(null);

    try {
      await refetch().unwrap();

      setNotice({
        type: "success",
        message: "Comments refreshed successfully.",
      });
    } catch {
      setNotice({
        type: "error",
        message: "Unable to refresh comments. Please try again.",
      });
    }
  };

  const stats = [
    {
      label: "Total Comments",
      value: comments.length,
      icon: MessageSquare,
      iconClass:
        "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
    },
    {
      label: "Approved Comments",
      value: approvedCount,
      icon: CheckCircle2,
      iconClass:
        "bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400",
    },
    {
      label: "Pending Comments",
      value: pendingCount,
      icon: Clock3,
      iconClass:
        "bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
    },
  ];

  return (
    <main className="min-h-full space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Page heading */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Comments
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Review, approve, and manage comments submitted by readers.
          </p>
        </div>

        <button
          type="button"
          onClick={() => void handleRefresh()}
          disabled={isLoading}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
        >
          <RefreshCw
            className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
          />
          Refresh
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {stat.label}
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
                    {isLoading ? "—" : stat.value}
                  </p>
                </div>

                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.iconClass}`}
                >
                  <Icon className="h-5 w-5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action feedback */}
      {notice && (
        <div
          role="status"
          className={`flex items-start gap-3 rounded-lg border px-4 py-3 text-sm ${
            notice.type === "success"
              ? "border-green-200 bg-green-50 text-green-800 dark:border-green-900 dark:bg-green-950/30 dark:text-green-300"
              : "border-red-200 bg-red-50 text-red-800 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300"
          }`}
        >
          {notice.type === "success" ? (
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
          ) : (
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          )}

          <p className="flex-1">{notice.message}</p>

          <button
            type="button"
            onClick={() => setNotice(null)}
            aria-label="Dismiss notification"
            className="text-current opacity-70 hover:opacity-100"
          >
            ×
          </button>
        </div>
      )}

      {/* Comments table */}
      <section className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <div className="flex flex-col gap-1 border-b border-gray-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between dark:border-gray-800">
          <div>
            <h2 className="font-semibold text-gray-900 dark:text-white">
              All Comments
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Manage comment moderation and publication status.
            </p>
          </div>

          {!isLoading && !isError && (
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {comments.length}{" "}
              {comments.length === 1 ? "comment" : "comments"}
            </span>
          )}
        </div>

        {isLoading ? (
          <div
            role="status"
            className="flex flex-col items-center justify-center px-5 py-16"
          >
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-blue-600 dark:border-gray-700 dark:border-t-blue-400" />
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              Loading comments...
            </p>
          </div>
        ) : isError ? (
          <div className="flex flex-col items-center justify-center px-5 py-16 text-center">
            <AlertCircle className="h-10 w-10 text-red-500" />

            <h3 className="mt-3 font-medium text-gray-900 dark:text-white">
              Failed to load comments
            </h3>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Check your connection and try loading the comments again.
            </p>

            <button
              type="button"
              onClick={() => void refetch()}
              className="mt-4 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
            >
              Try again
            </button>
          </div>
        ) : (
          <CommentsTable
            comments={comments}
            onApprove={handleApprove}
            onUnapprove={handleUnapprove}
            onDelete={handleDelete}
            isProcessing={isProcessing}
          />
        )}
      </section>
    </main>
  );
}
