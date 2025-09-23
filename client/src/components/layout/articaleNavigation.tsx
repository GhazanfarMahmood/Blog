// ICONS
import Link from "next/link";
import { GoChevronLeft, GoChevronRight  } from "react-icons/go";


export default function ArticleNavigation ({title, id} : {title : string, id: number}) {
    return <>
            <Link
                href={"/"}
                className="w-full flex flex-col bg-light rounded-2xl cursor-pointer p-8 group dark:bg-heading"
            >
                {id === 0 ? 
                <span
                    className="flex items-center justify-center text-xs font-bold tracking-widest leading-[1.2] uppercase text-primary relative"
                > 
                    <GoChevronLeft 
                        className="absolute left-[3px] transition-all duration-[0.25s] ease-in group-hover:left-0"
                    />
                    Previous article
                </span>
                : 
                <span
                    className="flex items-center justify-center text-xs font-bold tracking-widest leading-[1.2] uppercase text-para relative"
                >
                    Next Article
                    <GoChevronRight 
                        className="absolute right-[3px] transition-all duration-[0.25s] ease-in group-hover:right-0"
                    />
                </span>
                }
                <strong
                    className="max-w-[244px] block text-lg text-primary font-bold leading-[1.2] -tracking-[0.04em] text-center mt-3 transition-all duration-[0.25s] ease-in group-hover:text-para mx-auto"
                >{title}</strong>
            </Link>
    </>
}