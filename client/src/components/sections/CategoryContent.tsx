"use client";

// CATEGORY CARD COMPONENT
import { useGetCategoryQuery } from "@/services/api/categoryApi";
import CategoryCard from "../cards/CategoryCard";

// CATEGORY DATA
import { CategoryData } from "@/data/category-data";

export default function CategoryContent(){
    const {data, isLoading, error} = useGetCategoryQuery();

    if(isLoading) {
        return <p>Loading...</p>
    }

    if(error) {
        return <p>Error</p>
    }
    return <>
        <div 
            className="container mb-16 md:mb-24 lg:mb-28"
        >
            <h1
                className="text-primary text-[42px] md:text-[44px] lg:text-[52px] font-bold leading-[1.2] -tracking-[0.04em] mb-4 sm:mb-5 md:mb-6 lg:mb-8"
            >
                Categories
            </h1>
            <div className="max-w-[410px] sm:max-w-none grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto sm:mx-0">
                {data?.map((item) => {
                    return <CategoryCard mainImg={item.image} icon={item.icon} name={item.categoryName} slug={item.slug} key={item._id} />
                })}
            </div>
        </div>
    </>
}