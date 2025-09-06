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
import { FeatureSlider } from "@/constants/main-data";

export default function FeatureCard(){
    return <>
        <div 
            className="relative px-3"
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
                autoplay={{
                    delay: 3000,
                    pauseOnMouseEnter: true,
                    disableOnInteraction: false,
                }}
            >
                {FeatureSlider.map((item) => {
                    return <SwiperSlide key={item.id}>
                        <div 
                            className="h-[300px] rounded-2xl overflow-hidden relative group"
                        >
                            <Link href={"/"} aria-label={item.title} 
                                className="absolute top-0 left-0 w-full h-full after:w-full after:h-full after:bg--feature-bg after:absolute after:top-0 after:left-0 after:z-[1] after:content-['']after:transition-all after:duration-[0.25s] after:ease-in group-hover:after:bg-"
                            >
                                <Image src={item.sliderImg} alt="feature-img" width={370} height={300}
                                    className="w-full h-full object-cover"
                                />
                            </Link>
                            <Link href={"/"} aria-label={item.category}
                                className="text-[11px] font-extrabold text-light leading-[1.2] tracking-widest uppercase bg--feature-li-bg p-[5px_10px] rounded-md absolute top-6 left-7 z-[2]"
                            >
                                {item.category}
                            </Link>
                            <div
                                className="absolute bottom-7 left-7 right-7 z-[2]"
                            >
                                <span
                                    className="flex items-center justify-start gap-[5px] mt-auto"
                                >
                                    <Link href={"/"} aria-label={item.authorName}
                                        className="text-[15px] text-light font-semibold leading-[1.2] -tracking-[0.02em] capitalize opacity-100! transition-all duration-[0.25s] ease-in hover:opacity-70!"
                                    >
                                        {item.authorName}
                                    </Link>
                                    <div className="flex items-center justify-start gap-[5px] text-[15px] font-semibold leading-[1.2] text-light opacity-70">
                                        on
                                        <span>{`${item.month} ${item.date}, ${item.year}`}</span>
                                    </div>
                                </span>
                                <Link href={"/"} aria-label={item.title}
                                    className="block text-[21px] font-bold leading-[1.2] -tracking-[0.04em] text-light mt-2 transition-all duration-[0.25s] ease-in hover:opacity-70"
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