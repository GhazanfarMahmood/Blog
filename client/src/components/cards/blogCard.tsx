import { CategoryType } from "@/@types/category-type";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

// ICONS
import { AiFillClockCircle } from "react-icons/ai";

export default function BlogCard(
    {title, img, category, reading, authorName, date, description, slug} : 
    {title : string, img: string | StaticImageData, category: CategoryType[], reading: string, authorName : string, date: string, description: string, slug: string}
){
    const dateFormatter = new Date(date).toLocaleDateString("en-US", {
        day : "numeric",
        month : "long",
        year : "numeric"
    });

    return <>
     <div
        className="group"
    >
        <div 
            className="mb-5 relative"
        >
            <Link href={`/blog/${slug}`} aria-label={title}>
                <Image src={img} alt={title} width={400} height={225} 
                    className="w-full h-[225px] object-cover rounded-2xl" 
                />
            </Link>
            <div 
                className="w-full flex flex-wrap items-center justify-start gap-2 absolute top-5 px-5 [&_a]:text-[11px] [&_a]:font-extrabold [&_a]:uppercase [&_a]:text-heading [&_a]:leading-[1.2] [&_a]:tracking-widest [&_a]:bg-light [&_a]:p-[5px_11px] [&_a]:rounded-md [&_a]:dark:bg-dark"
            >
                {category?.map((item) => {
                    return <Link href={`/category/${item.slug}`} aria-label={`${item.categoryName}-link`} key={item._id}>{item.categoryName}</Link>
                })}
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
                <Link href={`/blog/${slug}`} aria-label={`${authorName}-authorName`}
                    className="text-[15px] font-semibold leading-[1.2] -tracking-[0.02em] text-secondary capitalize transition-all duration-[0.25s] ease-in hover:text-primary dark:text-dark dark:hover:text-para"
                >
                    {authorName}
                </Link>
                <span
                    className="text-[15px] font-semibold leading-[1.2] -tracking-[0.02em] text-para capitalize"
                >
                    on {`${dateFormatter}`}
                </span>
            </div>
                <Link href={`/blog/${slug}`} aria-label={title}
                    className="block text-[21px] font-bold text-primary leading-[1.2] -tracking-[0.04em] mt-2.5 transition-all duration-[0.25s] ease-in hover:text-para"
                >
                    {title}
                </Link>
                <p
                    className="text-para mt-1.5 line-clamp-3"
                >
                    {`${description}…`}
                </p>
        </div>
    </div>
    </> 
}