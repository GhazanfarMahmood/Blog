
"use client";

import Link from "next/link";
import {
  MessageSquare,
  Mail,
  ArrowRight,
  ClipboardCheck,
} from "lucide-react";

import { useGetPendingCommentsCountQuery } from "@/services/api/commentApi";
import { useGetContactStatsQuery } from "@/services/api/contactApi";

export function PendingActions() {
  const {
    data: commentsData,
    isLoading: commentsLoading,
    isError: commentsError,
  } = useGetPendingCommentsCountQuery();

  const {
    data: contactsData,
    isLoading: contactsLoading,
    isError: contactsError,
  } = useGetContactStatsQuery();

  const pendingComments = commentsData?.total ?? 0;
  const newMessages = contactsData?.newMessages ?? 0;

  const isLoading = commentsLoading || contactsLoading;
  const isError = commentsError || contactsError;

  const totalPending = pendingComments + newMessages;

  const actions = [
    {
      title: "Comments awaiting approval",
      description: "Review and moderate submitted comments",
      count: commentsLoading
        ? "..."
        : commentsError
          ? "Unavailable"
          : pendingComments,
      href: "/comments",
      icon: MessageSquare,
    },
    {
      title: "New contact messages",
      description: "Review messages from your visitors",
      count: contactsLoading
        ? "..."
        : contactsError
          ? "Unavailable"
          : newMessages,
      href: "/contact",
      icon: Mail,
    },
  ];

  return (
    <div className="rounded-[10px] border border-stroke bg-white p-5 shadow-1 dark:border-dark-3 dark:bg-gray-dark sm:p-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-dark dark:text-white">
            Pending Actions
          </h2>
          <p className="mt-1 text-sm text-dark-6">
            Tasks that need your attention
          </p>
        </div>

        <ClipboardCheck className="text-primary" size={23} />
      </div>

      <div className="mb-5 rounded-lg bg-gray-1 p-4 dark:bg-dark-2">
        <p className="text-sm text-dark-6">
          Total items requiring attention
        </p>

        <p className="mt-1 text-2xl font-bold text-dark dark:text-white">
          {isLoading
            ? "..."
            : isError
              ? "Unavailable"
              : totalPending}
        </p>
      </div>

      <div className="space-y-3">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.title}
              href={action.href}
              className="flex items-center gap-3 rounded-lg border border-stroke p-4 transition hover:border-primary dark:border-dark-3"
            >
              <div className="rounded-lg bg-primary/10 p-3 text-primary">
                <Icon size={21} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-dark dark:text-white">
                  {action.title}
                </p>

                <p className="mt-1 text-xs text-dark-6">
                  {action.description}
                </p>
              </div>

              <div className="text-right">
                <p className="text-lg font-semibold text-dark dark:text-white">
                  {action.count}
                </p>

                <ArrowRight
                  size={15}
                  className="ml-auto text-dark-6"
                />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
