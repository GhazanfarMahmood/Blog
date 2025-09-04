'use client';

// NEXT IMAGE AND LINK
import Image from "next/image";
import Link from "next/link";

// IMAGES AND ICONS
import footer_logo from "@/assets/images/footer-logo.webp";
import footer_dark from "@/assets/images/footer-dark-logo.webp";
import fb_icon from "@/assets/images/icons/fb-icon.svg";
import x_icon from "@/assets/images/icons/x.svg";
import insta_icon from "@/assets/images/icons/insta.svg";
import linkedin_icon from "@/assets/images/icons/linkedin.svg";

// FOOTER DATA
import { footerCategory, homeLink, pagesLink } from "@/constants/footer-data";
import { useState } from "react";

export default function Footer(){
    const [footerLinks, setFooterLinks] = useState("");
    return (<>
        <div className="container">
            <div 
                className="max-w-[480px] flex flex-col items-center justify-center mx-auto mb-9 md:mb-12 lg:mb-16"
            >
                <h2 
                    className="text-primary font-bold leading-[1.2] text-[33px] -tracking-[0.04em] text-center"
                >
                    Subscribe to our Newsletter
                </h2>
                <p 
                    className="text-para text-center my-[10px_22px]"
                >
                    Subscribe to our email newsletter to get the latest posts delivered right to your email.
                </p>
                <form 
                    className="w-full max-w-[400px] flex items-center justify-center flex-col sm:flex-row gap-2 bg-transparent dark:bg-[#222] sm:bg-light p-[5px] border-0 sm:border border-solid border-br rounded-lg shadow-none sm:shadow-search-field transition-all duration-[0.25s] ease-in hover:shadow-none sm:hover:shadow-hover"
                >
                    <input type="email" placeholder="Enter Your Email" 
                        className="w-full text-primary font-medium py-2 px-4 border border-solid border-br sm:border-0 rounded-lg shadow-search-field sm:shadow-none transition-all duration-[0.25s] ease-in focus:outline-none hover:shadow-hover sm:hover:shadow-none" 
                        aria-label="email-input"
                    />
                    <button type="button" 
                        className="w-full sm:w-fit min-h-10 flex items-center justify-center leading-[1.2] text-light dark:text-dark font-bold -tracking-[0.03em] bg-linear-(--linear-bg) p-[10px_18px] rounded-lg cursor-pointer transition-all duration-[0.25s] ease-in hover:shadow-btn-hover"
                    >
                        Subscribe
                    </button>
                </form>
                <span 
                    className="block text-center text-primary text-[13px] -tracking-[0.03em] font-extrabold mt-3"
                > 
                    Pure inspiration, zero spam  ✨
                </span>
            </div>
        </div>
        <footer className="container">
            <div 
                className="py-8 md:py-12 border-t border-t-br"
            >
                <div 
                    className="grid grid-cols-1 lg:grid-cols-2"
                >
                    <div>
                        <Link href={"/"}>
                            <Image src={footer_logo} alt="footer-logo" width={131} height={38} className="dark:hidden"/>
                            <Image src={footer_dark} alt="footer-logo" width={131} height={38} className="hidden dark:block"/>
                        </Link>
                        <p 
                            className="max-w-[410px] text-sm text-primary mt-3"
                        >
                            Welcome to ultimate source for fresh perspectives! Explore curated content to enlighten, entertain and engage global readers.
                        </p>
                        {/* HERE'S IN UL I DEFINE CLASSES FOR ANCHOR THAT IS (LINK) */}
                        <ul 
                            className="flex items-center justify-start mt-2 mb-4 lg:mb-0 -ml-2 *:w-10 *:h-10 *:flex *:items-center *:justify-center [&_img]:transition [&_img]:duration-[0.25s] [&_img]:ease-in [&_img]:filter-(--filter-primary) dark:[&_img]:filter-(--filter-white) [&_a]:hover:*:filter-(--filter-secondary) dark:[&_img]:hover:opacity-80"
                        >
                            <li>
                                <Link href={"/"}>
                                    <Image src={fb_icon} alt="facebook-icon" width={24} height={24}/>
                                </Link>
                            </li>
                            <li>
                                <Link href={"/"}>
                                    <Image src={x_icon} alt="twitter-icon" width={24} height={24} />
                                </Link>
                            </li>
                            <li>
                                <Link href={"/"}>
                                    <Image src={insta_icon} alt="instagram-icon" width={24} height={24} />
                                </Link>
                            </li>
                            <li>
                                <Link href={"/"}>
                                    <Image src={linkedin_icon} alt="linkedin-icon" width={24} height={24} />
                                </Link>
                            </li>
                        </ul>
                    </div>
                    {/* HERE'S IN DIV I DEFINE THE TAILWIND UTILITIES CLASSES FOR DIRECT CHILD THAT IS (DIV), STRONG CHILD, UL CHILD AND LAST ONE FOR ANCHOR THAT IS (LINK) */}
                    <div 
                        className="flex items-start justify-start lg:justify-end gap-x-12 xl:gap-x-20 gap-y-5 md:gap-y-8 md:flex-wrap flex-col md:flex-row 
                        [&>*]:w-full [&>*]:md:w-fit 
                        [&_strong]:w-full [&_strong]:md:w-fit [&_strong]:block [&_strong]:text-[12px] [&_strong]:uppercase [&_strong]:font-extrabold [&_strong]:tracking-widest [&_strong]:leading-[1.4] [&_strong]:text-para [&_strong]:mb-[1.2px] [&_strong]:relative
                        [&_ul]:md:block [&_ul]:h-0 [&_ul]:md:h-fit [&_ul]:opacity-0 [&_ul]:md:opacity-100 [&_ul]:invisible [&_ul]:md:visible [&_ul]:transition [&_ul]:duration-[0.25s] [&_ul]:ease-in [&_ul]:mt-0 [&_ul]:md:mt-[18px] [&_ul]:*:mt-[12px] [&_ul]:*:first:mt-[0] 
                        [&_a]:font-semibold [&_a]:capitalize [&_a]:leading-[1.2] [&_a]:-tracking-[-0.03em] [&_a]:text-primary [&_a]:pb-[1.6px] [&_a]:transition [&_a]:duration-[0.25s] [&_a]:ease-in [&_a]:hover:opacity-70"
                    >
                        <div>
                            <strong 
                                className={`strong-after ${footerLinks === "active-one" && "rotation-active"}`} 
                                onClick={() => {setFooterLinks(footerLinks !== "active-one" ? "active-one" : "")}}
                            >
                                Home Pages
                            </strong>
                            <ul 
                                className={`${footerLinks === "active-one" && "h-fit! visible! opacity-100! mt-[18px]!"}`}
                            >
                                {homeLink.map((link) =>{
                                    return <li key={link.id}>
                                        <Link href={"/"} aria-label={`${link.name}-link`}>
                                            {link.name}
                                        </Link>
                                    </li>
                                })}
                            </ul>
                        </div>
                        <div>
                            <strong 
                                className={`strong-after ${footerLinks === "active-two" && "rotation-active"}`} 
                                onClick={() => setFooterLinks(footerLinks !== "active-two" ? "active-two" : "")}
                            >
                                Categories
                            </strong>
                            <ul 
                                className={`${footerLinks === "active-two" && "h-fit! visible! opacity-100! mt-[18px]!"}`}
                            >
                                {footerCategory.map((link) =>{
                                    return <li key={link.id}>
                                        <Link href={"/"} aria-label={`${link.name}-link`}>
                                            {link.name}
                                        </Link>
                                    </li>
                                })}
                            </ul>
                        </div>
                        <div>
                            <strong 
                                className={`strong-after ${footerLinks === "active-three" && "rotation-active"}`} 
                                onClick={() => setFooterLinks(footerLinks !== "active-three" ? "active-three" : "")}
                            >
                                Pages
                            </strong>
                            <ul 
                                className={`${footerLinks === "active-three" && "h-fit! visible! opacity-100! mt-[18px]!"}`}
                            >
                                {pagesLink.map((link) =>{
                                    return <li key={link.id}>
                                        <Link href={"/"} aria-label={`${link.name}-link`}>
                                            {link.name}
                                        </Link>
                                    </li>
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
                <p 
                    className="text-[12px] text-para mt-8 lg:mt-4"
                >
                    © 2024 — Revision. All Rights Reserved.
                </p>
            </div>
        </footer>
    </>)
}