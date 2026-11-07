
"use client";

import { useMemo, useState } from "react";
import {
  Search,
  Users,
  Mail,
  CalendarDays,
  Copy,
  Check,
  RefreshCw,
  ArrowUpDown,
  Inbox,
  X,
  Send,
  AlertCircle,
  CheckCircle2,
  Trash2,
} from "lucide-react";

import {
  useGetAllSubscribersQuery,
  useSendNewsletterMutation,
  useDeleteNewsletterSubscriberMutation,
} from "@/services/api/newsletterApi";

type SortOption = "newest" | "oldest" | "email";

type SendResult = {
  message: string;
  total: number;
  sent: number;
  failed: number;
};

export default function Page() {
  const { data, isLoading, isError, isFetching, refetch } =
    useGetAllSubscribersQuery();

  const [sendNewsletter, { isLoading: isSending }] =
    useSendNewsletterMutation();

    const [
    deleteNewsletterSubscriber,
    { isLoading: isDeleting },
    ] = useDeleteNewsletterSubscriberMutation();

    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [deleteError, setDeleteError] = useState("");  

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [sendResult, setSendResult] = useState<SendResult | null>(null);
  const [sendError, setSendError] = useState("");

  const subscribers = data?.subscribers ?? [];

  const filteredSubscribers = useMemo(() => {
    const filtered = subscribers.filter((subscriber) =>
      subscriber.email.toLowerCase().includes(search.trim().toLowerCase())
    );

    return [...filtered].sort((a, b) => {
      if (sortBy === "email") {
        return a.email.localeCompare(b.email);
      }

      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();

      return sortBy === "newest" ? dateB - dateA : dateA - dateB;
    });
  }, [subscribers, search, sortBy]);

  const recentSubscribers = subscribers.filter((subscriber) => {
    const createdAt = new Date(subscriber.createdAt).getTime();
    const now = Date.now();
    const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000;

    return (
      Number.isFinite(createdAt) &&
      createdAt >= sevenDaysAgo &&
      createdAt <= now
    );
  }).length;

  async function copyEmail(email: string, id: string) {
    try {
      await navigator.clipboard.writeText(email);
      setCopiedId(id);

      window.setTimeout(() => {
        setCopiedId((current) => (current === id ? null : current));
      }, 1800);
    } catch {
      window.prompt("Copy this email address:", email);
    }
  }

  function formatDate(date: string) {
    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Unknown date";
    }

    return new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(parsedDate);
  }

  async function handleSendNewsletter(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setSendError("");
    setSendResult(null);

    const trimmedSubject = subject.trim();
    const trimmedContent = content.trim();

    if (!trimmedSubject || !trimmedContent) {
      setSendError("Please enter both subject and content.");
      return;
    }

    if (trimmedSubject.length > 200) {
      setSendError("Subject cannot exceed 200 characters.");
      return;
    }

    if (trimmedContent.length > 20000) {
      setSendError("Content cannot exceed 20000 characters.");
      return;
    }

    if (subscribers.length === 0) {
      setSendError("There are no subscribers to send this newsletter to.");
      return;
    }

    const confirmed = window.confirm(
      `Send this newsletter to all ${subscribers.length} subscribers?`
    );

    if (!confirmed) return;

    try {
      const response = await sendNewsletter({
        subject: trimmedSubject,
        content: trimmedContent,
      }).unwrap();

      setSendResult({
        message: response.message,
        total: response.total,
        sent: response.sent,
        failed: response.failed,
      });

      if (response.failed === 0) {
        setSubject("");
        setContent("");
      }
    } catch (error: unknown) {
      console.error("Send newsletter error:", error);

      let message = "Unable to send newsletter. Please try again.";

      if (error && typeof error === "object" && "data" in error) {
        const data = error.data;

        if (
          data &&
          typeof data === "object" &&
          "message" in data &&
          typeof data.message === "string"
        ) {
          message = data.message;
        }
      }

      setSendError(message);
    }
  }

  async function handleDeleteSubscriber(id: string, email: string) {
    const confirmed = window.confirm(
        `Are you sure you want to delete "${email}" from your newsletter subscribers?`
    );

    if (!confirmed) return;

    setDeleteError("");
    setDeletingId(id);

    try {
        await deleteNewsletterSubscriber(id).unwrap();
    } catch (error: unknown) {
        console.error("Delete subscriber error:", error);

        let message = "Failed to delete subscriber. Please try again.";

        if (error && typeof error === "object" && "data" in error) {
        const data = error.data;

        if (
            data &&
            typeof data === "object" &&
            "message" in data &&
            typeof data.message === "string"
        ) {
            message = data.message;
        }
        }

        setDeleteError(message);
    } finally {
        setDeletingId(null);
    }
    }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-slate-50 p-5 sm:p-8">
        <div className="mx-auto max-w-7xl animate-pulse space-y-6">
          <div className="h-8 w-64 rounded-lg bg-slate-200" />
          <div className="grid gap-4 sm:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-32 rounded-2xl border border-slate-200 bg-white"
              />
            ))}
          </div>
          <div className="h-64 rounded-2xl border border-slate-200 bg-white" />
          <div className="h-80 rounded-2xl border border-slate-200 bg-white" />
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-slate-50 p-6">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600">
            <Mail size={25} />
          </div>

          <h2 className="text-xl font-bold text-slate-900">
            Unable to load subscribers
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Something went wrong while fetching your newsletter subscribers.
            Please try again.
          </p>

          <button
            onClick={() => refetch()}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            <RefreshCw size={16} />
            Try again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50/80 px-4 py-6 text-slate-900 sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-7">

        {/* Page heading */}
        <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-500">
              <span>Dashboard</span>
              <span>/</span>
              <span className="text-slate-800">Newsletter</span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Newsletter management
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Manage subscribers and send newsletters to your audience.
            </p>
          </div>

          <button
            onClick={() => refetch()}
            disabled={isFetching}
            className="inline-flex w-fit items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold shadow-sm transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCw
              size={16}
              className={isFetching ? "animate-spin" : ""}
            />
            Refresh
          </button>
        </header>

        {/* Statistics */}
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <StatCard
            title="Total subscribers"
            value={data?.total ?? subscribers.length}
            description="All registered email subscribers"
            icon={<Users size={21} />}
            iconClass="bg-indigo-50 text-indigo-600"
          />

          <StatCard
            title="New this week"
            value={recentSubscribers}
            description="Subscriptions in the last 7 days"
            icon={<CalendarDays size={21} />}
            iconClass="bg-emerald-50 text-emerald-600"
          />

          <StatCard
            title="Matching results"
            value={filteredSubscribers.length}
            description={
              search
                ? "Subscribers matching your search"
                : "Currently displayed subscribers"
            }
            icon={<Mail size={21} />}
            iconClass="bg-amber-50 text-amber-600"
          />
        </section>

        {/* Newsletter composer */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <Send size={21} />
              </div>

              <div>
                <h2 className="text-lg font-bold">
                  Send newsletter
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Compose an email for all newsletter subscribers.
                </p>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSendNewsletter}
            className="space-y-5 p-5 sm:p-6"
          >
            <div>
              <label
                htmlFor="newsletter-subject"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Email subject
              </label>

              <input
                id="newsletter-subject"
                type="text"
                value={subject}
                onChange={(event) => setSubject(event.target.value)}
                placeholder="Enter newsletter subject..."
                maxLength={200}
                required
                disabled={isSending}
                className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50 disabled:opacity-60"
              />

              <p className="mt-2 text-right text-xs text-slate-400">
                {subject.length}/200
              </p>
            </div>

            <div>
              <label
                htmlFor="newsletter-content"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Newsletter content
              </label>

              <textarea
                id="newsletter-content"
                value={content}
                onChange={(event) => setContent(event.target.value)}
                placeholder="Write your newsletter message..."
                rows={8}
                maxLength={20000}
                required
                disabled={isSending}
                className="w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-7 outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50 disabled:opacity-60"
              />

              <div className="mt-2 flex items-center justify-between gap-3 text-xs text-slate-400">
                <span>Line breaks will be preserved in the email.</span>
                <span>{content.length}/20000</span>
              </div>
            </div>

            {sendError && (
              <div
                role="alert"
                className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
              >
                <AlertCircle size={18} className="mt-0.5 shrink-0" />
                <span>{sendError}</span>
              </div>
            )}

            {sendResult && (
              <div
                role="status"
                className={`rounded-xl border p-4 text-sm ${
                  sendResult.failed === 0
                    ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                    : "border-amber-200 bg-amber-50 text-amber-800"
                }`}
              >
                <div className="flex items-center gap-2 font-semibold">
                  <CheckCircle2 size={18} />
                  {sendResult.message}
                </div>

                <p className="mt-2">
                  Total: {sendResult.total} | Accepted: {sendResult.sent} |
                  Failed: {sendResult.failed}
                </p>
                <p className="mt-1 text-xs">
                  Accepted means Brevo accepted the email request,
                  not necessarily that the email was delivered.
                </p>
              </div>
            )}

            <div className="flex flex-col justify-between gap-4 border-t border-slate-100 pt-5 sm:flex-row sm:items-center">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Users size={17} />
                Recipients:
                <span className="font-semibold text-slate-800">
                  {subscribers.length}
                </span>
              </div>

              <button
                type="submit"
                disabled={
                  isSending ||
                  subscribers.length === 0 ||
                  !subject.trim() ||
                  !content.trim()
                }
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSending ? (
                  <>
                    <RefreshCw size={17} className="animate-spin" />
                    Sending newsletter...
                  </>
                ) : (
                  <>
                    <Send size={17} />
                    Send newsletter
                  </>
                )}
              </button>
            </div>
          </form>
        </section>

        {deleteError && (
            <div
                role="alert"
                className="flex items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
            >
                <span>{deleteError}</span>

                <button
                type="button"
                onClick={() => setDeleteError("")}
                aria-label="Dismiss error"
                className="shrink-0 hover:text-red-900"
                >
                <X size={18} />
                </button>
            </div>
        )}

        {/* Subscriber list */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-lg font-bold">All subscribers</h2>
              <p className="mt-1 text-sm text-slate-500">
                Browse your subscribed email addresses.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative min-w-0 sm:w-72">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search by email..."
                  aria-label="Search subscribers by email"
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-10 text-sm outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
                />

                {search && (
                  <button
                    onClick={() => setSearch("")}
                    aria-label="Clear search"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              <div className="relative">
                <ArrowUpDown
                  size={16}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <select
                  value={sortBy}
                  onChange={(event) =>
                    setSortBy(event.target.value as SortOption)
                  }
                  aria-label="Sort subscribers"
                  className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white pl-9 pr-9 text-sm font-medium outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50 sm:w-48"
                >
                  <option value="newest">Newest first</option>
                  <option value="oldest">Oldest first</option>
                  <option value="email">Email A-Z</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-50/70 px-5 py-3 sm:px-6">
            <p className="text-sm text-slate-500">
              Showing{" "}
              <span className="font-semibold text-slate-800">
                {filteredSubscribers.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-slate-800">
                {subscribers.length}
              </span>{" "}
              subscribers
            </p>

            {search && (
              <button
                onClick={() => setSearch("")}
                className="text-sm font-semibold text-indigo-600 hover:text-indigo-800"
              >
                Clear filters
              </button>
            )}
          </div>

          {filteredSubscribers.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
                <Inbox size={25} />
              </div>

              <h3 className="font-semibold text-slate-900">
                {search ? "No matching subscribers" : "No subscribers yet"}
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                {search
                  ? "Try another email address or clear your search."
                  : "New newsletter subscriptions will appear here."}
              </p>

              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="mt-4 rounded-lg px-4 py-2 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-50"
                >
                  Clear search
                </button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] text-left">
                <thead>
                  <tr className="border-b border-slate-100 bg-white text-xs uppercase tracking-wider text-slate-500">
                    <th className="px-5 py-4 font-semibold sm:px-6">
                      Subscriber
                    </th>
                    <th className="px-5 py-4 font-semibold">
                      Subscription date
                    </th>
                    <th className="px-5 py-4 font-semibold">Status</th>
                    <th className="px-5 py-4 text-right font-semibold sm:px-6">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {filteredSubscribers.map((subscriber) => {
                    const initial = subscriber.email
                      .trim()
                      .charAt(0)
                      .toUpperCase();

                    const isCopied = copiedId === subscriber._id;

                    return (
                      <tr
                        key={subscriber._id}
                        className="group transition-colors hover:bg-slate-50/80"
                      >
                        <td className="px-5 py-4 sm:px-6">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-sm font-bold text-indigo-700 ring-1 ring-indigo-100">
                              {initial || <Mail size={16} />}
                            </div>

                            <div className="min-w-0">
                              <p className="max-w-xs truncate text-sm font-semibold text-slate-800">
                                {subscriber.email}
                              </p>
                              <p className="mt-1 text-xs text-slate-400">
                                Newsletter member
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <CalendarDays
                              size={15}
                              className="shrink-0 text-slate-400"
                            />
                            {formatDate(subscriber.createdAt)}
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-100">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            Subscribed
                          </span>
                        </td>

                        
                        <td className="px-5 py-4 text-right sm:px-6">
                        <div className="flex items-center justify-end gap-2">
                            {/* Copy email */}
                            <button
                            type="button"
                            onClick={() =>
                                copyEmail(subscriber.email, subscriber._id)
                            }
                            title={isCopied ? "Copied" : "Copy email"}
                            aria-label={`Copy ${subscriber.email}`}
                            className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 shadow-sm transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
                            >
                            {isCopied ? (
                                <>
                                <Check size={15} />
                                Copied
                                </>
                            ) : (
                                <>
                                <Copy size={15} />
                                Copy email
                                </>
                            )}
                            </button>

                            {/* Delete subscriber */}
                            <button
                            type="button"
                            onClick={() =>
                                handleDeleteSubscriber(subscriber._id, subscriber.email)
                            }
                            disabled={isDeleting}
                            title="Delete subscriber"
                            aria-label={`Delete ${subscriber.email}`}
                            className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-200 bg-white px-3 py-2 text-xs font-semibold text-red-600 shadow-sm transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                            {deletingId === subscriber._id ? (
                                <>
                                <RefreshCw size={15} className="animate-spin" />
                                Deleting...
                                </>
                            ) : (
                                <>
                                <Trash2 size={15} />
                                Delete
                                </>
                            )}
                            </button>
                        </div>
                        </td>

                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          <div className="flex flex-col gap-2 border-t border-slate-100 bg-white px-5 py-4 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <span>Newsletter audience overview</span>
            <span>Data provided by your newsletter API</span>
          </div>
        </section>
      </div>
    </main>
  );
}

type StatCardProps = {
  title: string;
  value: number;
  description: string;
  icon: React.ReactNode;
  iconClass: string;
};

function StatCard({
  title,
  value,
  description,
  icon,
  iconClass,
}: StatCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
            {value.toLocaleString()}
          </p>
        </div>

        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${iconClass}`}
        >
          {icon}
        </div>
      </div>

      <p className="mt-4 text-xs leading-5 text-slate-500">
        {description}
      </p>
    </div>
  );
}
