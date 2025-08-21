// LINK AND IMAGE FROM NEXT
import Link from "next/link";

// ICONS AND IMAGES
import { FaChevronDown } from "react-icons/fa6";

// LINKS
import {links} from "@/constants/headerData";

export function HeaderLink(){
    return <ul className="hidden lg:flex items-center justify-center gap-2.5 z-[2]">
                {links.map((item) => {
                    return <li key={item.id} className={`${item.category ? "relative" : ""} group`}>
                        <Link href={"/"} className={`p-[6px_14px] font-semibold flex justify-center items-center gap-1.5 capitalize text-primary rounded-lg transition-all duration-[.25s] ease-in group-hover:bg--link-bg`} >
                            {item.name}
                            {item.category && 
                                <FaChevronDown className="w-3 h-3 transition-all duration-[.25s] ease-in group-hover:-rotate-180" />
                            }
                        </Link>
                        {item.category &&
                            <ul className="w-[234px] py-3.5 pl-3 pr-4 absolute top-11 bg-light rounded-lg shadow-links transition-all duration-[0.25s] ease-in invisible opacity-0 group-hover:visible group-hover:opacity-100 after:w-[234px] after:h-3.5 after:absolute after:-top-2.5 after:content-[''] after:bg-transparent">
                                {item.category?.map((items) => {
                                    return  <li key={items.id}>
                                        <Link href={"/"} className="block w-[97%] font-semibold capitalize leading-6 py-2 px-4 rounded-lg hover:bg--link-bg transition-all duration-[0.25s] ease-in hover:ml-2">{items.name}</Link>
                                    </li>      
                                })}
                            </ul>
                        }
                    </li>
                })}
            </ul>
}