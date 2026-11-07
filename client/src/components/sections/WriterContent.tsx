"use client";

// COMPONENTS
import AuthorBox from "@/components/sections/AuthorBox";
import BreadCrumb from "@/components/sections/BreadCrumb";
import BlogCard from "../cards/BlogCard";
import PaginationComponent from "./PaginationComponent";
import Skeleton from "@/components/ui/Skeleton";

// HOOKS
import { useGetBlogsByWriterQuery } from "@/services/api/blogApi";
import { useGetWriterBySlugQuery } from "@/services/api/writerApi";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

// WRITER PROFILE SKELETON
function AuthorBoxSkeleton() {
    return (
        <div className="container pb-12 border-b border-b-br mb-12">
            {/* PROFILE IMAGE AND DETAILS */}
            <div className="flex flex-wrap items-center justify-start gap-6">
                <Skeleton
                    width="130px"
                    height="130px"
                    rounded="full"
                />

                <div className="flex flex-col gap-3">
                    {/* NAME */}
                    <Skeleton width="230px" height="40px" />

                    {/* DESIGNATION */}
                    <Skeleton width="140px" height="12px" />

                    {/* SOCIAL ICONS */}
                    <div className="flex items-center gap-5 mt-2">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <Skeleton
                                key={index}
                                width="28px"
                                height="28px"
                                rounded="sm"
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* ABOUT */}
            <div className="max-w-[520px] flex flex-col gap-2 mt-5">
                <Skeleton width="100%" height="16px" />
                <Skeleton width="95%" height="16px" />
                <Skeleton width="75%" height="16px" />
            </div>

            {/* LOCATION */}
            <div className="flex items-center gap-2 mt-4">
                <Skeleton
                    width="24px"
                    height="24px"
                    rounded="full"
                />
                <Skeleton width="130px" height="16px" />
            </div>
        </div>
    );
}

// BLOG CARD SKELETON
function BlogCardSkeleton() {
    return (
        <div className="w-full flex flex-col">
            {/* BLOG IMAGE */}
            <Skeleton
                width="100%"
                height="230px"
                rounded="xl"
                className="mb-5"
            />

            {/* CATEGORY */}
            <Skeleton
                width="110px"
                height="22px"
                rounded="full"
                className="mb-4"
            />

            {/* BLOG TITLE */}
            <div className="flex flex-col gap-2 mb-4">
                <Skeleton width="95%" height="24px" />
                <Skeleton width="75%" height="24px" />
            </div>

            {/* BLOG DESCRIPTION */}
            <div className="flex flex-col gap-2 mb-5">
                <Skeleton width="100%" height="14px" />
                <Skeleton width="90%" height="14px" />
                <Skeleton width="65%" height="14px" />
            </div>

            {/* AUTHOR AND DATE */}
            <div className="flex items-center gap-3">
                <Skeleton
                    width="40px"
                    height="40px"
                    rounded="full"
                />

                <div className="flex flex-col gap-2">
                    <Skeleton width="100px" height="12px" />
                    <Skeleton width="130px" height="12px" />
                </div>
            </div>
        </div>
    );
}

// BLOG GRID SKELETON
function BlogGridSkeleton() {
    return (
        <div className="container mb-16 md:mb-24 lg:mb-28">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6 lg:gap-y-12">
                {Array.from({ length: 12 }).map((_, index) => (
                    <BlogCardSkeleton key={index} />
                ))}
            </div>
        </div>
    );
}

export default function WriterContent() {
    const [page, setPage] = useState(1);

    const params = useParams();
    const slug = params.slug as string;

    useEffect(() => {
        setPage(1);
    }, [slug]);

    // WRITER API
    const {
        data: writer,
        isLoading: writerLoading,
        error: writerError,
    } = useGetWriterBySlugQuery(slug);

    // WRITER BLOG API
    const {
        data: writerBlog,
        isLoading: blogLoading,
        error: blogError,
    } = useGetBlogsByWriterQuery({
        slug,
        limit: 12,
        page,
    });

    // WRITER LOADING
    if (writerLoading) {
        return <AuthorBoxSkeleton />;
    }

    // WRITER ERROR
    if (writerError) {
        return (
            <p className="container text-center text-para py-16">
                Unable to load writer information. Please try again later.
            </p>
        );
    }

    // WRITER NOT FOUND
    if (!writer) {
        return (
            <p className="container text-center text-para py-16">
                Writer not found.
            </p>
        );
    }

    return (
        <>
            {/* BREADCRUMB */}
            <BreadCrumb
                pageName={`Archives for ${writer.name}`}
            />

            {/* WRITER PROFILE */}
            <AuthorBox writer={writer} />

            {/* WRITER BLOGS */}
            {blogLoading ? (
                <BlogGridSkeleton />
            ) : blogError ? (
                <p className="container text-center text-para py-16">
                    Unable to load writer blogs. Please try again later.
                </p>
            ) : writerBlog?.blogs && writerBlog.blogs.length > 0 ? (
                <div className="container mb-16 md:mb-24 lg:mb-28">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6 lg:gap-y-12">
                        {writerBlog.blogs.map((item) => (
                            <BlogCard
                                title={item.title}
                                img={item.thumbnail}
                                category={item.category}
                                reading={item.reading}
                                author={item.author}
                                date={item.createdAt}
                                description={item.excerpt}
                                slug={item.slug}
                                key={item._id}
                            />
                        ))}
                    </div>

                    <PaginationComponent
                        setPage={setPage}
                        currentPage={writerBlog.currentPage}
                        totalPages={writerBlog.totalPages}
                        hasPrevPage={writerBlog.hasPrevPage}
                        hasNextPage={writerBlog.hasNextPage}
                    />
                </div>
            ) : (
                <div className="container flex items-center justify-center my-12">
                    <h1 className="text-[35px] xs:text-[50px] md:text-[80px] xl:text-9xl font-extrabold bg-clip-text text-transparent bg-linear-(--linear-bg) text-center dark:text-dark">
                        No Blog Found
                    </h1>
                </div>
            )}
        </>
    );
}