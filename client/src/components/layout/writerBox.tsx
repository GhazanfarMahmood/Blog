// COMPONENTS
import { WriterData } from "@/constants/writer-data";
import Pagination from "./pagingation";

// DATA FROM CONSTANT
import BlogCard from "../cards/blogCard";

export default function WriterBox(){
    return <div 
        className="container mb-16 md:mb-24 lg:mb-28"
    >
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6 lg:gap-y-12">
        {WriterData.map((item) => {
            return <BlogCard title = {item.title} img={item.img} category={item.category} subCategory={item.subCategory} reading={item.reading} authorName={item.authorName} month={item.month} year={item.year} day={item.day} description={item.description} key={item.id} />
        }) }
    </div>
    <Pagination />
    </div>
}