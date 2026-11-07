"use client";

// NEXT JS IMAGE AND LINK
import Link from "next/link";
import Image from "next/image";

// ICONS
import x_icon from "@/assets/icons/x.svg"
import fb_icon from "@/assets/icons/fb-icon.svg";
import linkedin_icon from "@/assets/icons/linkedin.svg";

// REACT ICONS
import { BsLink45Deg } from "react-icons/bs";

// HOOKS
import { useState } from "react";


export default function SideLink({reading, fbLink, linkedinLink, twitterLink} : {reading : string, fbLink : string | null, linkedinLink : string | null, twitterLink : string | null}){
    const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">("idle");

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setCopyStatus("copied");

            setTimeout(() => {
                setCopyStatus("idle");
            }, 2000);
        } catch (error) {
            console.error("Failed to copy URL:", error);
            setCopyStatus("error");

            setTimeout(() => {
                setCopyStatus('idle');
            }, 2000);
        }
    };

    return <>
        <div 
            className="h-fit flex flex-row lg:flex-col items-center justify-start lg:justify-center sticky top-5 lg:-ml-7"
        >
            <div
                className="w-20 h-20 hidden lg:flex items-center justify-center text-[15px] leading-[1.2] font-semibold -tracking-[0.02em] text-primary text-center bg-light px-2.5 rounded-full shadow-links transition-all duration-[0.25s] ease-in hover:opacity-80 dark:bg-heading dark:shadow-search-field"
            >
                {reading} min read
            </div>
            <span
                className="block lg:hidden text-xs font-extrabold tracking-widest uppercase leading-[1.2] text-primary mr-5"
            >
                Share
            </span>
            <ul
                className="flex flex-row lg:flex-col items-center justify-center gap-5 lg:mt-6 dark:[&_img]:filter-(--filter-white)"
            >
                {twitterLink &&
                    <li>
                        <Link href={twitterLink} target="_blank">
                            <Image src={x_icon} alt="twitter-img" width={24} height={24} />
                        </Link>
                    </li>
                }
                {fbLink &&
                    <li>
                        <Link href={fbLink} target="_blank">
                            <Image src={fb_icon} alt="facebook-icon" width={24} height={24} />
                        </Link>
                    </li>
                }
                {linkedinLink && 
                    <li>
                        <Link href={linkedinLink} target="_blank">
                            <Image src={linkedin_icon} alt="linkedin-icon" width={24} height={24} />
                        </Link>
                    </li>
                }
                <li> 
                    <button type="button" 
                        onClick={handleCopyLink} 
                        aria-label="Copy current page URL" 
                        title={ copyStatus === "copied" ? "Link copied!" : copyStatus === "error" ? "Unable to copy link" : "Copy link" } 
                        className="flex items-center justify-center transition-opacity duration-200 hover:opacity-70" 
                    > 
                        <BsLink45Deg className="w-6 h-6" /> 
                    </button> 
                </li>
            </ul>

            {copyStatus !== "idle" && ( <span role="status" aria-live="polite" className="text-xs text-primary ml-2 lg:ml-0 lg:mt-2" > {copyStatus === "copied" ? "Link copied!" : "Copy failed"} </span> )}
        </div>
    </>
}