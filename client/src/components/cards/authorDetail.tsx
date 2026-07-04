// NEXT JS IMAGE AND LINK
import Image from "next/image";
import Link from "next/link";

// ICONS AND IMAGES
import { FaLocationDot } from "react-icons/fa6";
import fb_icon from "@/assets/icons/fb-icon.svg";
import x_icon from "@/assets/icons/x.svg";
import insta_icon from "@/assets/icons/insta.svg";
import linkedin_icon from "@/assets/icons/linkedin.svg";
import { AuthorDetailType } from "@/@types/author-type";

export default function AuthorDetail(
    {name, designation, writerImg, excerpt, slug, location, fbLink, twitterLink, instagramLink, LinkedinLink} : AuthorDetailType){
    return <div 
        className="h-full flex flex-col max-w-[450px] lg:max-w-none bg-light p-8 rounded-2xl border border-br dark:bg-[#222] mx-auto lg:mx-0"
    >
        <span
            className="block text-xs font-extrabold uppercase leading-[1.2] tracking-widest text-para mb-5"
        >
            About
        </span>
        <div 
            className="flex items-center justify-start gap-2.5 flex-nowrap"
        >
            <Image 
                src={writerImg} 
                alt={name} 
                width={50} 
                height={50}
                className="rounded-full"
            />
            <span
                className="flex flex-col"
            >
                <Link 
                    href={`/writer/${slug}`} 
                    aria-label="author-name"
                    className="block text-lg font-bold leading-[1.2] text-primary -tracking-[0.04em] capitalize mb-1.5 transition-all duration-[0.25s] ease-in hover:opacity-70"
                >
                    {name}
                </Link>
                <span
                    className="text-xs font-extrabold tracking-widest leading-[1.2] uppercase text-para"
                >
                    {designation}
                </span>
            </span>
        </div>
        <p
            className="text-para mt-3 mb-3"
        >
            {excerpt}
        </p>
        <div
            className="flex items-center justify-start gap-1.5 text-base capitalize text-primary mt-auto" 
        >
            <FaLocationDot
                className="w-6 h-6 text-secondary dark:text-dark"
            />
            {location}
        </div>
        {/* HERE'S IN UL I DEFINE CLASSES FOR ANCHOR THAT IS (LINK) */}
        <ul 
            className="flex items-center justify-start mt-2 mb-4 lg:mb-0 -ml-2 *:w-10 *:h-10 *:flex *:items-center *:justify-center [&_img]:transition [&_img]:duration-[0.25s] [&_img]:ease-in [&_img]:filter-(--filter-primary) dark:[&_img]:filter-(--filter-white) [&_a]:hover:*:filter-(--filter-secondary) dark:[&_img]:hover:opacity-80"
        >
            {fbLink && 
                <li>
                    <Link href={fbLink} aria-label="facebook-icon">
                        <Image src={fb_icon} alt="facebook-icon" width={28} height={28} />
                    </Link>
                </li>
            }
            {instagramLink && 
                <li>
                    <Link href={instagramLink} aria-label="twitter-icon">
                        <Image src={x_icon} alt="twitter_icon" width={28} height={28} />
                    </Link>
                </li>
            }
            {twitterLink && 
                <li>
                    <Link href={twitterLink} aria-label="instagram-icon">
                        <Image src={insta_icon} alt="instagram_icon" width={28} height={28} />
                    </Link>
                </li>
            }
            {LinkedinLink &&
                <li>
                    <Link href={LinkedinLink} aria-label="linkedin-icon">
                        <Image src={linkedin_icon} alt="linkedin_icon" width={28} height={28} />
                    </Link>
                </li>
            }
        </ul>
    </div>
}