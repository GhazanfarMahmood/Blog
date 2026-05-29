"use client";

// COMPONENTS
import BlogDetailPage from "@/components/sections/BlogDetail";
import BreadCrumb from "@/components/sections/BreadCrumb";
import { useGetBlogsBySlugQuery } from "@/services/api/blogApi";
import { useParams } from "next/navigation";


export default function BlogDetail() {
    const params = useParams();
    const {data, isLoading, error} = useGetBlogsBySlugQuery(params.slug);

    if(isLoading) {
        return <p>page is loading...</p>
    }

    if(error) {
        return <p>some type of error is coming...</p>
    }
    
    const {title, author, category, excerpt, createdAt, reading, thumbnail, content} = data;

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