'use client';

// NEXT IMAGE AND LINK
import Image from "next/image";
import Link from "next/link";

// IMAGES AND ICONS
import footer_logo from "@/assets/images/footer-logo.webp"
import fb_icon from "@/assets/images/icons/fb-icon.svg";
import x_icon from "@/assets/images/icons/x.svg";
import insta_icon from "@/assets/images/icons/insta.svg";
import linkedin_icon from "@/assets/images/icons/linkedin.svg";

// FOOTER DATA
import { footerCategory, homeLink, pagesLink } from "@/constants/footerData";
import { useState } from "react";

export default function Footer(){
    const [footerLinks, setFooterLinks] = useState("");
    return (<>
        <div className="container">
            <div className="max-w-[480px] flex flex-col items-center justify-center mx-auto mb-9 md:mb-12 lg:mb-16">
                <h2 className="text-primary font-bold leading-[1.2] text-[33px] -tracking-[0.04em] text-center">Subscribe to our Newsletter</h2>
                <p className="text-phara text-center my-[10px_22px]">Subscribe to our email newsletter to get the latest posts delivered right to your email.</p>
                <form className="w-full max-w-[400px] mx-auto flex items-center justify-center flex-col sm:flex-row gap-4 sm:gap-2 p-0 sm:p-[5px] border-0 sm:border sm:border-solid sm:border-br rounded-lg bg-transparent sm:bg-light shadow-none sm:shadow-search-field transition-all duration-[0.25s] ease-in hover:shadow-hover">
                    <input type="email" placeholder="Enter Your Email" className="w-full focus:outline-none text-xs text-primary rounded-lg py-2 px-4 font-medium border border-solid  border-br sm:border-0 bg-transparent sm:bg-light p-0 sm:p-[5px] shadow-search-field sm:shadow-none leading-[1]" />
                    <button type="button" className=" w-full sm:w-fit text-center p-[10px_18px] bg-linear-(--linear-bg) min-h-10 flex items-center justify-center leading-[1.2] text-light font-bold -tracking-[0.03em] rounded-lg cursor-pointer transition-all duration-[0.25s] ease-in hover:shadow-btn-hover">Subscribe</button>
                </form>
                <span className="block text-center text-primary text-[13px] -tracking-[0.03em] mt-3 font-extrabold"> Pure inspiration, zero spam  ✨</span>
            </div>
        </div>
        <footer className="container">
            <div className="py-8 md:py-12 border-t border-t-br">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div>
                        <Link href={"/"}>
                            <Image src={footer_logo} alt="footer-logo" width={131} height={38} />
                        </Link>
                        <p className="max-w-[410px] mt-3 text-xs text-primary">Welcome to ultimate source for fresh perspectives! Explore curated content to enlighten, entertain and engage global readers.</p>
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
                    </div>
                    <div className="flex items-start justify-start lg:justify-end gap-x-12 xl:gap-x-20 gap-y-5 md:gap-y-8 md:flex-wrap flex-col md:flex-row ">
                        <div className="w-full md:w-fit">
                            <strong className={`block uppercase text-[12px] font-extrabold tracking-widest leading-[1.2] mb-[1.2px] text-phara relative strong-after w-full md:w-fit ${footerLinks === "active-one" && "rotation-active"}`} onClick={() => {setFooterLinks(footerLinks !== "active-one" ? "active-one" : "")}}>Home Pages</strong>
                            <ul className={`h-0 md:h-fit opacity-0 md:opacity-100 invisible md:visible transition duration-[0.25s] ease-in mt-0 md:mt-[18px] *:mt-[12px] *:first:mt-[0] ${footerLinks === "active-one" && "h-fit visible opacity-100 mt-[18px]"}`}>
                                {homeLink.map((link) =>{
                                    return <li key={link.id}>
                                        <Link href={"/"} className="font-semibold capitalize leading-[1.2] pb-[1.6px] -tracking-[-0.03em] text-primary transition duration-[0.25s] ease-in hover:opacity-70">{link.name}</Link>
                                    </li>
                                })}
                            </ul>
                        </div>
                        <div className="w-full md:w-fit">
                            <strong className={`block uppercase text-[12px] font-extrabold tracking-widest leading-[1.2] mb-[1.2px] text-phara relative strong-after w-full md:w-fit ${footerLinks === "active-two" && "rotation-active"}`} onClick={() => setFooterLinks(footerLinks !== "active-two" ? "active-two" : "")}>Categories</strong>
                            <ul className={`h-0 md:h-fit opacity-0 md:opacity-100 invisible md:visible transition duration-[0.25s] ease-in md:block mt-0 md:mt-[18px] *:mt-[12px] *:first:mt-[0] ${footerLinks === "active-two" && "visible opacity-100 mt-[18px] h-fit"}`}>
                                {footerCategory.map((link) =>{
                                    return <li key={link.id}>
                                        <Link href={"/"} className="font-semibold capitalize leading-[1.2] pb-[1.6px] -tracking-[-0.03em] text-primary transition duration-[0.25s] ease-in hover:opacity-70">{link.name}</Link>
                                    </li>
                                })}
                            </ul>
                        </div>
                        <div className="w-full md:w-fit">
                            <strong className={`block uppercase text-[12px] font-extrabold tracking-widest leading-[1.2] mb-[1.2px] text-phara relative strong-after w-full md:w-fit ${footerLinks === "active-three" && "rotation-active"}`} onClick={() => setFooterLinks(footerLinks !== "active-three" ? "active-three" : "")}>Pages</strong>
                            <ul className={`h-0 md:h-fit opacity-0 md:opacity-100 invisible md:visible transition duration-[0.25s] ease-in md:block mt-0 md:mt-[18px] *:mt-[12px] *:first:mt-[0] ${footerLinks === "active-three" && "visible opacity-100 mt-[18px] h-fit"}`}>
                                {pagesLink.map((link) =>{
                                    return <li key={link.id}>
                                        <Link href={"/"} className="font-semibold capitalize leading-[1.2] pb-[1.6px] -tracking-[-0.03em] text-primary transition duration-[0.25s] ease-in hover:opacity-70">{link.name}</Link>
                                    </li>
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
                <p className="text-[12px] mt-8 lg:mt-4 text-phara">© 2024 — Revision. All Rights Reserved.</p>
            </div>
        </footer>
    </>)
}