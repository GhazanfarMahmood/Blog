"use client";

// COMPONENTS
import BreadCrumb from "./BreadCrumb";
import SearchLayout from "./SearchLayout";
import BlogCard from "../cards/BlogCard";
import PaginationComponent from "./PaginationComponent";
import Skeleton from "@/components/ui/Skeleton";

// HOOKS
import { useGetBlogsBySearchQuery } from "@/services/api/blogApi";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

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

export default function SearchContent() {
    const [page, setPage] = useState(1);

    const searchParams = useSearchParams();
    const query = searchParams.get("q") || "";

    useEffect(() => {
        setPage(1);
    }, [query]);

    // SEARCH BLOG API
    const {
        data,
        isFetching,
        error,
    } = useGetBlogsBySearchQuery({
        query,
        page,
        limit: 12,
    });

    return (
        <>
            {/* DYNAMIC BREADCRUMB */}
            <BreadCrumb
                pageName={`Search results for ${query}`}
            />

            {/* SEARCH LAYOUT */}
            <SearchLayout name={query} />

            {/* LOADING SKELETON */}
            {isFetching ? (
                <BlogGridSkeleton />
            ) : error ? (
                // ERROR STATE
                <p className="container text-center text-para py-16">
                    Unable to load search results. Please try again later.
                </p>
            ) : !data?.blogs?.length ? (
                // EMPTY STATE
                <div className="container flex items-center justify-center my-12">
                    <h1 className="text-[35px] xs:text-[50px] md:text-[80px] xl:text-9xl font-extrabold bg-clip-text text-transparent bg-linear-(--linear-bg) text-center dark:text-dark">
                        No Blog Found
                    </h1>
                </div>
            ) : (
                // BLOG CARDS
                <div className="container mb-16 md:mb-24 lg:mb-28">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6 lg:gap-y-12">
                        {data.blogs.map((item) => (
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
                        currentPage={data.currentPage}
                        totalPages={data.totalPages}
                        hasPrevPage={data.hasPrevPage}
                        hasNextPage={data.hasNextPage}
                    />
                </div>
            )}
        </>
    );
}