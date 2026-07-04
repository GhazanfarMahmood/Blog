// NEXT JS IMAGE
import Image from "next/image";

// ICONS
import chevron_left from "@/assets/icons/chevron-left.svg"
import chevron_right from "@/assets/icons/chevron-right.svg"

// GETTING PAGINATION FUNCTION
import { getPaginationRange } from "@/utils/pagination";

// TYPE
import { PaginationType } from "@/@types/pagination-type";

export default function PaginationComponent({setPage, currentPage, totalPages, hasPrevPage, hasNextPage}: PaginationType){
    const pages = getPaginationRange(currentPage ?? 1, totalPages ?? 1);

    return <>
        <div 
            className="flex items-center justify-center mt-10 *:w-10 *:h-10 *:flex *:items-center *:justify-center *:text-primary *:font-extrabold *:leading-[1.2] *:first:dark:filter-(--filter-dark) *:last:dark:filter-(--filter-dark) [&_button]:cursor-pointer"
        >
            <button 
                aria-label="previous" 
                disabled={!hasPrevPage} 
                onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                className={`${!hasPrevPage && "cursor-not-allowed! opacity-50"}`}
            >
                <Image 
                    src={chevron_left} 
                    alt="chevron-left" 
                    width={14} 
                    height={14} 
                />
            </button>
            {pages.map((page, index) => {
                if(page === "...") {
                    return <span 
                        key={index}
                    >
                        ...
                    </span>
                }

                return (
                    <button 
                        key={index}
                        className={page === currentPage ? "bg-light rounded-lg shadow-search-field mx-3 dark:outline-1 dark:outline-br dark:bg-[#222]" : ""}
                        onClick={() => setPage(Number(page))}
                    >
                        {page}
                    </button>
                )
            })}

            <button 
                aria-label="next" 
                disabled={!hasNextPage} 
                onClick={() => setPage(prev => prev + 1)}
                className={`${!hasNextPage && "cursor-not-allowed! opacity-50"}`}
            >
                <Image src={chevron_right} alt="chevron_right" width={14} height={14} />
            </button>
        </div>
    </>
}