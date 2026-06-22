// NEXT JS LINK
import Link from "next/link";

// REACT ICONS
import { TbExternalLink } from "react-icons/tb";
import { BlogContentType } from "@/@types/blog-type";


export default function Creating({latestBlogs} : {latestBlogs: BlogContentType[] | undefined}){
    return <div
        className="max-w-[450px] lg:max-w-none bg-light p-8 rounded-2xl border border-br dark:bg-[#222] mx-auto lg:mx-0 mt-4 sticky top-4"
    >
        <span
            className="block text-xs font-extrabold uppercase leading-[1.2] tracking-widest text-para mb-5"
        >
            Latest Blogs
        </span>
        <ul
            className="flex flex-col items-start justify-start gap-5"
        >
            {latestBlogs?.map((item) => {
               return <li key={item?._id}>
                    <Link href={`/blog/${item?.slug}`} aria-label={item?.title} 
                        className="flex items-center justify-start gap-1 text-lg font-bold leading-[1.2] capitalize -tracking-[0.04em] text-secondary transition-all duration-[0.25s] ease-in hover:text-primary dark:text-dark dark:hover:opacity-70"
                    >
                        {item?.title}
                        <TbExternalLink 
                            className="text-lg font-bold transition-all duration-[0.25s] ease-in"
                        />
                    </Link>
                    <p 
                        className="text-[14px] text-para mt-1.5"
                    >
                        {item?.excerpt}
                    </p>
                </li>
                } )}
        </ul>
    </div>
}