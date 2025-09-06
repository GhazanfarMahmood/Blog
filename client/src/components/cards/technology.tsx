// IMAGE FROM NEXT
import Image from "next/image";

// IMAGES
import figma from "@/assets/images/figma.webp"
import notion from "@/assets/images/notion.webp"
import ps from "@/assets/images/ps.webp"
import ai from "@/assets/images/ai.webp"

export default function Technology(){
    return <div
        className="bg-light p-8 rounded-2xl shadow-search-field dark:bg-[#222] mb-8 "
    >
        <span
            className="block text-xs font-extrabold uppercase leading-[1.2] tracking-widest text-para mb-5"
        >
            Technologies
        </span>
        <ul
            className="flex flex-col items-start justify-start gap-5
            [&_li]:flex [&_li]:items-center [&_li]:justify-center [&_li]:gap-4 
            [&_img]:w-12 [&_img]:h-12 [&_img]:object-cover [&_img]:rounded-[10px] [&_img]:shadow-search-field
            [&_strong]:block [&_strong]:text-lg [&_strong]:font-bold [&_strong]:leading-[1.2] [&_strong]:-tracking-[0.04em] [&_strong]:capitalize [&_strong]:text-primary [&_strong]:mb-[3px]
            [&_p]:text-sm [&_p]:text-para
            "
        >
            <li>
                <Image src={figma} alt="figma-logo" width={48} height={48} />
                <span>
                    <strong>Figma</strong>
                    <p>Collaborate and design interfaces in real-time.</p>
                </span>
            </li>
            <li>
                <Image src={notion} alt="notion-logo" width={48} height={48} />
                <span>
                    <strong>Notion</strong>
                    <p>Organize, track, and collaborate on projects easily.</p>
                </span>
            </li>
            <li>
                <Image src={ps} alt="photoshop-logo" width={48} height={48} />
                <span>
                    <strong>Photoshop</strong>
                    <p>Professional image and graphic editing tool.</p>
                </span>
            </li>
            <li>
                <Image src={ai} alt="ai-logo" width={48} height={48} />
                <span>
                    <strong>Illustrator</strong>
                    <p>Create precise vector graphics and illustrations.</p>
                </span>
            </li>
        </ul>
    </div>
}