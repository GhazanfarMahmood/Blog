// NEXT JS IMAGE, IMAGE TYPE AND LINK
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

export default function CategoryCard({mainImg, icon, name, slug} : {mainImg:string | StaticImageData, icon: string, name:string, slug: string}){
    return <>
        <Link href={`/category/${slug}`} aria-label={`${name}-link`}
            className="h-[348px] lg:h-[368px] rounded-2xl relative overflow-hidden"
        >
            <Image src={mainImg} alt={`${name}-img`} width={368} height={368}
                className="w-full h-full object-cover transition-all duration-[0.25s] ease-in hover:scale-[1.025]"
            />
            <span
                className="flex items-center justify-center gap-[5px] text-primary font-bold leading-[1.2] capitalize -tracking-[0.04em] bg-light dark:bg-[#222] py-3 px-6 rounded-[100px] shadow-search-field absolute bottom-8 right-2/4 translate-x-2/4 "
            >
                {icon}
                {name}
            </span>
        </Link>
    </>
}