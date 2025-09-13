// COMPONENTS
import BlogCard from "../cards/blogCard";
import CategoryDetailInfo from "./categoryDetailInfo";

// IMAGES AND ICONS
import detail_info_img from "@/assets/images/detailInfoImg.webp"

// DETAIL CATEGORY DATA
import { DetailCategory } from "@/constants/detail-category";

export default function CategoryDetailContent(){
    return <>
        <CategoryDetailInfo img={detail_info_img} title={"technology"} description={"Stay ahead of the curve with the newest developments in technology, from cutting-edge gadgets to breakthroughs in AI, cybersecurity, and beyond."} />
        <div className="container">
            <div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6 lg:gap-y-12 mb-16 md:mb-24 lg:mb-28"
            >
                {DetailCategory.map((item) => {
                    return <BlogCard title={item.title} img={item.img} category={item.category} subCategory={item.subCategory} reading={item.reading} authorName={item.authorName} month={item.month} year={item.year} day={item.day} description={item.description} key={item.id} />
                })}
            </div>
        </div>
    </>
}