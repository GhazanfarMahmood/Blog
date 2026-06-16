"use client";

// COMPONENTS
import AuthorDetail from "../cards/AuthorDetail";
import BlogCard from "../cards/BlogCard";
import Creating from "../cards/CreatingCard";
import FeatureCard from "../cards/FeatureCard";
import Technology from "../cards/TechnologyCard";
import PaginationComponent from "./PagingationComponent";

//  HOOOKS
import { useGetBlogsQuery } from "@/services/api/blogApi";
import { useState } from "react";

// USING SWIPER SLIDER
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// SWIPER CSS
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function MainContent() {
    const [page, setPage] = useState(1);
    const {data, isLoading, error} = useGetBlogsQuery({page, limit: 10});
    

    if(isLoading) {
        return <p>blog data is loading....</p>
    }

    if(error) {
        return <p>Something went wrong.</p>
    }

    console.log(data);

    return <>
        <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(530px,826px)_minmax(370px,382px)] gap-[40px] mb-16 md:mb-24 lg:mb-28">
                <div>
                    <div className="grid grid-cols-1 md:max-lg:grid-cols-2 lg:max-xl:grid-cols-1 xl:grid-cols-2 gap-x-6 gap-y-6 lg:gap-y-12">
                        {data?.blogs.map((item) =>{
                            return <BlogCard 
                                title = {item.title} 
                                img={item.thumbnail} 
                                category={item.category} 
                                reading={item.reading} 
                                author={item.author}
                                date={item.createdAt}
                                description={item.excerpt} 
                                slug={item.slug}
                                key={item._id}
                            />
                        } )}
                    </div>
                    <PaginationComponent setPage={setPage} currentPage={data?.currentPage} totalPages={data?.totalPages} hasPrevPage={data?.hasPrevPage} hasNextPage={data?.hasNextPage} />
                </div>
                <div>
                    {!data?.featuredAuthor.length ?  
                        <>
                        {data?.featuredAuthor.map((item) => {
                           return <AuthorDetail
                            name={item.name}
                            designation={item.designation}
                            writerImg={item.writerImg}
                            excerpt={item.excerpt}
                            location={item.location}
                            fbLink={item.fbLink}
                            twitterLink={item.twitterLink}
                            instagramLink={item.instagramLink}
                            LinkedinLink={item.LinkedinLink}
                            slug={item.slug}
                            key={item._id}
                           />
                        })}
                        </>
                    : <div
                            className="relative px-3"
                        >
                            <Swiper
                                modules={[Navigation, Pagination, Autoplay]}
                                navigation={true}
                                loop={true}
                                pagination={{ clickable: true }}
                                scrollbar={{ draggable: true }}
                                spaceBetween={10}
                                speed={1000}
                                autoplay={{
                                    delay: 3000,
                                    pauseOnMouseEnter: true,
                                    disableOnInteraction: false,
                                }}
                            >
                                {data?.featuredAuthor.map((item) => {
                                    return <SwiperSlide key={item._id} className="h-auto!">
                                        <AuthorDetail   
                                            name={item.name}
                                            designation={item.designation}
                                            writerImg={item.writerImg}
                                            excerpt={item.excerpt}
                                            location={item.location}
                                            fbLink={item.fbLink}
                                            twitterLink={item.twitterLink}
                                            instagramLink={item.instagramLink}
                                            LinkedinLink={item.LinkedinLink} 
                                            slug={item.slug}
                                        />
                                    </SwiperSlide>
                                })}
                            </Swiper>
                        </div> }
                    <FeatureCard featuredBlogs={data?.featuredBlogs} />
                    {/* <Technology /> */}
                    <Creating />
                </div>
            </div>
        </div>
    </>
}