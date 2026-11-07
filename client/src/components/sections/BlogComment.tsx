"use client";

// COMPONENTS
import CommentForm from "../forms/CommentForm";
import { useGetCommentsByBlogQuery } from "@/services/api/commentApi";

// CUSTOM SKELETON
import Skeleton from "@/components/ui/Skeleton";

interface BlogCommentProps {
    blogId: string;
}

// COMMENT SKELETON
function CommentSkeleton() {
    return (
        <div className="flex flex-col gap-6">

            {Array.from({ length: 2 }).map((_, index) => (
                <div key={index}>

                    {/* COMMENT AUTHOR AND DATE */}
                    <div className="flex items-center gap-2">

                        <Skeleton
                            width="30px"
                            height="30px"
                            rounded="full"
                        />

                        <Skeleton
                            width="100px"
                            height="15px"
                        />

                        <Skeleton
                            width="90px"
                            height="15px"
                        />

                    </div>

                    {/* COMMENT MESSAGE */}
                    <div className="flex flex-col gap-2 mt-3">
                        <Skeleton width="100%" height="15px" />
                        <Skeleton width="90%" height="15px" />
                    </div>

                </div>
            ))}

        </div>
    );
}

export default function BlogComment({ blogId }: BlogCommentProps) {

    const {
        data: comments = [],
        isLoading,
        error,
    } = useGetCommentsByBlogQuery(blogId, {
        skip: !blogId,
    });

    return (
        <>

            {/* VIEW COMMENTS */}
            <button
                aria-label="view-comments"
                className="text-secondary font-extrabold -tracking-[0.03em] leading-[1.2] pb-[3.2px] mt-12 cursor-pointer btn-underline transition-all duration-[0.25s] ease-in dark:text-dark"
            >
                View Comments ({comments.length})
            </button>

            <div className="mt-8">

                <div className="blog-comment">

                    {/* LOADING STATE */}
                    {isLoading ? (

                        <CommentSkeleton />

                    ) : error ? (

                        /* ERROR STATE */
                        <p className="text-primary">
                            Unable to load comments. Please try again later.
                        </p>

                    ) : comments.length > 0 ? (

                        /* COMMENTS DATA */
                        comments.map((comment) => (
                            <div key={comment._id} className="mb-6">

                                <span className="flex items-center justify-start gap-[6px]">

                                    <span className="w-[30px] h-[30px] flex-none rounded-full bg-secondary text-light dark:text-dark flex items-center justify-center text-sm font-bold uppercase">
                                        {comment.name?.trim().charAt(0).toUpperCase() || "A"}
                                    </span>

                                    <span className="text-para leading-[1.3] font-extrabold text-sm">
                                        {comment.name}
                                    </span>

                                    <span className="text-primary text-sm leading-[1.3] pb-[1.4px]">
                                        on{" "}
                                        {new Date(comment.createdAt).toLocaleDateString(
                                            "en-US",
                                            {
                                                month: "long",
                                                day: "numeric",
                                                year: "numeric",
                                            }
                                        )}
                                    </span>

                                </span>

                                <p className="text-primary leading-[1.55] mt-1.5">
                                    {comment.message}
                                </p>

                            </div>
                        ))

                    ) : (

                        /* EMPTY STATE */
                        <p className="text-primary">
                            No comments yet. Be the first to comment!
                        </p>

                    )}

                </div>

                {/* COMMENT FORM - ALWAYS VISIBLE */}
                <CommentForm blogId={blogId} />

            </div>

        </>
    );
}