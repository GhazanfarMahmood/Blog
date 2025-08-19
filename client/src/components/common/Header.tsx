
// NEXT JS IMAGE AND LINK FOR OPTIMIZATION AND SINGLE PAGE APPLICATION WE USE NEXT JS IMAGE AND LINK
import Image from "next/image";
import Link from "next/link";

// ICONS AND IMAGES
import Logo from "@/assets/images/revision.webp";

// ICONS FROM REACT ICON 
import { MdWbSunny } from "react-icons/md";
import { FaMoon } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";

// HEADER LINKS
import { HeaderLink } from "./headerLinks";

export default function Header(){
    
    return (<>
        <header className="container flex items-center justify-center gap-5 py-[25px]">
            <Link href={"/"} className="mr-auto">
                <Image src={Logo} alt="revision" width={131} height={38} />
            </Link>
            <HeaderLink />
            <div className="flex items-center justify-center ml-auto ">
                <div className="relative pr-3.5 after:w-[1.5px] after:h-[18px] after:absolute after:inset-0 after:my-auto after:ml-auto after:bg-br after:content-['']">
                    <button className="w-9 h-9 flex items-center justify-center rounded-full cursor-pointer transition-all duration-[0.25s] ease-in hover:bg--link-bg" aria-label="search btn">
                        <CiSearch className="w-6 h-6" />
                    </button>
                </div>
                <button className="flex items-center justify-center gap-2 ml-3.5 p-1 rounded-[30px] cursor-pointer *:w-7 *:h-7 *:flex *:items-center *:justify-center bg--link-bg *:transition-opacity *:duration-75 *:ease-in *:hover:opacity-70" aria-label="theme toggle btn">
                    <span>
                        <MdWbSunny />   
                    </span>
                    <span className="bg-light rounded-full">
                        <FaMoon className="w-3.5 h-3.5"/>
                    </span>
                </button>
            </div>
        </header>
    </>)
}