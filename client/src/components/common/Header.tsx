"use client";

// NEXT JS IMAGE AND LINK FOR OPTIMIZATION AND SINGLE PAGE APPLICATION WE USE NEXT JS IMAGE AND LINK
import Image from "next/image";
import Link from "next/link";

// ICONS AND IMAGES
import Logo from "@/assets/images/revision.webp";
import dark_logo from "@/assets/images/logo-dark.png"

// ICONS FROM REACT ICON 
import { MdOutlineWbSunny } from "react-icons/md";
import { FiMoon } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import { FiMenu } from "react-icons/fi";

// HEADER LINKS
import { HeaderLink } from "./headerLinks";
import { HeaderSearch } from "../modals/headerSearch";
import ThemeToggle from "../modals/themeToggle";

// ADDING USESTATE HOOK
import { useState } from "react";

export default function Header(){
    const [searchActive, setSearchActive] = useState<boolean>(false);
    const [activeHeader, setActiveHeader] = useState<boolean>(false);
    const [themeDropdown, setThemeDropdown] = useState<boolean>(false);

    const handleSearch = () => {
        setSearchActive(!searchActive);
        if(themeDropdown === true){
            setThemeDropdown(false);
        };
    };

    const handleThemeDropdown = () => {
        setThemeDropdown(!themeDropdown);
        if(searchActive === true){
            setSearchActive(false);
        };
    };
    
    const menuToggle = () => {
        setActiveHeader(!activeHeader);
        if(searchActive === true){
            setSearchActive(false);
        };
    }

    return (<>
        <header className="bg-bg">
            <div 
                className="container flex items-center justify-center gap-5 py-[25px] relative"
            >
                <button 
                    className="mr-auto lg:hidden" aria-label="menu-open" 
                    onClick={menuToggle}
                >
                    <FiMenu className="w-6 h-6" />
                </button>
                <Link href={"/"} 
                    className="flex-none lg:mr-auto" aria-label="site logo"
                >
                    <Image src={Logo} alt="revision" width={131} height={38} className="dark:hidden" />
                    <Image src={dark_logo} alt="revision" width={131} height={38} className="hidden dark:block" />
                </Link>
                <HeaderLink activeHeader={activeHeader} setActiveHeader={setActiveHeader} />
                <div 
                    className="flex items-center justify-center ml-auto relative"
                >
                    <div 
                        className="lg:pr-3.5 relative after:w-[1.5px] after:h-[18px] after:bg-br after:my-auto after:ml-auto after:absolute after:inset-0 after:content-none lg:after:content-['']"
                    >
                        <button 
                            className={`w-9 h-9 flex justify-center items-center rounded-full cursor-pointer transition-all duration-[0.25s] ease-in hover:bg--link-bg ${searchActive && "bg--link-bg"}`} 
                            aria-label="search button" onClick={handleSearch}
                        >
                            <IoSearch className="w-6 h-6" />
                        </button>
                    </div>
                    <button 
                        className="w-9 h-9 hidden lg:flex items-center justify-center gap-2 p-1 ml-3.5 border border-br rounded-lg cursor-pointer *:text-md" 
                        aria-label="theme toggle button"
                        onClick={handleThemeDropdown}
                    >
                        <MdOutlineWbSunny className="dark:hidden" /> 
                        <FiMoon className="hidden dark:block"/>
                    </button>
                    <div className="hidden lg:block">
                        <ThemeToggle themeDropdown={themeDropdown} setThemeDropdown={setThemeDropdown} />
                    </div>
                </div>
                <HeaderSearch searchActive={searchActive} setSearchActive={setSearchActive} />
            </div>
            <div 
                className={`hidden lg:hidden! w-full h-[100dvh] bg-header-bg fixed top-0 left-0 z-[2] ${activeHeader && "block!"}`} 
                onClick={() => setActiveHeader(false)}
            ></div>
        </header>
    </>)
}