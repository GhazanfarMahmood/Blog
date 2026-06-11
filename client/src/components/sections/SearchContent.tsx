"use client";

import BreadCrumb from "./BreadCrumb"
import SearchLayout from "./SearchLayout"
import BlogCard from "../cards/BlogCard"
import { useGetBlogsBySearchQuery } from "@/services/api/blogApi";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import PaginationComponent from "./PagingationComponent";

export default function SearchContent(){
    const [page, setPage] = useState(1);
    const searchParams = useSearchParams();
    const query = searchParams.get("q") || "";
    const {data, isLoading, error} = useGetBlogsBySearchQuery({query, page, limit: 12})
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
        {!data?.blogs.length ?  
            <div className="container flex items-center justify-center my-12">
                <h1 className="text-[35px] xs:text-[50px] md:text-[80px] xl:text-9xl font-extrabold bg-clip-text text-transparent bg-linear-(--linear-bg) text-center dark:text-dark">No Blog Found</h1>
            </div>
            : 
            <div className="container mb-16 md:mb-24 lg:mb-28">
                <div
                    className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6 lg:gap-y-12"
                >
                    {
                        data?.blogs.map((item) => {
                            return <BlogCard title = {item.title} img={item.thumbnail} category={item.category} reading={item.reading} author={item.author} date={item.createdAt} description={item.excerpt} slug={item.slug} key={item._id}/>
                        })
                    }
                </div>
                <PaginationComponent setPage={setPage} currentPage={data?.currentPage} totalPages={data?.totalPages} hasPrevPage={data?.hasPrevPage} hasNextPage={data?.hasNextPage} />
            </div>
        }
    </>
}