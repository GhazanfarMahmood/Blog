"use client";

import { BlogDetailType } from "@/@types/blog-type";
// COMPONENTS
import BlogDetailPage from "@/components/sections/BlogDetail";
import BreadCrumb from "@/components/sections/BreadCrumb";
import { useGetBlogsBySlugQuery } from "@/services/api/blogApi";
import { useParams } from "next/navigation";


export default function BlogDetail() {
    const params = useParams();
    const slug = params.slug as string;
    const {data, isLoading, error} = useGetBlogsBySlugQuery(slug);

    if(isLoading) {
        return <p>page is loading...</p>
    }

    if(error) {
        return <p>some type of error is coming...</p>
    }
    
    if(!data) {
        return  <p>Blog not found</p>;
    }

    const {title, author, category, excerpt, createdAt, reading, thumbnail, content}: BlogDetailType = data;

    return <>
        <div
            className="[&_ul]:justify-center"
        >
            <BreadCrumb pageName={title} subPageName="Startups" />
        </div>
        <BlogDetailPage
            title={title}
            author={author}
            category={category}
            excerpt={excerpt}
            createdAt={createdAt}
            reading={reading}
            thumbnail={thumbnail}
            content={content}
        />
    </>
}