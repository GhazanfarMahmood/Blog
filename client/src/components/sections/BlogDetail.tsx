"use client";

// NEXT JS IMAGE AND LINK
import Link from "next/link";

// COMPONENTS
import { NextBlogData } from "@/data/next-blog";
import BlogCard from "../cards/BlogCard";
import ArticleNavigation from "./ArticleNavigation";
import { ArticleNavigationData } from "@/data/article-navigation";
import BlogComment from "./BlogComment";
import Image from "next/image";
import SideLink from "./SideLink";
import AuthorDetail from "../cards/AuthorDetail";
import FeatureCard from "../cards/FeatureCard";
import WorkExperience from "../cards/WorkExperience";
import Technology from "../cards/TechnologyCard";
import Creating from "../cards/CreatingCard";

// IMAGE FROM ASSETS
import blog_detail_img1 from "@/assets/images/blog-detail-img1.webp";
import blog_detail_img2 from "@/assets/images/blog-detail-img2.webp";
import { BlogDetailType } from "@/@types/blog-type";


export default function BlogDetailPage(
    {
        title, 
        author, 
        category, 
        excerpt, 
        createdAt, 
        reading, 
        thumbnail, 
        content
    }: BlogDetailType
){
    const dateFormatter = new Date(createdAt).toLocaleDateString("en-US", {
        day : "numeric",
        month : "long",
        year : "numeric",
    })
    return <>
        <div 
            className="container"
        >
            <div 
                className="flex items-center justify-center gap-1.5 mb-2.5"
            >
                <Link aria-label={`${author}-authorName`} href={"/"}
                    className="text-[15px] font-semibold leading-[1.2] -tracking-[0.02em] text-secondary capitalize transition-all duration-[0.25s] ease-in hover:text-primary dark:text-dark dark:hover:text-para" 
                >
                    {author}
                </Link>
                <span 
                    className="text-[15px] font-semibold leading-[1.2] -tracking-[0.02em] text-para capitalize"
                >
                    on {dateFormatter}
                </span>
            </div>
            <h2
                className="max-w-[720px] text-primary text-[42px] md:text-[44px] lg:text-[52px] font-bold leading-[1.2] -tracking-[0.04em] text-center mx-auto mb-2.5"
            >
                {title}
            </h2>
            <p
                className="max-w-[640px] text-lg text-center text-primary text-balance leading-[1.55] mx-auto opacity-70"
            >
                {excerpt}
            </p>
            <Link aria-label="category-link" href={"/"}
                className="block w-fit text-[11px] font-extrabold leading-[1.2] uppercase tracking-[0.1em] text-nowrap text-primary bg-light dark:bg-transparent p-[5px_10px] rounded-md mx-auto mt-6 mb-[27px] dark:border dark:border-br shadow-links dark:shadow-none transition-all duration-[0.25s] ease-in hover:text-para hover:shadow-link-hover hover:opacity-70 dark:hover:text-primary"    
            >
                {category}
            </Link>
            <div>
                <Image src={thumbnail} alt="blog-detail-img" width={1248} height={702}
                    className="w-full h-[702px] object-cover rounded-2xl"
                />
            </div>
            <div 
                className="grid grid-cols-1 lg:grid-cols-[minmax(80px,80px)_minmax(481px,746px)_minmax(340px,382px)] gap-5 xl:gap-10 mt-16 mb-16 md:mb-24 lg:mb-28"
            >
                <div 
                    className="hidden lg:block"
                >
                    <SideLink reading={reading} />
                </div>
                <div>
                    <div
                        className="[&_p]:text-lg [&_p]:leading-[1.55] [&_p]:text-primary [&_p]:mb-7
                        [&_strong]:text-lg [&_strong]:text-primary [&_strong]:font-extrabold [&_strong]:leading-[1.55]
                        [&_a]:text-lg [&_a]:text-secondary [&_a]:font-extrabold [&_a]:leading-[1.55] [&_a]:underline dark:[&_a]:text-dark
                        [&_ul]:pl-7 [&_ul]:mt-3.5 [&_ul]:mb-7 [&_ul]:marker:text-secondary dark:[&_ul]:marker:text-dark
                        [&_li]:text-lg [&_li]:text-primary [&_li]:leading-[1.55] [&_li]:list-disc [&_li]:mb-2
                        [&_small]:block [&_small]:text-sm [&_small]:text-para [&_small]:mt-2.5
                        [&_img]:w-full [&_img]:h-full [&_img]:object-cover [&_img]:rounded-2xl
                        [&_h3]:text-[33px] md:[&_h3]:text-[42px] [&_h3]:text-primary [&_h3]:font-bold [&_h3]:leading-[1.2] [&_h3]:-tracking-[0.04rem] [&_h3]:mt-7 [&_h3]:mb-3.5
                        [&_h4]:text-[24px] md:[&_h4]:text-[33px] [&_h4]:text-primary [&_h4]:font-bold [&_h4]:leading-[1.2] [&_h4]:-tracking-[0.04rem] [&_h4]:mt-7 [&_h4]:mb-3.5
                        [&_blockquote]:text-light [&_blockquote]:bg-primary [&_blockquote]:p-8 [&_blockquote]:rounded-2xl [&_blockquote]:my-7 [&_blockquote]:relative 
                        [&_blockquote>p]:text-light [&_blockquote>p]:text-2xl [&_blockquote>p]:font-bold [&_blockquote>p]:leading-[1.2] [&_blockquote>p]:-tracking-[0.04em] [&_blockquote>p]:mt-[30px] 
                        dark:[&_blockquote>p]:text-dark
                        [&_blockquote]:after:font-bold [&_blockquote]:after:leading-[1.2]
                        [&_blockquote]:after:text-[52px] [&_blockquote]:after:absolute [&_blockquote]:after:top-[19px] [&_blockquote]:after:left-[31px] [&_blockquote]:after:inline-block [&_blockquote]:after:content-['“'] dark:[&_blockquote]:bg-heading
                        dark:[&_blockquote]:text-dark
                        [&_blockquote>span]:block [&_blockquote>span]:font-bold [&_blockquote>span]:text-light [&_blockquote>span]:opacity-70 [&_blockquote>span]:text-xs [&_blockquote>span]:uppercase [&_blockquote>span]:leading-[1.2] [&_blockquote>span]:tracking-widest
                        dark:[&_blockquote>span]:text-dark
                        "
                    >
                        <p
                            className="whitespace-pre-line"
                        >
                            {content}
                        </p>
                    </div>
                    <div
                        className="flex items-center justify-between flex-wrap lg:flex-nowrap gap-4 mt-12 pb-6 border-b border-b-br"
                    >
                        <div 
                            className="flex items-center justify-center gap-1.5 mb-2.5"
                        >
                            <Link aria-label={`${author}-authorName`} href={"/"}
                                className="text-[15px] font-semibold leading-[1.2] -tracking-[0.02em] text-secondary capitalize transition-all duration-[0.25s] ease-in hover:text-primary dark:text-dark dark:hover:text-para" 
                            >
                                {author}
                            </Link>
                            <span 
                                className="text-[15px] font-semibold leading-[1.2] -tracking-[0.02em] text-para capitalize"
                            >
                                on {dateFormatter}
                            </span>
                        </div>
                        <Link aria-label="category-link" href={"/"}
                            className="block w-fit text-[11px] font-extrabold leading-[1.2] uppercase tracking-[0.1em] text-nowrap text-primary bg-light dark:bg-transparent p-[5px_10px] rounded-md dark:border dark:border-br shadow-links dark:shadow-none transition-all duration-[0.25s] ease-in hover:text-para hover:shadow-link-hover hover:opacity-70 dark:hover:text-primary"    
                        >
                            {category}
                        </Link>
                        <div
                            className="w-full order-3 block lg:hidden"
                        >
                            <SideLink reading={reading} />
                        </div>
                    </div>
                    <div
                        className="flex flex-col sm:flex-row justify-center gap-6 mt-6"
                    >
                        {ArticleNavigationData.map((item) => {
                            return <ArticleNavigation key={item.id} title={item.title} id={item.id} />
                        })}
                    </div>
                    <BlogComment />
                </div>
                <div>
                    <AuthorDetail />
                    <FeatureCard />
                    <WorkExperience />
                    <Technology />
                    <Creating />
                </div>
            </div>  
            <div>
                <h3
                    className="text-[33px] text-primary font-bold leading-[1.2] -tracking-[0.04em] capitalize mb-6 sm:mb-8"
                >Read Next</h3>
                <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6 lg:gap-y-12 mb-16 md:mb-24 lg:mb-28"
                >
                    {/* {NextBlogData.map((data) => {
                        return <BlogCard title={data.title} img={data.img} category={data.category} subCategory={data.subCategory} reading={data.reading} authorName={data.authorName} month={data.month} year={data.year} day={data.day} description={data.description} key={data.id} />
                    })} */}
                </div>
            </div>
        </div>
    </>
}