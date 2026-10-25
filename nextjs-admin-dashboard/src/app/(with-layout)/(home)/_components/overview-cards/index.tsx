"use client";

import type { ElementType } from "react";
import {
  FileText,
  Users,
  MessageSquare,
  Mail,
} from "lucide-react";

import { useGetBlogsQuery } from "@/services/api/blogApi";
import { useGetUsersQuery } from "@/services/api/authApi";
import { useGetAllCommentsQuery } from "@/services/api/commentApi";
import { useGetAllSubscribersQuery } from "@/services/api/newsletterApi";

type OverviewCardProps = {
  title: string;
  value: number | string;
  icon: ElementType;
};

function OverviewCard({
  title,
  value,
  icon: Icon,
}: OverviewCardProps) {
  return (
    <div className="rounded-[10px] border border-stroke bg-white p-6 shadow-1 dark:border-dark-3 dark:bg-gray-dark">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-dark-6">
          {title}
        </h3>

        <Icon size={22} className="text-primary" />
      </div>

      <h2 className="mt-4 text-3xl font-bold text-dark dark:text-white">
        {value}
      </h2>
    </div>
  );
}

export function OverviewCardsGroup() {
  const { data: blogsData, isLoading: blogsLoading } =
    useGetBlogsQuery({ page: 1, limit: 10000 });

  const { data: usersData, isLoading: usersLoading } =
    useGetUsersQuery();

  const { data: commentsData, isLoading: commentsLoading } =
    useGetAllCommentsQuery();

  const { data: newsletterData, isLoading: newsletterLoading } =
    useGetAllSubscribersQuery();

  const cards = [
    {
      title: "Total Blogs",
      value: blogsLoading ? "..." : (blogsData?.blogs.length ?? 0),
      icon: FileText,
    },
    {
      title: "Total Users",
      value: usersLoading ? "..." : (usersData?.users.length ?? "—"),
      icon: Users,
    },
    {
      title: "Total Comments",
      value: commentsLoading ? "..." : (commentsData?.length ?? "—"),
      icon: MessageSquare,
    },
    {
      title: "Newsletter Subscribers",
      value: newsletterLoading ? "..." : (newsletterData?.total ?? "—"),
      icon: Mail,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4 2xl:gap-7.5">
      {cards.map((card) => (
        <OverviewCard
          key={card.title}
          title={card.title}
          value={card.value}
          icon={card.icon}
        />
      ))}
    </div>
  );
}