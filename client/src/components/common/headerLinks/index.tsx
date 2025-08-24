'use client';

import Link from "next/link";
import Image from "next/image";

// ICONS AND IMAGES
import { FaChevronDown } from "react-icons/fa6";
import revision from "@/assets/images/revision.webp"
import { IoMdClose } from "react-icons/io";
import fb_icon from "@/assets/images/icons/fb-icon.svg";
import x_icon from "@/assets/images/icons/x.svg";
import insta_icon from "@/assets/images/icons/insta.svg";
import linkedin_icon from "@/assets/images/icons/linkedin.svg";
import { MdWbSunny } from "react-icons/md";
import { FaMoon } from "react-icons/fa";

// LINKS
import { links } from "@/constants/headerData";
import { useEffect, useState } from "react";

export function HeaderLink({ activeHeader, setActiveHeader }) {
    const [openDropdown, setOpenDropdown] = useState<{ [key: string]: boolean }>({});
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth <= 991;

            setIsMobile(mobile);

            // reset dropdowns only if switching from desktop ↔ mobile
            setOpenDropdown((prev) => {
                if (mobile) {
                    return {}; // close all dropdowns when entering mobile
                }
                return prev; // keep state as-is on desktop
            });
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const toggleDropdown = (id: string) => {
        if (isMobile) {
            setOpenDropdown((prev) => ({
                ...prev,
                [id]: !prev[id],
            }));
        }
    };

    return (
        <div
            className={`max-w-[430px] flex flex-col justify-start lg:max-w-none w-full h-[100vh] lg:h-fit fixed top-0 -left-full lg:static bg-light lg:bg-transparent z-[4] transition-all duration-[0.4s] ease-in ${activeHeader && "left-0"}`}
        >
            {/* Header logo + close btn */}
            <div className="h-[88px] flex items-center justify-between pr-6 pl-4 lg:hidden">
                <Link href={"/"} aria-label="site-log">
                    <Image src={revision} alt="site-logo" width={131} height={38} />
                </Link>
                <button
                    aria-label="close-search"
                    className="w-10 h-10 cursor-pointer flex items-center justify-center text-phara hover:text-primary transition-all duration-[0.25s] ease-in"
                    onClick={() => setActiveHeader(false)}
                >
                    <IoMdClose className="w-6 h-6" />
                </button>
            </div>

            {/* Menu links */}
            <ul className="h-[calc(100vh-169px)] lg:h-fit flex items-start lg:items-center justify-start lg:justify-center flex-col lg:flex-row gap-1 lg:gap-2.5 z-[2] px-1.5 overflow-y-auto lg:overflow-y-visible">
                {links.map((item) => {
                    const isOpen = openDropdown[item.id];
                    return (
                        <li key={item.id} className={`w-full lg:w-fit group ${item.category ? "relative" : ""}`}>
                            <Link
                                href={"/"}
                                className={`w-full lg:w-fit p-[6px_14px] font-semibold flex justify-start lg:justify-center items-center gap-1.5 capitalize text-primary rounded-lg transition-all duration-[.25s] ease-in lg:group-hover:bg--link-bg`}
                                onClick={() => toggleDropdown(item.id)}
                            >
                                {item.name}
                                {item.category && (
                                    <>
                                        {/* desktop chevron */}
                                        <FaChevronDown className={`hidden lg:block w-3 h-3 transition-all duration-[.25s] ease-in lg:group-hover:-rotate-180`} />
                                        {/* mobile chevron */}
                                        <FaChevronDown
                                            className={`w-3 h-3 transition-all duration-[.25s] ease-in block lg:hidden ml-auto ${isOpen && "-rotate-180"}`}
                                        />
                                    </>
                                )}
                            </Link>

                            {/* Submenu */}
                            {item.category && (
                                <ul
                                    className={`
                                        w-full lg:w-[234px] py-1 lg:py-3.5 pl-3 pr-4 
                                        static lg:absolute top-11 bg-light rounded-lg shadow-none lg:shadow-links 
                                        transition-all duration-[0.25s] ease-in 

                                        ${isMobile
                                            ? isOpen
                                                ? "block"
                                                : "hidden"
                                            : "invisible opacity-0 group-hover:visible group-hover:opacity-100"}
                                        
                                        after:w-[234px] after:h-3.5 after:absolute after:-top-2.5 
                                        after:content-none lg:after:content-[''] after:bg-transparent
                                    `}
                                >
                                    {item.category?.map((items) => (
                                        <li key={items.id}>
                                            <Link
                                                href={"/"}
                                                className="text-phara lg:text-primary block w-[97%] font-semibold capitalize leading-6 py-1 lg:py-2 px-4 rounded-lg hover:bg--link-bg transition-all duration-[0.25s] ease-in hover:ml-2"
                                            >
                                                {items.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    );
                })}
            </ul>

            {/* Footer socials + theme toggle */}
            <div className="flex items-center justify-between lg:hidden py-2 px-6 border-t border-t-br">
                <ul className="flex items-center justify-start mt-2 *:w-10 *:h-10 *:flex *:items-center *:justify-center mb-4 lg:mb-0 -ml-2">
                    <li>
                        <Link href={"/"} className="group">
                            <Image src={fb_icon} alt="facebook-icon" width={24} height={24} className="transition duration-[0.25s] ease-in filter-(--filter-primary) group-hover:filter-(--filter-secondary)" />
                        </Link>
                    </li>
                    <li>
                        <Link href={"/"} className="group">
                            <Image src={x_icon} alt="twitter-icon" width={24} height={24} className="transition duration-[0.25s] ease-in filter-(--filter-primary) group-hover:filter-(--filter-secondary)" />
                        </Link>
                    </li>
                    <li>
                        <Link href={"/"} className="group">
                            <Image src={insta_icon} alt="instagram-icon" width={24} height={24} className="transition duration-[0.25s] ease-in filter-(--filter-primary) group-hover:filter-(--filter-secondary)" />
                        </Link>
                    </li>
                    <li>
                        <Link href={"/"} className="group">
                            <Image src={linkedin_icon} alt="linkedin-icon" width={24} height={24} className="transition duration-[0.25s] ease-in filter-(--filter-primary) group-hover:filter-(--filter-secondary)" />
                        </Link>
                    </li>
                </ul>
                <button
                    className="flex lg:hidden items-center justify-center gap-2 ml-3.5 p-1 rounded-[30px] cursor-pointer *:w-7 *:h-7 *:flex *:items-center *:justify-center bg--link-bg *:transition-opacity *:duration-75 *:ease-in *:hover:opacity-70"
                    aria-label="theme toggle btn"
                >
                    <span>
                        <MdWbSunny />
                    </span>
                    <span className="bg-light rounded-full">
                        <FaMoon className="w-3.5 h-3.5" />
                    </span>
                </button>
            </div>
        </div>
    );
}
