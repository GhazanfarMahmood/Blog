// NEXT JS IMAGE AND LINK
import Link from "next/link";
import Image from "next/image";

// ICONS
import x_icon from "@/assets/images/icons/x.svg"
import fb_icon from "@/assets/images/icons/fb-icon.svg";
import linkedin_icon from "@/assets/images/icons/linkedin.svg";

// REACT ICONS
import { BsLink45Deg } from "react-icons/bs";


export default function SideLink(){
    return <>
        <div 
            className="h-fit flex flex-row lg:flex-col items-center justify-start lg:justify-center sticky top-5 lg:-ml-7"
        >
            <div
                className="w-20 h-20 hidden lg:flex items-center justify-center text-[15px] leading-[1.2] font-semibold -tracking-[0.02em] text-primary text-center bg-light px-2.5 rounded-full shadow-links transition-all duration-[0.25s] ease-in hover:opacity-80 dark:bg-heading dark:shadow-search-field"
            >
                4 min read
            </div>
            <span
                className="block lg:hidden text-xs font-extrabold tracking-widest uppercase leading-[1.2] text-primary mr-5"
            >
                Share
            </span>
            <ul
                className="flex flex-row lg:flex-col items-center justify-center gap-5 lg:mt-6 dark:[&_img]:filter-(--filter-white)"
            >
                <li>
                    <Link href={"/"}>
                        <Image src={x_icon} alt="twitter-img" width={24} height={24} />
                    </Link>
                </li>
                <li>
                    <Link href={"/"}>
                        <Image src={fb_icon} alt="facebook-icon" width={24} height={24} />
                    </Link>
                </li>
                <li>
                    <Link href={"/"}>
                        <Image src={linkedin_icon} alt="linkedin-icon" width={24} height={24} />
                    </Link>
                </li>
                <li>
                    <Link href={"/"}>
                        <BsLink45Deg
                            className="w-6 h-6"
                        />
                    </Link>
                </li>
            </ul>
        </div>
    </>
}