"use client";

// HOOKS
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import {
    useGetCategoryBySlugQuery,
} from "@/services/api/categoryApi";
import {
    useGetBlogsByCategoryQuery,
} from "@/services/api/blogApi";

// COMPONENTS
import BlogCard from "../cards/BlogCard";
import CategoryDetailInfo from "./CategoryDetailInfo";
import PaginationComponent from "./PaginationComponent";
import Skeleton from "@/components/ui/Skeleton";

// CATEGORY INFORMATION SKELETON
function CategoryInfoSkeleton() {
    return (
        <div className="w-full container pb-12 border-b border-b-br mb-12">
            {/* CATEGORY IMAGE */}
            <Skeleton
                width="100px"
                height="100px"
                rounded="2xl"
            />

            {/* CATEGORY TITLE */}
            <Skeleton
                width="240px"
                height="40px"
                className="my-[20px_10px]"
            />

            {/* CATEGORY DESCRIPTION */}
            <div className="max-w-[520px] flex flex-col gap-2">
                <Skeleton width="100%" height="16px" />
                <Skeleton width="95%" height="16px" />
                <Skeleton width="75%" height="16px" />
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

export default function CategoryDetailContent() {
    const [page, setPage] = useState(1);

    const params = useParams();
    const slug = params.slugs as string;

    useEffect(() => {
        setPage(1);
    }, [slug]);

    // CATEGORY API
    const {
        data: category,
        isLoading: categoryLoading,
        error: categoryError,
    } = useGetCategoryBySlugQuery(slug);

    // BLOG API
    const {
        data: blogData,
        isLoading: blogsLoading,
        error: blogsError,
    } = useGetBlogsByCategoryQuery({
        slug,
        limit: 12,
        page,
    });

    // CATEGORY LOADING / ERROR / NOT FOUND
    if (categoryLoading) {
        return <CategoryInfoSkeleton />;
    }

    if (categoryError) {
        return (
            <p className="container text-center text-para py-16">
                Unable to load category information. Please try again later.
            </p>
        );
    }

    if (!category) {
        return (
            <p className="container text-center text-para py-16">
                Category not found.
            </p>
        );
    }

    const { categoryName, description, image } = category;

    return (
        <>
            {/* CATEGORY INFORMATION */}
            <CategoryDetailInfo
                img={image}
                title={categoryName}
                description={description}
            />

            {/* BLOGS */}
            {blogsLoading ? (
                <BlogGridSkeleton />
            ) : blogsError ? (
                <p className="container text-center text-para py-16">
                    Unable to load blogs. Please try again later.
                </p>
            ) : blogData?.blogs && blogData.blogs.length > 0 ? (
                <div className="container mb-16 md:mb-24 lg:mb-28">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6 lg:gap-y-12">
                        {blogData.blogs.map((item) => (
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
                        currentPage={blogData.currentPage}
                        totalPages={blogData.totalPages}
                        hasPrevPage={blogData.hasPrevPage}
                        hasNextPage={blogData.hasNextPage}
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