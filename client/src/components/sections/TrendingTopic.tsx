"use client";

// HOOK
import { useGetCategoryQuery } from "@/services/api/categoryApi";

// LINK
import Link from "next/link";

export default function TrendingTopic (){
    const {data, isLoading, error} = useGetCategoryQuery();

    if(isLoading) {
        return <p>Category is loading</p>
    }
    
    if(error) {
        return <p>Some type of error is coming</p>
    }

    return <div 
            className="container"
        >
        <div 
            className="max-w-[940px] mx-auto mb-16 sm:mb-[75px] md:mb-[88px]"
        >
            <h2 
                className="text-xs text-center font-extrabold uppercase tracking-[1.2px] text-para leading-[1.2] mb-8"
            >
                Explore Trending Topics
            </h2>
            <ul 
                className="flex items-center justify-center flex-wrap gap-4 sm:gap-5"
            >
                {data?.map((links) => {
                    return <li key={links._id}>
                        <Link href={`/category/${links.slug}`} aria-label={`${links.categoryName}-link`}
                            className="flex items-center justify-center gap-1.5 text-base sm:text-lg font-bold leading-[1.2] capitalize -tracking-[0.72px] text-primary bg-light p-[9px_15px] sm:p-[11px_19px_11px_17px] border border-transparent rounded-[100px] shadow-search-field transition-all duration-[0.25s] ease-in hover:shadow-hover dark:border-br dark:bg-heading dark:hover:bg--link-bg dark:hover:opacity-70"
                        >
                            {links.icon}
                            {links.categoryName}
                        </Link>
                    </li>
                })}
            </ul>
        </div>
    </div>
}