// NEXT JS IMAGE AND LINK
import Image from "next/image";
import Link from "next/link";

// ICONS AND IMAGES
import { FaLocationDot } from "react-icons/fa6";
import fb_icon from "@/assets/images/icons/fb-icon.svg";
import x_icon from "@/assets/images/icons/x.svg";
import insta_icon from "@/assets/images/icons/insta.svg";
import linkedin_icon from "@/assets/images/icons/linkedin.svg";
import author_profile from "@/assets/images/author-img.webp";

export default function AuthorDetail(){
    return <div 
        className="bg-light p-8 rounded-2xl shadow-search-field dark:bg-[#222] mb-8"
    >
        <span
            className="block text-xs font-extrabold uppercase leading-[1.2] tracking-widest text-para mb-5"
        >
            About
        </span>
        <div 
            className="flex items-center justify-start gap-2.5 flex-nowrap"
        >
            <Image src={author_profile} alt="author-profile-img" width={50} height={50}
                className="rounded-full"
            />
            <span
                className="flex flex-col"
            >
                <Link href={"/"} aria-label="author-name"
                    className="block text-lg font-bold leading-[1.2] text-primary -tracking-[0.04em] capitalize mb-1.5 transition-all duration-[0.25s] ease-in hover:opacity-70"
                >
                    Ethan Caldwell
                </Link>
                <span
                    className="text-xs font-extrabold tracking-widest leading-[1.2] uppercase text-para"
                >
                    Reflective Blogger
                </span>
            </span>
        </div>
        <p
            className="text-para mt-3"
        >
            Ethan Caldwell shares thoughtful insights and reflections on life, culture, and personal growth. His work explores the intersections of creativity and experience, offering readers unique perspectives.
        </p>
        <div
            className="flex items-center justify-start gap-1.5 text-base capitalize text-primary mt-3" 
        >
            <FaLocationDot
                className="w-6 h-6 text-secondary dark:text-dark"
            />
            Paris, France
        </div>
        {/* HERE'S IN UL I DEFINE CLASSES FOR ANCHOR THAT IS (LINK) */}
        <ul 
            className="flex items-center justify-start mt-2 mb-4 lg:mb-0 -ml-2 *:w-10 *:h-10 *:flex *:items-center *:justify-center [&_img]:transition [&_img]:duration-[0.25s] [&_img]:ease-in [&_img]:filter-(--filter-primary) dark:[&_img]:filter-(--filter-white) [&_a]:hover:*:filter-(--filter-secondary) dark:[&_img]:hover:opacity-80"
        >
            <li>
                <Link href={"/"} aria-label="facebook-icon">
                    <Image src={fb_icon} alt="facebook-icon" width={24} height={24}/>
                </Link>
            </li>
            <li>
                <Link href={"/"} aria-label="x-icon">
                    <Image src={x_icon} alt="twitter-icon" width={24} height={24} />
                </Link>
            </li>
            <li>
                <Link href={"/"} aria-label="instagram-icon">
                    <Image src={insta_icon} alt="instagram-icon" width={24} height={24} />
                </Link>
            </li>
            <li>
                <Link href={"/"} aria-label="linkedin-icon">
                    <Image src={linkedin_icon} alt="linkedin-icon" width={24} height={24} />
                </Link>
            </li>
        </ul>
    </div>
}