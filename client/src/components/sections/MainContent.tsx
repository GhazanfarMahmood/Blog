"use client";

// COMPONENTS
import { MainData } from "@/data/main-data";
import AuthorDetail from "../cards/AuthorDetail";
import BlogCard from "../cards/BlogCard";
import Creating from "../cards/CreatingCard";
import FeatureCard from "../cards/FeatureCard";
import Technology from "../cards/TechnologyCard";
import WorkExperience from "../cards/WorkExperience";
import Pagination from "./Pagingation";
import { useGetBlogsQuery } from "@/services/api/blogApi";

export default function MainContent() {
    const {data, isLoading, error} = useGetBlogsQuery();

    if(isLoading) {
        return <p>blog data is loading....</p>
    }

    if(error) {
        return <p>Something went wrong.</p>
    }


    console.log(data)
    return <>
        <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(530px,826px)_minmax(370px,382px)] gap-[40px] mb-16 md:mb-24 lg:mb-28">
                <div>
                    <div className="grid grid-cols-1 md:max-lg:grid-cols-2 lg:max-xl:grid-cols-1 xl:grid-cols-2 gap-x-6 gap-y-6 lg:gap-y-12">
                        {data.map((item) =>{
                            return <BlogCard 
                                title = {item.title} 
                                img={item.thumbnail} 
                                category={item.category} 
                                reading={item.reading} 
                                authorName={item.author} 
                                date={item.createdAt}
                                description={item.excerpt} 
                                slug={item.slug}
                                key={item._id}
                            />
                        } )}
                    </div>
                    <Pagination />
                </div>
                <div>
                    <AuthorDetail />
                    <FeatureCard />
                    <WorkExperience />
                    <Technology />
                    <Creating />
                </div>
            </div>
        </div>
    </>
}