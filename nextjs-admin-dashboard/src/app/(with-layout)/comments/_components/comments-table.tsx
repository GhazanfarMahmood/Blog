
"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import type { Comment } from "@/@types/comment-type";
import CommentsColumns from "./comments-columns";

interface CommentsTableProps {
  comments: Comment[];
  onApprove: (id: string) => void | Promise<void>;
  onUnapprove: (id: string) => void | Promise<void>;
  onDelete: (id: string) => void | Promise<void>;
  isProcessing: boolean;
}

export default function CommentsTable({
  comments,
  onApprove,
  onUnapprove,
  onDelete,
  isProcessing,
}: CommentsTableProps) {
  const columns = CommentsColumns({
    onApprove,
    onUnapprove,
    onDelete,
    isProcessing,
  });

  const table = useReactTable({
    data: comments,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => row._id,
  });

  return (
    <div className="w-full">
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[950px] text-left text-sm">
          <thead className="border-b border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-800/50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    scope="col"
                    className="px-5 py-4 font-semibold text-gray-600 dark:text-gray-300"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="transition-colors hover:bg-gray-50/80 dark:hover:bg-gray-800/40"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-5 py-4 align-middle text-gray-700 dark:text-gray-300"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={table.getVisibleLeafColumns().length}
                  className="px-5 py-16 text-center"
                >
                  <p className="font-medium text-gray-700 dark:text-gray-200">
                    No comments found
                  </p>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Comments will appear here when readers submit them.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isProcessing && (
        <div
          role="status"
          className="border-t border-gray-200 px-5 py-3 text-sm text-gray-500 dark:border-gray-800 dark:text-gray-400"
        >
          Processing comment action...
        </div>
      )}
    </div>
  );
}
