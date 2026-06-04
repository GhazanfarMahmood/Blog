"use client";

// COMPONENTS
import { useParams } from "next/navigation";
import BlogCard from "../cards/BlogCard";
import CategoryDetailInfo from "./CategoryDetailInfo";

// IMAGES AND ICONS

// DETAIL CATEGORY DATA
import { DetailCategory } from "@/data/detail-category";
import { useGetCategoryBySlugQuery } from "@/services/api/categoryApi";
import { useGetBlogsByCategoryQuery } from "@/services/api/blogApi";

export default function CategoryDetailContent(){
    const params = useParams();
    const slug = params.slugs as string;

    const {data : category} = useGetCategoryBySlugQuery(slug);
    const {data : blogs, isLoading} = useGetBlogsByCategoryQuery(slug);

    if(!category || isLoading) {
        return <p>page is loading</p>
    }
    const {categoryName, description, image} = category;

    return <>
        <CategoryDetailInfo img={image} title={categoryName} description={description} />
        <div className="container">
            <div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6 lg:gap-y-12 mb-16 md:mb-24 lg:mb-28"
            >
                {blogs?.map((item) => {
                    return <BlogCard title={item.title} img={item.thumbnail} category={item.category} reading={item.reading} author={item.author} date={item.createdAt} description={item.excerpt} slug={item.slug} key={item._id} />
                })}
            </div>
        </div>
    </>
}