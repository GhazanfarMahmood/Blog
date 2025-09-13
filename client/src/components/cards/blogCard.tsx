import Image, { StaticImageData } from "next/image";
import Link from "next/link";

// ICONS
import { AiFillClockCircle } from "react-icons/ai";


export default function BlogCard(
    {title, img, category, subCategory, reading, authorName, month, year, day, description} : 
    {title : string, img: string | StaticImageData, category: string, subCategory: string | undefined, reading: string, authorName : string, month: string, year: string, day: string, description: string}
){
    return <>
     <div
        className="group"
    >
        <div 
            className="mb-5 relative"
        >
            <Link href={"/"} aria-label={title}>
                <Image src={img} alt={title} width={400} height={225} 
                    className="w-full h-[225px] object-cover rounded-2xl" 
                />
            </Link>
            <div 
                className="w-full flex flex-wrap items-center justify-start gap-2 absolute top-5 px-5 [&_a]:text-[11px] [&_a]:font-extrabold [&_a]:uppercase [&_a]:text-heading [&_a]:leading-[1.2] [&_a]:tracking-widest [&_a]:bg-light [&_a]:p-[5px_11px] [&_a]:rounded-md [&_a]:dark:bg-dark"
            >
                <Link href={"/"} aria-label={`${category}-link`}>{category}</Link>
                {
                    subCategory && 
                    <Link href={"/"} aria-label={`${subCategory}-link`}>{subCategory}</Link>
                }
                <span
                    className="flex items-center justify-center gap-1 bg--bg-clock text-[15px] font-semibold leading-[1.2] text-light p-[5px_7px] rounded-[100px] xs:ml-auto opacity-0 invisible transition-all duration-[0.25s] ease-in group-hover:opacity-100 group-hover:visible dark:text-dark"
                >
                    <span>
                        <AiFillClockCircle />
                    </span>
                    {reading} Min Read
                </span>
            </div>
        </div>
        <div>
            <div 
                className="flex items-center justify-start gap-1.5"
            >
                <Link href={"/"} aria-label={`${authorName}-authorName`}
                    className="text-[15px] font-semibold leading-[1.2] -tracking-[0.02em] text-secondary capitalize transition-all duration-[0.25s] ease-in hover:text-primary dark:text-dark dark:hover:text-para"
                >{authorName}</Link>
                <span
                    className="text-[15px] font-semibold leading-[1.2] -tracking-[0.02em] text-para capitalize"
                >on {`${month} ${day}, ${year}`}</span>
            </div>
                <Link href={"/"} aria-label={title}
                    className="block text-[21px] font-bold text-primary leading-[1.2] -tracking-[0.04em] mt-2.5 transition-all duration-[0.25s] ease-in hover:text-para"
                >{title}</Link>
                <p
                    className="text-para mt-1.5 line-clamp-3"
                >{`${description}…`}</p>
        </div>
    </div>
    </> 
}