"use client";

// COMPONENTS
import AboutCard from "@/components/cards/AboutCard";
import AboutContent from "@/components/sections/AboutContent";
import AboutLayout from "@/components/sections/AboutLayout";
import BreadCrumb from "@/components/sections/BreadCrumb";

// ABOUT DATA
import { AboutData } from "@/data/about-data";
import { useGetAboutQuery } from "@/services/api/aboutApi";

export default function AboutDetailContent () {
    const {data, isLoading, error} = useGetAboutQuery();

    if(isLoading) {
        return <p>Data is loading...</p>
    }

    if(error) {
        return <p>Some type of error is coming.</p>
    }
    return <>
        <BreadCrumb pageName="About" />
        <AboutLayout title={data?.title} images={data?.images} />
        <AboutContent description={data?.description} />
        <div
            className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 md:mb-24 lg:mb-28"
        >
            {data?.moreContent.map((item) => {
                return <AboutCard title={item.title} img={item.icon} description={item.excerpt} key={item._id} />
            })}        
        </div>
    </>
}