// TRENDING DATA
import { trendingData } from "@/constants/trending-data";

// LINK AND IMAGE FROM NEXT LINK
import Image from "next/image";
import Link from "next/link";

export default function TrendingTopic (){
    return <div 
            className="container"
        >
        <div 
            className="max-w-[940px] mx-auto mb-16 sm:mb-[75px] md:mb-[88px]"
        >
            <h2 
                className="text-xs text-center font-extrabold uppercase tracking-[1.2px] text-para leading-[1.2] mb-8"
            >
                Explore Trending Topics
            </h2>
            <ul 
                className="flex items-center justify-center flex-wrap gap-4 sm:gap-5"
            >
                {trendingData.map((links) => {
                    return <li key={links.id}>
                        <Link href={"/"} aria-label={`${links.name}-link`}
                            className="flex items-center justify-center gap-1.5 text-base sm:text-lg font-bold leading-[1.2] capitalize -tracking-[0.72px] text-primary bg-light p-[9px_15px] sm:p-[11px_19px_11px_17px] border border-transparent rounded-[100px] shadow-search-field transition-all duration-[0.25s] ease-in hover:shadow-hover dark:border-br dark:bg-heading dark:hover:bg--link-bg dark:hover:opacity-70"
                        >
                            <Image src={links.image} alt={`${links.name}-icon`} width={24} height={24} 
                                className="dark:filter-(--filter-dark)"
                            />
                            {links.name}
                        </Link>
                    </li>
                })}
            </ul>
        </div>
    </div>
}