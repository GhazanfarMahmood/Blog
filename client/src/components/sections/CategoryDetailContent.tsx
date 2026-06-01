"use client";

// COMPONENTS
import { useParams } from "next/navigation";
import BlogCard from "../cards/BlogCard";
import CategoryDetailInfo from "./CategoryDetailInfo";

// IMAGES AND ICONS

// DETAIL CATEGORY DATA
import { DetailCategory } from "@/data/detail-category";
import { useGetCategoryBySlugQuery } from "@/services/api/categoryApi";

export default function CategoryDetailContent(){
    const params = useParams();
    const slug = params.slugs as string;

    console.log(params)
    const {data, isLoading, error} = useGetCategoryBySlugQuery(slug);

    if(isLoading) {
        return <p>page is loading</p>
    }

    if(error) {
        return <p>Some type of error is coming</p>
    }

    if(!data) {
        return  <p>Blog not found</p>;
    }

    const {categoryName, description, image} = data;
    return <>
        <CategoryDetailInfo img={image} title={categoryName} description={description} />
        <div className="container">
            <div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6 lg:gap-y-12 mb-16 md:mb-24 lg:mb-28"
            >
                {DetailCategory.map((item) => {
                    return <BlogCard title={item.title} img={item.img} category={item.category} reading={item.reading} authorName={item.authorName} date={item.date} description={item.description} slug={item.slug} key={item.id} />
                })}
            </div>
        </div>
    </>
}