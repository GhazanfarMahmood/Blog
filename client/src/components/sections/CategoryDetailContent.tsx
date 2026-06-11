"use client";

// COMPONENTS
import { useParams } from "next/navigation";
import BlogCard from "../cards/BlogCard";
import CategoryDetailInfo from "./CategoryDetailInfo";

// API TO FETCH DATA
import { useState } from "react";
import { useGetCategoryBySlugQuery } from "@/services/api/categoryApi";
import { useGetBlogsByCategoryQuery } from "@/services/api/blogApi";
import PaginationComponent from "./PagingationComponent";

export default function CategoryDetailContent(){
    const [page, setPage] = useState(1);
    const params = useParams();
    const slug = params.slugs as string;

    const {data : category} = useGetCategoryBySlugQuery(slug);
    const {data : blogData, isLoading} = useGetBlogsByCategoryQuery({slug, limit : 12, page});

    if(!category || isLoading) {
        return <p>page is loading</p>
    }
    const {categoryName, description, image} = category;

    console.log(blogData);

    return <>
        <CategoryDetailInfo img={image} title={categoryName} description={description} />
        <div className="container mb-16 md:mb-24 lg:mb-28">
            <div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6 lg:gap-y-12"
            >
                {blogData?.blogs.map((item) => {
                    return <BlogCard title={item.title} img={item.thumbnail} category={item.category} reading={item.reading} author={item.author} date={item.createdAt} description={item.excerpt} slug={item.slug} key={item._id} />
                })}
            </div>
            <PaginationComponent setPage={setPage} currentPage={blogData?.currentPage} totalPages={blogData?.totalPages} hasPrevPage={blogData?.hasPrevPage} hasNextPage={blogData?.hasNextPage} />
        </div>
    </>
}