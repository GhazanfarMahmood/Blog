
"use client";

// NEXT JS LINK AND IMAGE
import Link from "next/link";
import Image from "next/image";

// ICONS
import { FaChevronDown } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { MdOutlineWbSunny } from "react-icons/md";
import { FiMoon } from "react-icons/fi";

// LINKS
import { links } from "@/data/header-data";

// HOOKS
import { useEffect, useState } from "react";

// COMPONENTS
import ThemeToggle from "@/components/modals/ThemeToggle";
import Skeleton from "@/components/ui/Skeleton";

// TYPES
import { CategoryType } from "@/@types/category-type";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

// IMAGES
import Logo from "@/assets/images/revision.webp";
import dark_logo from "@/assets/images/logo-dark.webp";
import fb_icon from "@/assets/icons/fb-icon.svg";
import x_icon from "@/assets/icons/x.svg";
import insta_icon from "@/assets/icons/insta.svg";
import linkedin_icon from "@/assets/icons/linkedin.svg";

type HeaderLinkProps = {
    activeHeader: boolean;
    setActiveHeader: (arg: boolean) => void;
    data: CategoryType[] | undefined;
    isLoading: boolean;
    error: FetchBaseQueryError | SerializedError | undefined;
};

export function HeaderLink({
    activeHeader,
    setActiveHeader,
    data,
    isLoading,
    error,
}: HeaderLinkProps) {
    const [openDropdown, setOpenDropdown] = useState<{
        [key: string]: boolean;
    }>({});

    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [themeDropdown, setThemeDropdown] = useState<boolean>(false);

    // CHECK SCREEN SIZE
    useEffect(() => {
        const handleResize = (): void => {
            const mobile = window.innerWidth <= 991;
            setIsMobile(mobile);
        };

        handleResize();

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // TOGGLE MOBILE DROPDOWN
    const toggleDropdown = (id: number): void => {
        if (isMobile) {
            setOpenDropdown((prev) => ({
                ...prev,
                [id]: !prev[id],
            }));
        }
    };

    // CATEGORY SKELETON
    const renderCategorySkeleton = () => (
        <li className="px-4 py-2 space-y-3" aria-label="Loading categories">
            {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton
                    key={index}
                    width="100%"
                    height="20px"
                    rounded="md"
                />
            ))}
        </li>
    );

    // CATEGORY ERROR
    const renderCategoryError = () => (
        <li className="px-4 py-2">
            <p className="text-sm text-red-500">
                Unable to load categories.
            </p>
        </li>
    );

    // CATEGORY EMPTY STATE
    const renderCategoryEmpty = () => (
        <li className="px-4 py-2">
            <p className="text-sm text-para">
                No categories available.
            </p>
        </li>
    );

    // CATEGORY LINKS
    const renderCategoryLinks = () => (
        <>
            {data?.map((items) => (
                <li key={items._id}>
                    <Link
                        href={`/category/${items.slug}`}
                        aria-label={`${items.categoryName}-link`}
                        className="w-[97%] block text-para lg:text-primary font-semibold capitalize leading-6 py-1 lg:py-2 px-4 rounded-lg transition-all duration-[0.25s] ease-in hover:bg--link-bg hover:ml-2"
                    >
                        {items.categoryName}
                    </Link>
                </li>
            ))}
        </>
    );

    // CATEGORY CONTENT
    const renderCategoryContent = () => {
        if (isLoading) {
            return renderCategorySkeleton();
        }

        if (error) {
            return renderCategoryError();
        }

        if (data && data.length > 0) {
            return renderCategoryLinks();
        }

        return renderCategoryEmpty();
    };

    return (
        <div
            className={`w-full max-w-[430px] lg:max-w-none h-[100dvh] lg:h-fit flex flex-col justify-start bg-light lg:bg-transparent dark:bg-bg sm:dark:bg-none fixed lg:static top-0 -left-full z-[4] transition-all duration-[0.4s] ease-in ${
                activeHeader ? "left-0" : ""
            }`}
        >
            {/* MOBILE HEADER */}
            <div className="h-[88px] flex lg:hidden items-center justify-between pr-6 pl-4">

                <Link href="/" aria-label="site-logo">
                    <Image
                        src={Logo}
                        alt="revision"
                        width={131}
                        height={38}
                        className="dark:hidden"
                    />

                    <Image
                        src={dark_logo}
                        alt="revision"
                        width={131}
                        height={38}
                        className="hidden dark:block"
                    />
                </Link>

                <button
                    aria-label="close-menu"
                    className="w-10 h-10 flex items-center justify-center text-para dark:text-dark hover:text-primary transition-all duration-[0.25s] ease-in cursor-pointer"
                    onClick={() => setActiveHeader(false)}
                >
                    <IoMdClose className="w-6 h-6" />
                </button>

            </div>

            {/* HEADER NAVIGATION */}
            <ul className="h-[calc(100dvh-169px)] lg:h-fit flex flex-col lg:flex-row items-start lg:items-center justify-start lg:justify-center gap-1 lg:gap-2.5 px-1.5 overflow-y-auto lg:overflow-y-visible">

                {links.map((item) => {
                    const isOpen = openDropdown[item.id];

                    return (
                        <li
                            key={item.id}
                            className={`w-full lg:w-fit group ${
                                item.isDropdown
                                    ? "relative flex lg:block items-center flex-wrap"
                                    : ""
                            }`}
                        >

                            {/* NAVIGATION LINK */}
                            <Link
                                href={`${item.href}`}
                                aria-label={`${item.name}-link`}
                                className={`flex justify-start lg:justify-center items-center gap-1.5 font-semibold text-primary capitalize p-[6px_14px] rounded-lg transition-all duration-[.25s] ease-in lg:group-hover:bg--link-bg ${
                                    item.isDropdown
                                        ? "w-[75%] lg:w-fit order-1 lg:order-0"
                                        : ""
                                }`}
                            >
                                {item.name}

                                {item.isDropdown && (
                                    <FaChevronDown className="w-3 h-3 hidden lg:block transition-all duration-[.25s] ease-in lg:group-hover:-rotate-180" />
                                )}
                            </Link>

                            {/* MOBILE DROPDOWN BUTTON */}
                            {item.isDropdown && (
                                <button
                                    className="h-9 ml-auto pr-1 block lg:hidden cursor-pointer order-2 lg:order-none w-[25%] lg:w-auto"
                                    onClick={() => toggleDropdown(item.id)}
                                    aria-label="dropdown-open"
                                >
                                    <FaChevronDown
                                        className={`w-3 h-3 block lg:hidden transition-all duration-[.25s] ease-in ml-auto ${
                                            isOpen ? "-rotate-180" : ""
                                        }`}
                                    />
                                </button>
                            )}

                            {/* DROPDOWN */}
                            {item.isDropdown && (
                                <ul
                                    className={`
                                        w-full lg:w-[234px] bg-light dark:bg-transparent lg:dark:bg-[#222] py-1 lg:py-3.5 pl-3 pr-4 rounded-lg shadow-none dark:shadow-none lg:shadow-links static lg:absolute top-11 transition-all duration-[0.25s] ease-in order-3 lg:order-none
                                        ${
                                            isMobile
                                                ? isOpen
                                                    ? "block"
                                                    : "hidden"
                                                : "invisible opacity-0 group-hover:visible group-hover:opacity-100"
                                        }
                                        after:w-[234px] after:h-3.5 after:bg-transparent after:absolute after:-top-2.5
                                        after:content-none lg:after:content-['']
                                    `}
                                >
                                    {renderCategoryContent()}
                                </ul>
                            )}

                        </li>
                    );
                })}

            </ul>

            {/* MOBILE FOOTER */}
            <div className="flex lg:hidden items-center justify-between py-2 px-6 border-t border-t-br relative">

                {/* SOCIAL LINKS */}
                <ul className="flex items-center justify-start mt-2 mb-4 lg:mb-0 -ml-2 *:w-10 *:h-10 *:flex *:items-center *:justify-center [&_a]:filter-(--filter-primary) dark:[&_a]:filter-(--filter-white)">

                    <li>
                        <Link href="/" aria-label="facebook-link">
                            <Image
                                src={fb_icon}
                                alt="facebook-icon"
                                width={24}
                                height={24}
                            />
                        </Link>
                    </li>

                    <li>
                        <Link href="/" aria-label="twitter-link">
                            <Image
                                src={x_icon}
                                alt="twitter-icon"
                                width={24}
                                height={24}
                            />
                        </Link>
                    </li>

                    <li>
                        <Link href="/" aria-label="instagram-link">
                            <Image
                                src={insta_icon}
                                alt="instagram-icon"
                                width={24}
                                height={24}
                            />
                        </Link>
                    </li>

                    <li>
                        <Link href="/" aria-label="linkedin-link">
                            <Image
                                src={linkedin_icon}
                                alt="linkedin-icon"
                                width={24}
                                height={24}
                            />
                        </Link>
                    </li>

                </ul>

                {/* MOBILE THEME TOGGLE */}
                <button
                    className="w-9 h-9 flex lg:hidden items-center justify-center gap-2 p-1 border border-br rounded-lg ml-auto cursor-pointer *:text-md"
                    aria-label="theme toggle button"
                    onClick={() => setThemeDropdown(!themeDropdown)}
                >
                    <MdOutlineWbSunny className="dark:hidden" />

                    <FiMoon className="hidden dark:block" />
                </button>

                <div className="block lg:hidden">
                    <ThemeToggle
                        themeDropdown={themeDropdown}
                        setThemeDropdown={setThemeDropdown}
                    />
                </div>

            </div>

        </div>
    );
}
