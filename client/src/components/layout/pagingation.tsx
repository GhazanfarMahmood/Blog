// NEXT JS IMAGE
import Image from "next/image";

// ICONS
import chevron_left from "@/assets/images/icons/chevron-left.svg"
import chevron_right from "@/assets/images/icons/chevron-right.svg"

export default function Pagination(){
    return <>
        <div 
            className="flex items-center justify-center mt-10 *:w-10 *:h-10 *:flex *:items-center *:justify-center *:text-primary *:font-extrabold *:leading-[1.2] *:first:dark:filter-(--filter-dark) *:last:dark:filter-(--filter-dark) [&_button]:cursor-pointer"
        >
            <button aria-label="previous">
                <Image src={chevron_left} alt="chevron-left" width={14} height={14} />
            </button>
            <button aria-label="first"
                className="bg-light rounded-lg shadow-search-field mx-3 dark:outline-1 dark:outline-br dark:bg-[#222]"
            >
                1
            </button>
            <button aria-label="second">
                2
            </button>
            <span>...</span>
            <button aria-label="fourth">
                4
            </button>
            <button aria-label="next">
                <Image src={chevron_right} alt="chevron_right" width={14} height={14} />
            </button>
        </div>
    </>
}