// NEXT JS IMAGE
import Image from "next/image";

// IMAGES AND ICONS
import about_img1 from "@/assets/images/about-img1.webp"
import about_img2 from "@/assets/images/about-img2.webp"
import about_img3 from "@/assets/images/about-img3.webp"

export default function AboutLayout(){
    return <div className="container">
        <h1
            className="max-w-[920px] text-[42px] md:text-[44px] lg:text-[52px] text-center font-bold leading-[1.2] -tracking-wider md:-tracking-[2.6px] text-primary mx-auto mb-16
            [&_span]:block [&_span]:xs:inline [&_span]:bg-clip-text [&_span]:text-transparent [&_span]:bg-linear-(--linear-bg) [&_span]:mx-2.5 [&_span]:dark:text-dark
            "
        >
            Hey, <span>Wonderful</span>to Meet You
        </h1>
        <div
            className="grid gird-cols-1 md:grid-cols-2 lg:grid-cols-[minmax(360px,436px)_minmax(241px,290px)_minmax(295px,377px)] gap-6 mb-16
            [&_img]:w-full [&_img]:h-full [&_img]:rounded-2xl [&_img]:object-cover"
        >
            <Image src={about_img1} alt="about_img1" width={502} height={402} />
            <Image src={about_img2} alt="about_img2" width={297} height={402} />
            <Image src={about_img3} alt="about_img3" width={402} height={402} />
        </div>
    </div>
}