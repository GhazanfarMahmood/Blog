// NEXT JS LINK
import Link from "next/link";

// CREATING DATA
import { CreatingData } from "@/constants/main-data";

// REACT ICONS
import { TbExternalLink } from "react-icons/tb";


export default function Creating(){
    return <div
        className="bg-light p-8 rounded-2xl shadow-search-field dark:bg-[#222] mb-8 mt-4 sticky top-4"
    >
        <span
            className="block text-xs font-extrabold uppercase leading-[1.2] tracking-widest text-para mb-5"
        >
            Creating
        </span>
        <ul
            className="flex flex-col items-start justify-start gap-5"
        >
            {CreatingData.map((data) => {
                return <li key={data.id}>
                    <Link href={"/"} aria-label={data.title}
                        className="flex items-center justify-start gap-1 text-lg font-bold leading-[1.2] capitalize -tracking-[0.04em] text-secondary transition-all duration-[0.25s] ease-in hover:text-primary"
                    >
                        {data.title}
                        <TbExternalLink 
                            className="text-lg font-bold transition-all duration-[0.25s] ease-in"
                        />
                    </Link>
                    <p 
                        className="text-[14px] text-para mt-1.5"
                    >
                        {data.description}
                    </p>
                </li>
            })}
        </ul>
    </div>
}