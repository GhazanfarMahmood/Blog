import Image from "next/image";
import Link from "next/link";

// ICONS
import { AiFillClockCircle } from "react-icons/ai";

import { MainData } from "@/constants/main-data";

export default function BlogCard(){
    return <>
        {MainData.map((data) => {    
            return <div key={data.id}
                className="group"
            >
                <div 
                    className="mb-5 relative"
                >
                    <Link href={"/"} aria-label={data.title}>
                        <Image src={data.img} alt={data.title} width={400} height={225} 
                            className="w-full h-[225px] object-cover rounded-2xl" 
                        />
                    </Link>
                    <div 
                        className="w-full flex flex-wrap items-center justify-start gap-2 absolute top-5 px-5 [&_a]:text-[11px] [&_a]:font-extrabold [&_a]:uppercase [&_a]:text-heading [&_a]:leading-[1.2] [&_a]:tracking-widest [&_a]:bg-light [&_a]:p-[5px_11px] [&_a]:rounded-md [&_a]:dark:bg-dark"
                    >
                        <Link href={"/"} aria-label={`${data.category}-link`}>{data.category}</Link>
                        {
                            data.subCategory && 
                            <Link href={"/"} aria-label={`${data.subCategory}-link`}>{data.subCategory}</Link>
                        }
                        <span
                            className="flex items-center justify-center gap-1 bg--bg-clock text-[15px] font-semibold leading-[1.2] text-light p-[5px_7px] rounded-[100px] xs:ml-auto opacity-0 invisible transition-all duration-[0.25s] ease-in group-hover:opacity-100 group-hover:visible dark:text-dark"
                        >
                            <span>
                                <AiFillClockCircle />
                            </span>
                            {data.reading} Min Read
                        </span>
                    </div>
                </div>
                <div>
                    <div 
                        className="flex items-center justify-start gap-1.5"
                    >
                        <Link href={"/"} aria-label={`${data.authorName}-authorName`}
                            className="text-[15px] font-semibold leading-[1.2] -tracking-[0.02em] text-secondary capitalize transition-all duration-[0.25s] ease-in hover:text-primary dark:text-dark dark:hover:text-para"
                        >{data.authorName}</Link>
                        <span
                            className="text-[15px] font-semibold leading-[1.2] -tracking-[0.02em] text-para capitalize"
                        >on {`${data.month} ${data.day}, ${data.year}`}</span>
                    </div>
                        <Link href={"/"} aria-label={data.title}
                            className="block text-[21px] font-bold text-primary leading-[1.2] -tracking-[0.04em] mt-2.5 transition-all duration-[0.25s] ease-in hover:text-para"
                        >{data.title}</Link>
                        <p
                            className="text-para mt-1.5 line-clamp-3"
                        >{`${data.description}…`}</p>
                </div>
            </div>
        })}
    </> 
}