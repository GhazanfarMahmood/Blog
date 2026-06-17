"use client";

import { BlogDetailType } from "@/@types/blog-type";
import { useGetBlogsBySlugQuery } from "@/services/api/blogApi";
import { useParams } from "next/navigation";

// COMPONENTS
import BlogDetailPage from "@/components/sections/BlogDetail";
import BreadCrumb from "@/components/sections/BreadCrumb";
import { ExtendBlogType } from "@/@types/extend-blog-type";


export default function BlogDetailContent(){
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

    const {blog, previousBlog, nextBlog}: ExtendBlogType = data;


    return <>
     <div
            className="[&_ul]:justify-center"
        >
            <BreadCrumb pageName={data?.blog.title} subPageName="Startups" />
        </div>
        <BlogDetailPage
            blog={blog}
            previousBlog={previousBlog}
            nextBlog={nextBlog}
        />
    </>
}