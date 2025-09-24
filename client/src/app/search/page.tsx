// COMPONENTS
import BlogCard from "@/components/cards/blogCard";
import BreadCrumb from "@/components/layout/breadCrumb";
import SearchLayout from "@/components/layout/searchLayout";

// SEARCH DATA
import { SearchData } from "@/constants/search-data";

export default function Search(){
    return <>
        <BreadCrumb pageName="Your searched for technology" />
        <SearchLayout />
        <div
            className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6 lg:gap-y-12 mb-16 md:mb-24 lg:mb-28"
        >
            {SearchData.map((item) => {
                return <BlogCard title = {item.title} img={item.img} category={item.category} subCategory={item.subCategory} reading={item.reading} authorName={item.authorName} month={item.month} year={item.year} day={item.day} description={item.description} key={item.id}/>
            })}
        </div>
    </>
}