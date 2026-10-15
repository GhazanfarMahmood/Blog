
"use client";

import type { ColumnDef } from "@tanstack/react-table";
import {
  MoreHorizontal,
  Check,
  X,
  Trash2,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { Comment } from "@/@types/comment-type";

interface CommentsColumnsProps {
  onApprove: (id: string) => void | Promise<void>;
  onUnapprove: (id: string) => void | Promise<void>;
  onDelete: (id: string) => void | Promise<void>;
  isProcessing: boolean;
}

interface CommentActionsProps extends CommentsColumnsProps {
  comment: Comment;
}

function CommentActions({
  comment,
  onApprove,
  onUnapprove,
  onDelete,
  isProcessing,
}: CommentActionsProps) {
  const [isOpen, setIsOpen] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [position, setPosition] = useState({
    top: 0,
    left: 0,
  });

  const updatePosition = () => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();

    const dropdownWidth = 176;
    const dropdownHeight = 100;
    const spacing = 4;

    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;

    const openAbove =
      spaceBelow < dropdownHeight + spacing &&
      spaceAbove > spaceBelow;

    const top = openAbove
      ? rect.top - dropdownHeight - spacing
      : rect.bottom + spacing;

    const left = Math.max(
      8,
      Math.min(
        rect.right - dropdownWidth,
        window.innerWidth - dropdownWidth - 8,
      ),
    );

    setPosition({ top, left });
  };

  useEffect(() => {
    if (!isOpen) return;

    updatePosition();

    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        !buttonRef.current?.contains(target) &&
        !dropdownRef.current?.contains(target)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    const handleScroll = () => {
      updatePosition();
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", handleScroll, true);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);

      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [isOpen]);

  const handleStatusChange = () => {
    if (comment.isApproved) {
      void onUnapprove(comment._id);
    } else {
      void onApprove(comment._id);
    }

    setIsOpen(false);
  };

  const handleDelete = () => {
    void onDelete(comment._id);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block">
      <button
        ref={buttonRef}
        type="button"
        disabled={isProcessing}
        onClick={() => setIsOpen((previous) => !previous)}
        aria-label="Open comment actions"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className="rounded-lg p-2 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-gray-800"
      >
        <MoreHorizontal className="h-5 w-5" />
      </button>

      {isOpen &&
        createPortal(
          <div
            ref={dropdownRef}
            role="menu"
            aria-label="Comment actions"
            style={{
              position: "fixed",
              top: position.top,
              left: position.left,
              width: 176,
              zIndex: 9999,
            }}
            className="rounded-lg border border-gray-200 bg-white p-1 shadow-lg dark:border-gray-700 dark:bg-gray-900"
          >
            <button
              type="button"
              role="menuitem"
              disabled={isProcessing}
              onClick={handleStatusChange}
              className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-gray-700 transition-colors hover:bg-gray-100 disabled:opacity-50 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              {comment.isApproved ? (
                <>
                  <X className="h-4 w-4" />
                  Unapprove
                </>
              ) : (
                <>
                  <Check className="h-4 w-4" />
                  Approve
                </>
              )}
            </button>

            <button
              type="button"
              role="menuitem"
              disabled={isProcessing}
              onClick={handleDelete}
              className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50 dark:hover:bg-red-950/40"
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </button>
          </div>,
          document.body,
        )}
    </div>
  );
}

export default function CommentsColumns({
  onApprove,
  onUnapprove,
  onDelete,
  isProcessing,
}: CommentsColumnsProps): ColumnDef<Comment>[] {
  return [
    {
      accessorKey: "name",
      header: "Author",
      cell: ({ row }) => (
        <div className="min-w-36">
          <p className="font-medium text-gray-900 dark:text-white">
            {row.original.name || "Anonymous"}
          </p>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {row.original.email || "—"}
          </p>
        </div>
      ),
    },
    {
      id: "blog",
      header: "Blog",
      cell: ({ row }) => (
        <div className="max-w-56">
          <p className="whitespace-normal font-medium text-gray-700 dark:text-gray-300">
            {row.original.blog?.title ?? "Deleted Blog"}
          </p>
        </div>
      ),
    },
    {
      accessorKey: "message",
      header: "Comment",
      cell: ({ row }) => (
        <p className="max-w-[350px] whitespace-normal break-words leading-6 text-gray-600 dark:text-gray-300">
          {row.original.message || "No comment content"}
        </p>
      ),
    },
    {
      accessorKey: "isApproved",
      header: "Status",
      cell: ({ row }) => {
        const isApproved = row.original.isApproved;

        return (
          <span
            className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium ${
              isApproved
                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                isApproved ? "bg-green-500" : "bg-amber-500"
              }`}
            />
            {isApproved ? "Approved" : "Pending"}
          </span>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Date",
      cell: ({ row }) => {
        const date = new Date(row.original.createdAt);

        if (Number.isNaN(date.getTime())) {
          return <span className="text-gray-500">—</span>;
        }

        return (
          <span className="whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
            {date.toLocaleDateString(undefined, {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </span>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <CommentActions
          comment={row.original}
          onApprove={onApprove}
          onUnapprove={onUnapprove}
          onDelete={onDelete}
          isProcessing={isProcessing}
        />
      ),
    },
  ];
}
