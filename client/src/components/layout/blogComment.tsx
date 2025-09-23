// NEXT IMAGE
import Image from "next/image";

// IMAGES OF AUTHOR
import comment_img1 from "@/assets/images/icons/comment-img1.jpeg";
import author_profile from "@/assets/images/author-img.webp";
import comment_img2 from "@/assets/images/icons/comment-img2.jpeg";

// COMPONENT
import CommentForm from "../forms/commentForm";

export default function BlogComment(){
    return <>
        <button aria-label="view-comments"
            className="text-secondary font-extrabold -tracking-[0.03em] leading-[1.2] pb-[3.2px] mt-12 cursor-pointer btn-underline transition-all duration-[0.25s] ease-in dark:text-dark"
        >View Comments (3)</button>
        <div
            className="mt-8"
        >
            <div
                className="blog-comment"
            >
                <div>
                    <div>
                        <span
                            className="flex items-center justify-start gap-[6px]"
                        >
                            <Image src={comment_img1} alt="comment-img" width={30} height={30}
                                className="flex-none rounded-full"
                            />
                            <span
                                className="text-para leading-[1.3] font-extrabold text-sm"
                            >Elliot Alderson</span>
                            <span
                                className="text-primary text-sm leading-[1.3] pb-[1.4px]"
                            >on October 9, 2024</span>
                        </span>
                        <p
                            className="text-primary leading-[1.55] mt-1.5"
                        >I can’t believe how much value you packed into this post. It’s a must-read for anyone in the field.</p>
                        <button aria-label="reply-comment"
                            className="text-secondary font-extrabold leading-[1.2] -tracking-[0.03em] mt-3 cursor-pointer transition-all duration-[0.25s] ease-in btn-underline pb-[3.2px] dark:text-dark"
                        >Rely</button>
                    </div>
                    <div
                        className="pl-8 mt-6"
                    >
                        <span
                            className="flex items-center justify-start gap-[6px]"
                        >
                            <Image src={author_profile} alt="comment-img" width={30} height={30}
                                className="flex-none rounded-full"
                            />
                            <span
                                className="text-para leading-[1.3] font-extrabold text-sm"
                            >Ethan Caldwell</span>
                            <span
                                className="text-primary text-sm leading-[1.3] pb-[1.4px]"
                            >on October 9, 2024</span>
                        </span>
                        <p
                            className="text-primary leading-[1.55] mt-1.5"
                        >
                            I’m glad the post provided so much value! Thanks for your encouraging words.
                        </p>
                        <button aria-label="reply-comment"
                            className="text-secondary font-extrabold leading-[1.2] -tracking-[0.03em] mt-3 cursor-pointer transition-all duration-[0.25s] ease-in btn-underline pb-[3.2px] dark:text-dark"
                        >
                            Rely
                        </button>
                    </div>
                </div>
                <div>
                    <span
                        className="flex items-center justify-start gap-[6px]"
                    >
                        <Image src={comment_img2} alt="comment-img" width={30} height={30}
                            className="flex-none rounded-full"
                        />
                        <span
                            className="text-para leading-[1.3] font-extrabold text-sm"
                        >Joanna Wellick</span>
                        <span
                            className="text-primary text-sm leading-[1.3] pb-[1.4px]"
                        >on October 9, 2024</span>
                    </span>
                    <p
                        className="text-primary leading-[1.55] mt-1.5"
                    >Your passion for the subject really shines through in this post. Keep it up!</p>
                    <button aria-label="reply-comment"
                        className="text-secondary font-extrabold leading-[1.2] -tracking-[0.03em] mt-3 cursor-pointer transition-all duration-[0.25s] ease-in btn-underline pb-[3.2px] dark:text-dark"
                    >Rely</button>
                </div>
            </div>
                <CommentForm />
        </div>
    </>
}