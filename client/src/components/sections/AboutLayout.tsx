// NEXT JS IMAGE
import Image from "next/image";

export default function AboutLayout({title, images} : {title : string | undefined, images : string[] | undefined}){
    return <div className="container">
        <h1
            className="max-w-[920px] text-[42px] md:text-[44px] lg:text-[52px] text-center font-bold leading-[1.2] -tracking-wider md:-tracking-[2.6px] text-primary mx-auto mb-16
            [&_span]:block [&_span]:xs:inline [&_span]:bg-clip-text [&_span]:text-transparent [&_span]:bg-linear-(--linear-bg) [&_span]:mx-2.5 [&_span]:dark:text-dark
            "
        >
            {title}
        </h1>
        <div
            className="grid gird-cols-1 md:grid-cols-2 lg:grid-cols-[minmax(360px,436px)_minmax(241px,290px)_minmax(295px,377px)] gap-6 mb-16
            [&_img]:w-full [&_img]:h-full [&_img]:rounded-2xl [&_img]:object-cover"
        >
            {images?.map((item, index) => {
                return  <Image src={item} alt="about_img1" width={502} height={402} key={index} />
            })}
        </div>
    </div>
}