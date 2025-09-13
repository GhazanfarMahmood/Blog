import Image, { StaticImageData } from "next/image";
import Link from "next/link";

export default function CategoryCard({mainImg, icon, name} : {mainImg:string | StaticImageData, icon:string | StaticImageData, name:string}){
    return <>
        <Link href={"/"} aria-label={`${name}-link`}
            className="h-[348px] lg:h-[368px] rounded-2xl relative overflow-hidden"
        >
            <Image src={mainImg} alt={`${name}-img`} width={368} height={368}
                className="w-full h-full object-cover transition-all duration-[0.25s] ease-in hover:scale-[1.025]"
            />
            <span
                className="flex items-center justify-center gap-[5px] text-primary font-bold leading-[1.2] capitalize -tracking-[0.04em] bg-light dark:bg-[#222] py-3 px-6 rounded-[100px] shadow-search-field absolute bottom-8 right-2/4 translate-x-2/4 "
            >
                <Image src={icon} alt={`${name}-icon`} width={24} height={24}
                    className="dark:filter-(--filter-dark)"
                />
                {name}
            </span>
        </Link>
    </>
}