"use client";

import { SearchData } from "@/data/search-data"
import BreadCrumb from "./BreadCrumb"
import SearchLayout from "./SearchLayout"
import BlogCard from "../cards/BlogCard"
import { useGetBlogsBySearchQuery } from "@/services/api/blogApi";
import { useSearchParams } from "next/navigation";

export default function SearchContent(){
    const searchParams = useSearchParams();
    const query = searchParams.get("q") || "";
    const {data, isLoading, error} = useGetBlogsBySearchQuery(query)
    if(isLoading) {
        return <p>Loading</p>
    }

    if(error) {
        return <p>some type of error</p>
    }

    console.log(data)
    return <>
        <BreadCrumb pageName="Your searched for technology" />
        <SearchLayout name={query} />
        <div
            className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6 lg:gap-y-12 mb-16 md:mb-24 lg:mb-28"
        >
        {data?.map((item) => {
            return <BlogCard title = {item.title} img={item.thumbnail} category={item.category} reading={item.reading} author={item.author} date={item.createdAt} description={item.excerpt} slug={item.slug} key={item._id}/>
        })}
    </div>
    </>
}