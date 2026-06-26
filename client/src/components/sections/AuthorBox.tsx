// NEXT JS IMAGE AND LINK
import Image from "next/image";
import Link from "next/link";

// IMAGES AND ICONS
import fb_icon from "@/assets/icons/fb-icon.svg";
import twitter_icon from "@/assets/icons/x.svg";
import insta_icon from "@/assets/icons/insta.svg";
import linkedin_icon from "@/assets/icons/linkedin.svg";
import { FaLocationDot } from "react-icons/fa6";

// TYPE
import { AuthorBoxType } from "@/@types/author-type";

export default function AuthorBox(
    {writer} : AuthorBoxType 
){
    console.log(writer);
    return <div
        className="container pb-12 border-b border-b-br mb-12"
    >
        <div
            className="flex flex-wrap items-center justify-start gap-6"
        >
            {writer && (
                <Image src={writer.writerImg} alt={writer.name} width={130} height={130}
                    className="flex-none rounded-full"
                />
            )}
            <div>
                <h2
                    className="text-2xl md:text-[33px] font-bold leading-[1.2] -tracking-[0.04em] text-primary"
                >
                    {writer?.name}
                </h2>
                <span
                    className="text-[11px] text-para font-extrabold tracking-widest uppercase mt-2"
                >
                    {writer?.designation}
                </span>
                <ul
                    className="flex items-center justify-start gap-5 mt-5 
                    [&_a]:flex [&_a]:items-center [&_a]:justify-center
                    [&_img]:transition-all [&_img]:duration-[0.25s] [&_img]:ease-in [&_a]:hover:*:filter-(--filter-secondary) [&_img]:filter-(--filter-primary) dark:[&_img]:filter-(--filter-white) dark:[&_a]:hover:*:opacity-80
                    "
                >
                    {writer?.fbLink && 
                        <li>
                            <Link href={writer?.fbLink} aria-label="facebook-icon">
                                <Image src={fb_icon} alt="facebook-icon" width={28} height={28} />
                            </Link>
                        </li>
                    }
                    {writer?.instagramLink && 
                        <li>
                            <Link href={writer?.instagramLink} aria-label="twitter-icon">
                                <Image src={twitter_icon} alt="twitter_icon" width={28} height={28} />
                            </Link>
                        </li>
                    }
                    {writer?.twitterLink && 
                        <li>
                            <Link href={writer?.twitterLink} aria-label="instagram-icon">
                                <Image src={insta_icon} alt="instagram_icon" width={28} height={28} />
                            </Link>
                        </li>
                    }
                    {writer?.LinkedinLink &&
                        <li>
                            <Link href={writer?.LinkedinLink} aria-label="linkedin-icon">
                                <Image src={linkedin_icon} alt="linkedin_icon" width={28} height={28} />
                            </Link>
                        </li>
                    }
                </ul>
            </div>
        </div>
        <p
            className="max-w-[520px] text-para text-balance mt-5"
        >
            {writer?.excerpt}
        </p>
        <div
            className="flex items-center justify-start gap-2 mt-4"
        >
            <FaLocationDot
                className="w-6 h-6 text-secondary dark:text-dark"
            />
            <span
                className="text-primary"
            >
                {writer?.location}
            </span>
        </div>
    </div>
}