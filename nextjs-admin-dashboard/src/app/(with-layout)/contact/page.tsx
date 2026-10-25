
"use client";

import { useMemo, useState } from "react";
import {
  Search,
  Inbox,
  Mail,
  CheckCheck,
  Eye,
  Trash2,
  X,
  Loader2,
} from "lucide-react";

import {
  useGetAllContactsQuery,
  useGetContactStatsQuery,
  useUpdateContactStatusMutation,
  useDeleteContactMutation,
  type ContactMessage,
  type ContactStatus,
} from "@/services/api/contactApi";

type FilterStatus = "all" | ContactStatus;

export default function ContactPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterStatus>("all");
  const [selected, setSelected] = useState<ContactMessage | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    data: contacts = [],
    isLoading,
    isError,
  } = useGetAllContactsQuery();

  const {
    data: stats,
    isLoading: statsLoading,
    isError: statsError,
  } = useGetContactStatsQuery();

  const [updateStatus, { isLoading: updating }] =
    useUpdateContactStatusMutation();

  const [deleteContact, { isLoading: deleting }] =
    useDeleteContactMutation();

  const filteredContacts = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return contacts.filter((contact) => {
      const matchesStatus =
        filter === "all" || contact.status === filter;

      const matchesSearch = [
        contact.firstName,
        contact.lastName,
        contact.email,
        contact.subject,
        contact.message,
      ]
        .join(" ")
        .toLowerCase()
        .includes(keyword);

      return matchesStatus && matchesSearch;
    });
  }, [contacts, filter, search]);

  const selectedContact = selected
    ? contacts.find((item) => item._id === selected._id) ?? selected
    : null;

  const handleStatusChange = async (
    contact: ContactMessage,
    status: ContactStatus
  ) => {
    setErrorMessage("");

    try {
      const response = await updateStatus({
        id: contact._id,
        status,
      }).unwrap();

      if (selected?._id === contact._id) {
        setSelected(response.data);
      }
    } catch {
      setErrorMessage("Unable to update message status.");
    }
  };

  const handleOpen = async (contact: ContactMessage) => {
    setSelected(contact);
    setErrorMessage("");

    if (contact.status === "new") {
      await handleStatusChange(contact, "read");
    }
  };

  const handleDelete = async (contact: ContactMessage) => {
    if (
      !window.confirm(
        `Delete the message from ${contact.firstName} ${contact.lastName}?`
      )
    ) {
      return;
    }

    setErrorMessage("");

    try {
      await deleteContact(contact._id).unwrap();
      setSelected(null);
    } catch {
      setErrorMessage("Unable to delete the message.");
    }
  };

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const statusClasses: Record<ContactStatus, string> = {
    new: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
    read: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
    resolved:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  };

  const cards = [
    {
      title: "Total Messages",
      value: stats?.total,
      icon: Inbox,
    },
    {
      title: "New Messages",
      value: stats?.newMessages,
      icon: Mail,
    },
    {
      title: "Read Messages",
      value: stats?.read,
      icon: Eye,
    },
    {
      title: "Resolved",
      value: stats?.resolved,
      icon: CheckCheck,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-dark dark:text-white">
          Contact Messages
        </h1>
        <p className="mt-1 text-sm text-dark-6">
          Manage messages received from your blog visitors.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(({ title, value, icon: Icon }) => (
          <div
            key={title}
            className="rounded-[10px] border border-stroke bg-white p-5 shadow-1 dark:border-dark-3 dark:bg-gray-dark"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-dark-6">{title}</p>
              <Icon size={21} className="text-primary" />
            </div>

            <h2 className="mt-4 text-3xl font-bold text-dark dark:text-white">
              {statsLoading
                ? "..."
                : statsError
                  ? "—"
                  : (value ?? 0)}
            </h2>
          </div>
        ))}
      </div>

      {/* Messages table */}
      <div className="overflow-hidden rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark">
        <div className="flex flex-col gap-4 border-b border-stroke p-5 dark:border-dark-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-dark dark:text-white">
              All Messages
            </h2>
            <p className="text-sm text-dark-6">
              {isLoading
                ? "Loading messages..."
                : isError
                  ? "Messages unavailable"
                  : `${filteredContacts.length} messages found`}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative">
              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-6"
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search messages..."
                className="w-full rounded-lg border border-stroke bg-transparent py-2.5 pl-10 pr-3 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:text-white sm:w-60"
              />
            </div>

            <select
              value={filter}
              onChange={(e) =>
                setFilter(e.target.value as FilterStatus)
              }
              className="rounded-lg border border-stroke bg-white px-3 py-2.5 text-sm text-dark outline-none dark:border-dark-3 dark:bg-gray-dark dark:text-white"
            >
              <option value="all">All Statuses</option>
              <option value="new">New</option>
              <option value="read">Read</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
        </div>

        {errorMessage && (
          <p role="alert" className="m-5 rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {errorMessage}
          </p>
        )}

        {isLoading ? (
          <div className="flex items-center justify-center gap-2 p-12 text-dark-6">
            <Loader2 className="animate-spin" size={20} />
            Loading messages...
          </div>
        ) : isError ? (
          <p className="p-12 text-center text-sm text-red-500">
            Failed to fetch contact messages.
          </p>
        ) : filteredContacts.length === 0 ? (
          <div className="p-12 text-center">
            <Inbox className="mx-auto mb-3 text-dark-6" size={32} />
            <p className="text-sm text-dark-6">
              No contact messages found.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-1 text-dark-6 dark:bg-dark-2">
                <tr>
                  <th className="px-5 py-4 font-medium">Sender</th>
                  <th className="px-5 py-4 font-medium">Subject</th>
                  <th className="px-5 py-4 font-medium">Date</th>
                  <th className="px-5 py-4 font-medium">Status</th>
                  <th className="px-5 py-4 text-right font-medium">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredContacts.map((contact) => (
                  <tr
                    key={contact._id}
                    className="border-t border-stroke dark:border-dark-3"
                  >
                    <td className="px-5 py-4">
                      <p className="font-medium text-dark dark:text-white">
                        {contact.firstName} {contact.lastName}
                      </p>
                      <p className="mt-1 text-xs text-dark-6">
                        {contact.email}
                      </p>
                    </td>

                    <td className="max-w-[220px] truncate px-5 py-4 text-dark dark:text-white">
                      {contact.subject}
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 text-dark-6">
                      {formatDate(contact.createdAt)}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${statusClasses[contact.status]}`}
                      >
                        {contact.status}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-3">
                        <button
                          type="button"
                          onClick={() => handleOpen(contact)}
                          className="text-primary hover:opacity-70"
                          title="View message"
                          aria-label="View message"
                        >
                          <Eye size={18} />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(contact)}
                          disabled={deleting}
                          className="text-red-500 hover:opacity-70 disabled:opacity-50"
                          title="Delete message"
                          aria-label="Delete message"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Message detail modal */}
      {selectedContact && (
        <div
          role="presentation"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setSelected(null);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-detail-title"
            className="w-full max-w-xl rounded-xl bg-white p-6 shadow-xl dark:bg-gray-dark"
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h2
                  id="contact-detail-title"
                  className="text-xl font-semibold text-dark dark:text-white"
                >
                  {selectedContact.subject}
                </h2>
                <p className="mt-1 text-sm text-dark-6">
                  {formatDate(selectedContact.createdAt)}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelected(null)}
                aria-label="Close message"
                className="text-dark-6 hover:text-dark dark:hover:text-white"
              >
                <X size={22} />
              </button>
            </div>

            <div className="space-y-4 text-sm">
              <div>
                <p className="text-dark-6">From</p>
                <p className="font-medium text-dark dark:text-white">
                  {selectedContact.firstName} {selectedContact.lastName}
                </p>
                <a
                  href={`mailto:${selectedContact.email}`}
                  className="text-primary hover:underline"
                >
                  {selectedContact.email}
                </a>
              </div>

              <div>
                <p className="mb-2 text-dark-6">Message</p>
                <div className="max-h-72 overflow-y-auto whitespace-pre-wrap break-words rounded-lg bg-gray-1 p-4 text-dark dark:bg-dark-2 dark:text-white">
                  {selectedContact.message}
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-status"
                  className="mb-2 block text-dark-6"
                >
                  Message status
                </label>

                <select
                  id="contact-status"
                  value={selectedContact.status}
                  disabled={updating}
                  onChange={(e) =>
                    handleStatusChange(
                      selectedContact,
                      e.target.value as ContactStatus
                    )
                  }
                  className="w-full rounded-lg border border-stroke bg-white p-3 text-dark outline-none dark:border-dark-3 dark:bg-gray-dark dark:text-white"
                >
                  <option value="new">New</option>
                  <option value="read">Read</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="rounded-lg border border-stroke px-4 py-2 text-sm text-dark dark:border-dark-3 dark:text-white"
              >
                Close
              </button>

              {selectedContact.status !== "resolved" && (
                <button
                  type="button"
                  disabled={updating}
                  onClick={() =>
                    handleStatusChange(selectedContact, "resolved")
                  }
                  className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
                >
                  {updating ? "Updating..." : "Mark Resolved"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
