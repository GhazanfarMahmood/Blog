// COMPONENTS
import AboutCard from "@/components/cards/aboutCard";
import AboutContent from "@/components/layout/aboutContent";
import AboutLayout from "@/components/layout/aboutLayout";
import BreadCrumb from "@/components/layout/breadCrumb";

// ABOUT DATA
import { AboutData } from "@/constants/about-data";

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