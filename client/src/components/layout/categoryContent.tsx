// CATEGORY CARD COMPONENT
import CategoryCard from "../cards/categoryCard";

import { CategoryData } from "@/constants/category-data";

export default function CategoryContent(){
    return <>
        <div 
            className="container mb-16 md:mb-24 lg:mb-28"
        >
            <h1
                className="text-primary text-[42px] md:text-[44px] lg:text-[52px] font-bold leading-[1.2] -tracking-[0.04em] mb-4 sm:mb-5 md:mb-6 lg:mb-8"
            >
                Categories
            </h1>
            <div className="max-w-[410px] sm:max-w-none grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto sm:mx-0">
                {CategoryData.map((item) => {
                    return <CategoryCard mainImg={item.img} icon={item.icon} name={item.name} key={item.id} />
                })}
            </div>
        </div>
    </>
}