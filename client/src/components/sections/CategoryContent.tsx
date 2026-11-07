"use client";

// HOOK
import { useGetCategoryQuery } from "@/services/api/categoryApi";

// COMPONENTS
import CategoryCard from "../cards/CategoryCard";
import Skeleton from "@/components/ui/Skeleton";

// CATEGORY CARD SKELETON
function CategoryCardSkeleton() {
    return (
        <div className="h-[348px] lg:h-[368px] rounded-2xl relative overflow-hidden">
            <Skeleton
                width="100%"
                height="100%"
                rounded="2xl"
            />

            <Skeleton
                width="150px"
                height="44px"
                rounded="full"
                className="absolute bottom-8 left-2/4 -translate-x-2/4"
            />
        </div>
    );
}

export default function CategoryContent() {
    const { data, isLoading, error } = useGetCategoryQuery();

    return (
        <div className="container mb-16 md:mb-24 lg:mb-28">
            <h1 className="text-primary text-[42px] md:text-[44px] lg:text-[52px] font-bold leading-[1.2] -tracking-[0.04em] mb-4 sm:mb-5 md:mb-6 lg:mb-8">
                Categories
            </h1>

            {isLoading ? (
                // LOADING SKELETON
                <div className="max-w-[410px] sm:max-w-none grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto sm:mx-0">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <CategoryCardSkeleton key={index} />
                    ))}
                </div>
            ) : error ? (
                // ERROR STATE
                <p className="text-center text-para py-10">
                    Unable to load categories. Please try again later.
                </p>
            ) : data && data.length > 0 ? (
                // CATEGORY CARDS
                <div className="max-w-[410px] sm:max-w-none grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto sm:mx-0">
                    {data.map((item) => (
                        <CategoryCard
                            mainImg={item.image}
                            icon={item.icon}
                            name={item.categoryName}
                            slug={item.slug}
                            key={item._id}
                        />
                    ))}
                </div>
            ) : (
                // EMPTY STATE
                <p className="text-center text-para py-10">
                    No categories found.
                </p>
            )}
        </div>
    );
}