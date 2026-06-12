'use client';

// NEXT JS IMAGE AND LINK
import Image from "next/image";
import Link from "next/link";

// USING SWIPER SLIDER
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// SWIPER CSS
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// SLIDER DATA
import { BlogContentType } from "@/@types/blog-type";

export default function FeatureCard({featuredBlogs} : {featuredBlogs: BlogContentType[] | undefined}){
    return <>
        <div 
            className="max-w-[450px] lg:max-w-none relative px-3 mx-auto lg:mx-0"
        >
            <span
                className="block text-xs font-extrabold leading-[1.2] tracking-widest uppercase text-para mb-5"
            >
                Featured posts
            </span>
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                navigation={true}
                loop={true}
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                spaceBetween={10}
                autoplay={{
                    delay: 3000,
                    pauseOnMouseEnter: true,
                    disableOnInteraction: false,
                }}
            >
                {featuredBlogs?.map((item) => {
                    return <SwiperSlide key={item._id}>
                        <div 
                            className="h-[300px] rounded-2xl overflow-hidden relative group"
                        >
                            <Link href={"/"} aria-label={item.title} 
                                className="absolute top-0 left-0 w-full h-full after:w-full after:h-full after:bg--feature-bg after:absolute after:top-0 after:left-0 after:z-[1] after:content-['']after:transition-all after:duration-[0.25s] after:ease-in group-hover:after:bg-"
                            >
                                <Image src={item.thumbnail} alt="feature-img" width={370} height={300}
                                    className="w-full h-full object-cover"
                                />
                            </Link>
                            <div 
                                className="flex items-center justify-start gap-2 absolute top-6 left-7 z-[2]"
                            >
                                {item?.category.map((item => {
                                    return <Link href={`/category/${item.slug}`} aria-label={item.categoryName} key={item._id}
                                    className="text-[11px] font-extrabold text-light leading-[1.2] tracking-widest uppercase bg--feature-li-bg p-[5px_10px] rounded-md dark:text-dark"
                                >
                                    {item.categoryName}
                                </Link>
                                }))}
                            </div>
                            
                            <div
                                className="absolute bottom-7 left-7 right-7 z-[2]"
                            >
                                <span
                                    className="flex items-center justify-start gap-[5px] mt-auto"
                                >
                                    <Link href={`/writer/${item.author?.slug}`} aria-label={item.author?.name}
                                        className="text-[15px] text-light font-semibold leading-[1.2] -tracking-[0.02em] capitalize opacity-100! transition-all duration-[0.25s] ease-in hover:opacity-70! dark:text-dark"
                                    >
                                        {item.author?.name}
                                    </Link>
                                    <div className="flex items-center justify-start gap-[5px] text-[15px] font-semibold leading-[1.2] text-light opacity-70 dark:text-dark">
                                        on
                                        <span>
                                            {new Date(item.createdAt).toLocaleDateString("en-US", {
                                                day : "numeric",
                                                month : "long",
                                                year : "numeric"
                                            })}
                                        </span>
                                    </div>
                                </span>
                                <Link href={`/blog/${item.slug}`} aria-label={item.title}
                                    className="block text-[21px] font-bold leading-[1.2] -tracking-[0.04em] text-light mt-2 transition-all duration-[0.25s] ease-in hover:opacity-70 dark:text-dark"
                                >
                                    {item.title}
                                </Link>
                            </div>
                        </div>
                    </SwiperSlide>
                })}
                
            </Swiper>
        </div>
    </>
}