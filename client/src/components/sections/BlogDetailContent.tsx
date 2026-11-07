"use client";

// HOOKS
import { useGetBlogsBySlugQuery } from "@/services/api/blogApi";
import { useParams } from "next/navigation";

// COMPONENTS
import BlogDetailPage from "@/components/sections/BlogDetail";
import BreadCrumb from "@/components/sections/BreadCrumb";
import Skeleton from "@/components/ui/Skeleton";

// TYPE
import { ExtendBlogType } from "@/@types/extend-blog-type";

// BLOG DETAIL SKELETON
function BlogDetailSkeleton() {
    return (
        <div className="container">

            {/* BREADCRUMB */}
            <div className="flex items-center justify-center gap-2 mb-8">
                <Skeleton width="65px" height="14px" />
                <Skeleton width="12px" height="14px" />
                <Skeleton width="110px" height="14px" />
            </div>

            {/* BLOG HEADER */}
            <div className="flex flex-col items-center">

                {/* AUTHOR AND DATE */}
                <div className="flex items-center justify-center gap-2 mb-5">
                    <Skeleton width="100px" height="15px" />
                    <Skeleton width="110px" height="15px" />
                </div>

                {/* BLOG TITLE */}
                <div className="w-full max-w-[720px] flex flex-col items-center gap-3">
                    <Skeleton width="90%" height="52px" />
                    <Skeleton width="70%" height="52px" />
                </div>

                {/* BLOG EXCERPT */}
                <div className="w-full max-w-[640px] flex flex-col items-center gap-2 mt-4">
                    <Skeleton width="100%" height="18px" />
                    <Skeleton width="85%" height="18px" />
                </div>

                {/* BLOG CATEGORIES */}
                <div className="flex items-center justify-center flex-wrap gap-2 mt-6 mb-[27px]">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <Skeleton
                            key={index}
                            width="85px"
                            height="25px"
                            rounded="md"
                        />
                    ))}
                </div>

            </div>

            {/* FEATURED IMAGE */}
            <Skeleton
                width="100%"
                height="500px"
                rounded="2xl"
            />

            {/* BLOG BODY AND SIDEBAR */}
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(80px,80px)_minmax(481px,746px)_minmax(340px,382px)] gap-5 xl:gap-10 mt-16 mb-16 md:mb-24 lg:mb-28">

                {/* SOCIAL LINKS */}
                <div className="hidden lg:flex flex-col items-center gap-4">
                    <Skeleton width="45px" height="15px" />
                    {Array.from({ length: 4 }).map((_, index) => (
                        <Skeleton
                            key={index}
                            width="35px"
                            height="35px"
                            rounded="full"
                        />
                    ))}
                </div>

                {/* ARTICLE CONTENT */}
                <div>

                    {/* PARAGRAPHS */}
                    <div className="flex flex-col gap-3">

                        <Skeleton width="100%" height="17px" />
                        <Skeleton width="95%" height="17px" />
                        <Skeleton width="90%" height="17px" />

                        <Skeleton width="100%" height="17px" />
                        <Skeleton width="85%" height="17px" />

                        {/* CONTENT HEADING */}
                        <Skeleton
                            width="75%"
                            height="42px"
                            className="mt-5 mb-2"
                        />

                        <Skeleton width="100%" height="17px" />
                        <Skeleton width="95%" height="17px" />
                        <Skeleton width="88%" height="17px" />

                        <Skeleton width="100%" height="17px" />
                        <Skeleton width="80%" height="17px" />

                        {/* CONTENT IMAGE */}
                        <Skeleton
                            width="100%"
                            height="300px"
                            rounded="2xl"
                            className="mt-5 mb-5"
                        />

                        {/* MORE CONTENT */}
                        <Skeleton
                            width="65%"
                            height="42px"
                            className="mt-5 mb-2"
                        />

                        <Skeleton width="100%" height="17px" />
                        <Skeleton width="95%" height="17px" />
                        <Skeleton width="90%" height="17px" />
                        <Skeleton width="100%" height="17px" />
                        <Skeleton width="75%" height="17px" />

                    </div>

                    {/* AUTHOR AND CATEGORIES */}
                    <div className="flex flex-col gap-4 mt-12 pb-6 border-b border-b-br">

                        <div className="flex items-center gap-2">
                            <Skeleton width="100px" height="15px" />
                            <Skeleton width="110px" height="15px" />
                        </div>

                        <div className="flex items-center gap-2">
                            <Skeleton width="75px" height="25px" rounded="md" />
                            <Skeleton width="85px" height="25px" rounded="md" />
                        </div>

                        {/* MOBILE SOCIAL LINKS */}
                        <div className="flex lg:hidden items-center gap-3 mt-3">
                            {Array.from({ length: 4 }).map((_, index) => (
                                <Skeleton
                                    key={index}
                                    width="35px"
                                    height="35px"
                                    rounded="full"
                                />
                            ))}
                        </div>

                    </div>

                    {/* PREVIOUS AND NEXT ARTICLES */}
                    <div className="flex flex-col sm:flex-row gap-6 mt-6">

                        <div className="w-full flex flex-col items-center justify-center bg-light dark:bg-heading rounded-2xl p-8 gap-3">
                            <Skeleton width="110px" height="13px" />
                            <Skeleton width="90%" height="20px" />
                            <Skeleton width="70%" height="20px" />
                        </div>

                        <div className="w-full flex flex-col items-center justify-center bg-light dark:bg-heading rounded-2xl p-8 gap-3">
                            <Skeleton width="110px" height="13px" />
                            <Skeleton width="90%" height="20px" />
                            <Skeleton width="70%" height="20px" />
                        </div>

                    </div>

                    {/* COMMENTS */}
                    <div className="mt-12">

                        <Skeleton width="150px" height="22px" />

                        <div className="flex flex-col gap-5 mt-8">

                            {Array.from({ length: 2 }).map((_, index) => (
                                <div key={index}>
                                    <div className="flex items-center gap-2">
                                        <Skeleton width="30px" height="30px" rounded="full" />
                                        <Skeleton width="100px" height="15px" />
                                        <Skeleton width="90px" height="15px" />
                                    </div>

                                    <Skeleton
                                        width="95%"
                                        height="15px"
                                        className="mt-3"
                                    />
                                </div>
                            ))}

                        </div>

                        {/* COMMENT FORM */}
                        <div className="flex flex-col gap-3 mt-8">
                            <Skeleton width="160px" height="22px" />
                            <Skeleton width="100%" height="50px" rounded="md" />
                            <Skeleton width="100%" height="120px" rounded="md" />
                            <Skeleton width="130px" height="45px" rounded="md" />
                        </div>

                    </div>

                </div>

                {/* SIDEBAR */}
                <div className="flex flex-col gap-6">

                    {/* AUTHOR DETAIL */}
                    <div className="bg-light dark:bg-[#222] border border-br rounded-2xl p-8">

                        <Skeleton width="65px" height="14px" />

                        <div className="flex items-center gap-3 mt-5">
                            <Skeleton width="50px" height="50px" rounded="full" />

                            <div className="flex flex-col gap-2">
                                <Skeleton width="130px" height="19px" />
                                <Skeleton width="100px" height="12px" />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 mt-5">
                            <Skeleton width="100%" height="15px" />
                            <Skeleton width="95%" height="15px" />
                            <Skeleton width="80%" height="15px" />
                        </div>

                        <div className="flex items-center gap-2 mt-5">
                            <Skeleton width="22px" height="22px" rounded="full" />
                            <Skeleton width="120px" height="15px" />
                        </div>

                        <div className="flex items-center gap-3 mt-4">
                            {Array.from({ length: 4 }).map((_, index) => (
                                <Skeleton
                                    key={index}
                                    width="28px"
                                    height="28px"
                                    rounded="md"
                                />
                            ))}
                        </div>

                    </div>

                    {/* FEATURED POSTS */}
                    <div className="px-3">

                        <Skeleton width="110px" height="14px" className="mb-5" />

                        <Skeleton
                            width="100%"
                            height="300px"
                            rounded="2xl"
                        />

                    </div>

                    {/* LATEST POSTS */}
                    <div className="bg-light dark:bg-[#222] border border-br rounded-2xl p-8">

                        <Skeleton width="100px" height="14px" />

                        <div className="flex flex-col gap-5 mt-5">
                            {Array.from({ length: 3 }).map((_, index) => (
                                <div key={index} className="flex flex-col gap-3">
                                    <Skeleton width="90%" height="20px" />
                                    <Skeleton width="100%" height="14px" />
                                    <Skeleton width="85%" height="14px" />
                                </div>
                            ))}
                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default function BlogDetailContent() {

    const params = useParams();
    const slug = params.slug as string;

    const {
        data,
        isLoading,
        error,
    } = useGetBlogsBySlugQuery(slug);

    // LOADING STATE
    if (isLoading) {
        return <BlogDetailSkeleton />;
    }

    // ERROR STATE
    if (error) {
        return (
            <div className="container py-16">
                <p className="text-center text-para">
                    Unable to load blog details. Please try again later.
                </p>
            </div>
        );
    }

    // EMPTY STATE
    if (!data) {
        return (
            <div className="container py-16">
                <p className="text-center text-para">
                    Blog not found.
                </p>
            </div>
        );
    }

    const { blog, previousBlog, nextBlog }: ExtendBlogType = data;

    return (
        <>
            <div className="[&_ul]:justify-center">
                <BreadCrumb
                    pageName={blog.title}
                    subPageName="blog"
                />
            </div>

            <BlogDetailPage
                blog={blog}
                previousBlog={previousBlog}
                nextBlog={nextBlog}
            />
        </>
    );
}