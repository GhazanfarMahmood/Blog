"use client";

import { useSearchParams } from "next/navigation";
import EditPostForm from "./_components/edit-post-form";

export default function Page() {
    const searchParams = useSearchParams();
    const postId = searchParams.get("id");

    if (!postId) {
        return (
            <div className="p-6">
                <h1 className="text-xl font-semibold text-red-500">
                    Invalid post ID
                </h1>
            </div>
        );
    }

    return (
        <div className="mx-auto w-full max-w-7xl">
            <div className="mb-6">
                <h1 className="text-2xl font-semibold text-dark dark:text-white">
                    Edit Post
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    Update your blog post information.
                </p>
            </div>

            <EditPostForm postId={postId} />
        </div>
    );
}