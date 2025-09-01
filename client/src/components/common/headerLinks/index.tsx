'use client';

import Link from "next/link";
import Image from "next/image";

// ICONS AND IMAGES
import { FaChevronDown } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { MdOutlineWbSunny } from "react-icons/md";
import { FiMoon } from "react-icons/fi";

import Logo from "@/assets/images/revision.webp";
import dark_logo from "@/assets/images/logo-dark.png";
import fb_icon from "@/assets/images/icons/fb-icon.svg";
import x_icon from "@/assets/images/icons/x.svg";
import insta_icon from "@/assets/images/icons/insta.svg";
import linkedin_icon from "@/assets/images/icons/linkedin.svg";

// LINKS
import { links } from "@/constants/header-data";
import { useEffect, useState } from "react";
import ThemeToggle from "@/components/modals/themeToggle";

export function HeaderLink(
    { activeHeader, setActiveHeader } : {activeHeader: boolean, setActiveHeader: (arg: boolean) => void}
) {
    const [openDropdown, setOpenDropdown] = useState<{ [key: string]: boolean }>({});
    const [isMobile, setIsMobile] = useState<boolean>(false);
     const [themeDropdown, setThemeDropdown] = useState<boolean>(false);

    useEffect(() => {
        const handleResize = () :void => {
            const mobile = window.innerWidth <= 991;
            setIsMobile(mobile);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const toggleDropdown = (id: number): void => {
        if (isMobile) {
            setOpenDropdown((prev) => ({
                ...prev,
                  //! In react we shouldn't mutate the state directly (i.e., modify the state variable itself). Instead, you should create a new copy of the state and apply the updates to that copy. 
                  //! in the case of useState, when you update the state, you don't want to lose the previous state values. so , you use the spread operator to copy the existing state values and then modify the specific key you want to change.
                [id]: !prev[id],
            }));
        }
    };

    return (
        <div
            className={`w-full max-w-[430px] lg:max-w-none h-[100dvh] lg:h-fit flex flex-col justify-start bg-light lg:bg-transparent dark:bg-bg sm:dark:bg-none fixed lg:static top-0 -left-full z-[4] transition-all duration-[0.4s] ease-in ${activeHeader && "left-0"}`}
        >
            <div 
                className="h-[88px] flex lg:hidden items-center justify-between pr-6 pl-4"
            >
                <Link href={"/"} aria-label="site-log">
                    <Image src={Logo} alt="revision" width={131} height={38} className="dark:hidden" />
                    <Image src={dark_logo} alt="revision" width={131} height={38} className="hidden dark:block" />
                </Link>
                <button
                    aria-label="close-search"
                    className="w-10 h-10 flex items-center justify-center text-phara dark:text-dark hover:text-primary transition-all duration-[0.25s] ease-in cursor-pointer"
                    onClick={() => setActiveHeader(false)}
                >
                    <IoMdClose className="w-6 h-6" />
                </button>
            </div>
            <ul 
                className="h-[calc(100dvh-169px)] lg:h-fit flex flex-col lg:flex-row items-start lg:items-center justify-start lg:justify-center gap-1 lg:gap-2.5 px-1.5 overflow-y-auto lg:overflow-y-visible"
            >
                {links.map((item) => {
                    const isOpen = openDropdown[item.id];
                    return (
                        <li key={item.id} 
                            className={`w-full lg:w-fit group ${item.category ? "relative" : ""}`}
                        >
                            <Link
                                href={"/"} aria-label={`${item.name}-link`}
                                className={`w-full lg:w-fit flex justify-start lg:justify-center items-center gap-1.5  font-semibold text-primary capitalize p-[6px_14px] rounded-lg transition-all duration-[.25s] ease-in lg:group-hover:bg--link-bg`}
                                onClick={() => toggleDropdown(item.id)}
                            >
                                {item.name}
                                {item.category && (
                                    <>
                                        <FaChevronDown 
                                            className={`w-3 h-3 hidden lg:block transition-all duration-[.25s] ease-in lg:group-hover:-rotate-180`} 
                                        />
                                        <FaChevronDown
                                            className={`w-3 h-3 block lg:hidden transition-all duration-[.25s] ease-in ml-auto ${isOpen && "-rotate-180"}`}
                                        />
                                    </>
                                )}
                            </Link>
                            {item.category && (
                                <ul
                                    className={`
                                        w-full lg:w-[234px] bg-light dark:bg-transparent lg:dark:bg-[#222] py-1 lg:py-3.5 pl-3 pr-4 rounded-lg shadow-none dark:shadow-none lg:shadow-links static lg:absolute top-11 transition-all duration-[0.25s] ease-in 
                                        ${isMobile
                                            ? isOpen
                                                ? "block"
                                                : "hidden"
                                            : "invisible opacity-0 group-hover:visible group-hover:opacity-100"}
                                        
                                        after:w-[234px] after:h-3.5 after:bg-transparent after:absolute after:-top-2.5 
                                        after:content-none lg:after:content-['']
                                    `}
                                >
                                    {item.category?.map((items) => (
                                        <li key={items.id}>
                                            <Link
                                                href={"/"} aria-label={`${item.name}-link`}
                                                className="w-[97%] block text-phara lg:text-primary font-semibold capitalize leading-6 py-1 lg:py-2 px-4 rounded-lg transition-all duration-[0.25s] ease-in hover:bg--link-bg hover:ml-2"
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

            <div 
                className="flex lg:hidden items-center justify-between py-2 px-6 border-t border-t-br relative"
            >
                <ul 
                    className="flex items-center justify-start mt-2 mb-4 lg:mb-0 -ml-2 *:w-10 *:h-10 *:flex *:items-center *:justify-center [&_a]:filter-(--filter-primary) dark:[&_a]:filter-(--filter-white)"
                >
                    <li>
                        <Link href={"/"}  aria-label="facebook-link">
                            <Image src={fb_icon} alt="facebook-icon" width={24} height={24}/>
                        </Link>
                    </li>
                    <li>
                        <Link href={"/"}  aria-label="twitter-link">
                            <Image src={x_icon} alt="twitter-icon" width={24} height={24}/>
                        </Link>
                    </li>
                    <li>
                        <Link href={"/"}  aria-label="instagram-link">
                            <Image src={insta_icon} alt="instagram-icon" width={24} height={24}/>
                        </Link>
                    </li>
                    <li>
                        <Link href={"/"}  aria-label="linkedin-link">
                            <Image src={linkedin_icon} alt="linkedin-icon" width={24} height={24}/>
                        </Link>
                    </li>
                </ul>
                <button 
                    className="w-9 h-9 flex lg:hidden items-center justify-center gap-2 p-1 ml-3.5 border border-br rounded-lg ml-auto cursor-pointer *:text-md" 
                    aria-label="theme toggle button"
                    onClick={() => setThemeDropdown(!themeDropdown)}
                >
                    <MdOutlineWbSunny className="dark:hidden" /> 
                    <FiMoon className="hidden dark:block"/>
                </button>
                <div className="block lg:hidden">
                    <ThemeToggle themeDropdown={themeDropdown} setThemeDropdown={setThemeDropdown} />
                </div>
            </div>
        </div>
    );
}
