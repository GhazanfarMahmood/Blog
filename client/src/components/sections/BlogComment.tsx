"use client";

// NEXT IMAGE
import Image from "next/image";

// IMAGES OF AUTHOR
import comment_img1 from "@/assets/icons/comment-img1.jpeg";

// COMPONENT
import CommentForm from "../forms/CommentForm";
import { useGetCommentsByBlogQuery } from "@/services/api/commentApi";

interface BlogCommentProps {
  blogId: string;
}

export default function BlogComment({ blogId }: BlogCommentProps) {
  const {
    data: comments = [],
    isLoading,
    error,
  } = useGetCommentsByBlogQuery(blogId, {
    skip: !blogId,
  });

  console.log(comments);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Something went wrong.</h1>;
  }

  return (
    <>
      <button
        aria-label="view-comments"
        className="text-secondary font-extrabold -tracking-[0.03em] leading-[1.2] pb-[3.2px] mt-12 cursor-pointer btn-underline transition-all duration-[0.25s] ease-in dark:text-dark"
      >
        View Comments ({comments.length})
      </button>

      <div className="mt-8">
        <div className="blog-comment">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment._id}>
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
                      },
                    )}
                  </span>
                </span>

                <p className="text-primary leading-[1.55] mt-1.5">
                  {comment.message}
                </p>
              </div>
            ))
          ) : (
            <p className="text-primary">
              No comments yet. Be the first to comment!
            </p>
          )}
        </div>

        <CommentForm blogId={blogId} />
      </div>
    </>
  );
}