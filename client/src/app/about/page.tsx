// COMPONENTS
import AboutCard from "@/components/cards/aboutCard";
import AboutContent from "@/components/sections/AboutContent";
import AboutLayout from "@/components/sections/AboutLayout";
import BreadCrumb from "@/components/sections/BreadCrumb";

// ABOUT DATA
import { AboutData } from "@/data/about-data";

export default function AboutUs(){
    return <>
        <BreadCrumb pageName="About" />
        <AboutLayout />
        <AboutContent />
        <div
            className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 md:mb-24 lg:mb-28"
        >
            {AboutData.map((item) => {
                return <AboutCard title={item.title} img={item.img} description={item.description} key={item.id} />
            })}        
        </div>
    </>
}