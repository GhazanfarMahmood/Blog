
"use client";

// COMPONENTS
import AuthorDetail from "../cards/AuthorDetail";
import BlogCard from "../cards/BlogCard";
import Creating from "../cards/CreatingCard";
import FeatureCard from "../cards/FeatureCard";
import PaginationComponent from "./PaginationComponent";

// HOOKS
import {
    useGetBlogsQuery,
    useGetSideBarDataQuery,
} from "@/services/api/blogApi";
import { useState } from "react";

// CUSTOM SKELETON
import Skeleton from "@/components/ui/Skeleton";

// USING SWIPER SLIDER
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// SWIPER CSS
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// BLOG CARD SKELETON
function BlogCardSkeleton() {
    return (
        <div className="flex flex-col w-full">

            {/* BLOG IMAGE */}
            <Skeleton
                width="100%"
                height="230px"
                rounded="2xl"
            />

            {/* BLOG CATEGORY */}
            <div className="flex items-center gap-2 mt-5">
                <Skeleton width="75px" height="20px" rounded="md" />
                <Skeleton width="75px" height="20px" rounded="md" />
            </div>

            {/* BLOG TITLE */}
            <div className="flex flex-col gap-2 mt-4">
                <Skeleton width="100%" height="25px" />
                <Skeleton width="75%" height="25px" />
            </div>

            {/* BLOG DESCRIPTION */}
            <div className="flex flex-col gap-2 mt-3">
                <Skeleton width="100%" height="15px" />
                <Skeleton width="90%" height="15px" />
            </div>

            {/* BLOG AUTHOR AND DATE */}
            <div className="flex items-center gap-3 mt-5">
                <Skeleton width="35px" height="35px" rounded="full" />
                <Skeleton width="100px" height="15px" />
                <Skeleton width="85px" height="15px" />
            </div>

        </div>
    );
}

// AUTHOR DETAIL SKELETON
function AuthorDetailSkeleton() {
    return (
        <div className="flex flex-col max-w-[450px] lg:max-w-none bg-light p-8 rounded-2xl border border-br dark:bg-[#222] mx-auto lg:mx-0">

            <Skeleton width="65px" height="14px" />

            {/* AUTHOR PROFILE */}
            <div className="flex items-center justify-start gap-2.5 mt-5">
                <Skeleton width="50px" height="50px" rounded="full" />

                <div className="flex flex-col gap-2">
                    <Skeleton width="130px" height="19px" />
                    <Skeleton width="100px" height="12px" />
                </div>
            </div>

            {/* AUTHOR DESCRIPTION */}
            <div className="flex flex-col gap-2 mt-5">
                <Skeleton width="100%" height="15px" />
                <Skeleton width="95%" height="15px" />
                <Skeleton width="80%" height="15px" />
            </div>

            {/* AUTHOR LOCATION */}
            <div className="flex items-center gap-2 mt-5">
                <Skeleton width="22px" height="22px" rounded="full" />
                <Skeleton width="120px" height="15px" />
            </div>

            {/* SOCIAL ICONS */}
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
    );
}

// FEATURED POSTS SKELETON
function FeatureCardSkeleton() {
    return (
        <div className="max-w-[450px] lg:max-w-none relative px-3 mx-auto lg:mx-0">

            <Skeleton
                width="100px"
                height="14px"
                className="mb-5"
            />

            <div className="relative h-[300px] w-full overflow-hidden rounded-2xl">

                <Skeleton
                    width="100%"
                    height="300px"
                    rounded="2xl"
                />

                {/* FEATURED CATEGORIES */}
                <div className="absolute top-6 left-7 flex gap-2">
                    <Skeleton width="75px" height="24px" rounded="md" />
                    <Skeleton width="75px" height="24px" rounded="md" />
                </div>

                {/* FEATURED BLOG DETAILS */}
                <div className="absolute bottom-7 left-7 right-7 flex flex-col gap-3">
                    <Skeleton width="120px" height="15px" />
                    <Skeleton width="90%" height="25px" />
                    <Skeleton width="70%" height="25px" />
                </div>

            </div>

        </div>
    );
}

// LATEST BLOGS SKELETON
function CreatingSkeleton() {
    return (
        <div className="max-w-[450px] lg:max-w-none bg-light p-8 rounded-2xl border border-br dark:bg-[#222] mx-auto lg:mx-0 mt-4">

            <Skeleton width="100px" height="14px" />

            <ul className="flex flex-col items-start justify-start gap-5 mt-5">
                {Array.from({ length: 3 }).map((_, index) => (
                    <li key={index} className="w-full">

                        {/* BLOG TITLE */}
                        <Skeleton width="90%" height="20px" />

                        {/* BLOG DESCRIPTION */}
                        <div className="flex flex-col gap-2 mt-3">
                            <Skeleton width="100%" height="14px" />
                            <Skeleton width="85%" height="14px" />
                        </div>

                    </li>
                ))}
            </ul>

        </div>
    );
}

export default function MainContent() {

    const [page, setPage] = useState(1);

    const {
        data: blogData,
        isLoading: blogLoading,
        error: blogError,
    } = useGetBlogsQuery({
        page,
        limit: 10,
    });

    const {
        data: sideBarData,
        isLoading: sideBarLoading,
        error: sideBarError,
    } = useGetSideBarDataQuery();

    return (
        <>
            <div className="container">
                <div className="grid grid-cols-1 lg:grid-cols-[minmax(530px,826px)_minmax(370px,382px)] gap-[40px] mb-16 md:mb-24 lg:mb-28">

                    {/* LEFT SIDE - BLOG CONTENT */}
                    <div>

                        <div className="grid grid-cols-1 md:max-lg:grid-cols-2 lg:max-xl:grid-cols-1 xl:grid-cols-2 gap-x-6 gap-y-6 lg:gap-y-12">

                            {blogLoading ? (

                                // BLOG LOADING SKELETON
                                Array.from({ length: 10 }).map((_, index) => (
                                    <BlogCardSkeleton key={index} />
                                ))

                            ) : blogError ? (

                                // BLOG ERROR
                                <p className="col-span-full text-center text-red-500">
                                    Unable to load blogs. Please try again later.
                                </p>

                            ) : blogData?.blogs && blogData.blogs.length > 0 ? (

                                // BLOG DATA
                                blogData.blogs.map((item) => (
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
                                ))

                            ) : (

                                // EMPTY BLOGS
                                <p className="col-span-full text-center text-para">
                                    No blogs available.
                                </p>

                            )}

                        </div>

                        {/* PAGINATION */}
                        {!blogLoading && !blogError && blogData && (
                            <PaginationComponent
                                setPage={setPage}
                                currentPage={blogData.currentPage}
                                totalPages={blogData.totalPages}
                                hasPrevPage={blogData.hasPrevPage}
                                hasNextPage={blogData.hasNextPage}
                            />
                        )}

                    </div>

                    {/* RIGHT SIDE - SIDEBAR */}
                    <div>

                        {sideBarLoading ? (

                            // SIDEBAR LOADING SKELETON
                            <>
                                <AuthorDetailSkeleton />
                                <FeatureCardSkeleton />
                                <CreatingSkeleton />
                            </>

                        ) : sideBarError ? (

                            // SIDEBAR ERROR
                            <p className="text-center text-red-500">
                                Unable to load sidebar content. Please try again later.
                            </p>

                        ) : sideBarData ? (

                            <>

                                {/* FEATURED WRITERS */}
                                {sideBarData.featuredWriters.length === 1 ? (

                                    sideBarData.featuredWriters.map((item) => (
                                        <div
                                            key={item._id}
                                            className="pb-[25px]"
                                        >
                                            <AuthorDetail
                                                name={item.name}
                                                designation={item.designation}
                                                writerImg={item.profileImage}
                                                excerpt={item.aboutMe}
                                                location={item.location}
                                                fbLink={item.fbLink}
                                                twitterLink={item.twitterLink}
                                                instagramLink={item.instagramLink}
                                                LinkedinLink={item.linkedinLink}
                                                slug={item.slug}
                                            />
                                        </div>
                                    ))

                                ) : (

                                    <div className="relative px-3">

                                        <Swiper
                                            modules={[Navigation, Pagination, Autoplay]}
                                            navigation={true}
                                            loop={sideBarData.featuredWriters.length > 1}
                                            pagination={{ clickable: true }}
                                            scrollbar={{ draggable: true }}
                                            spaceBetween={10}
                                            speed={1000}
                                            autoplay={{
                                                delay: 3000,
                                                pauseOnMouseEnter: true,
                                                disableOnInteraction: false,
                                            }}
                                        >

                                            {sideBarData.featuredWriters.map((item) => (
                                                <SwiperSlide
                                                    key={item._id}
                                                    className="h-auto!"
                                                >
                                                    <AuthorDetail
                                                        name={item.name}
                                                        designation={item.designation}
                                                        writerImg={item.profileImage}
                                                        excerpt={item.aboutMe}
                                                        location={item.location}
                                                        fbLink={item.fbLink}
                                                        twitterLink={item.twitterLink}
                                                        instagramLink={item.instagramLink}
                                                        LinkedinLink={item.linkedinLink}
                                                        slug={item.slug}
                                                    />
                                                </SwiperSlide>
                                            ))}

                                        </Swiper>

                                    </div>

                                )}

                                {/* FEATURED BLOGS */}
                                <FeatureCard
                                    featuredBlogs={sideBarData.featuredBlogs}
                                />

                                {/* LATEST BLOGS */}
                                <Creating
                                    latestBlogs={sideBarData.latestBlogs}
                                />

                            </>

                        ) : null}

                    </div>

                </div>
            </div>
        </>
    );
}
