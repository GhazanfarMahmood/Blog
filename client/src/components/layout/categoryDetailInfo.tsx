// NEXT JS IMAGE
import Image, { StaticImageData } from "next/image";

export default function CategoryDetailInfo(
    {img, title, description}
    : {img: string | StaticImageData, title : string, description: string}
){
    return <div
        className="w-full container pb-12 border-b border-b-br mb-12"
    >
        <Image src={img} alt={title} width={100} height={100}
            className="w-[100px] h-[100px] object-cover rounded-2xl"
        />
        <h2
            className="text-[33px] text-primary font-bold leading-[1.2] -tracking-[0.04em] capitalize my-[20px_10px]"
        >
            {title}
        </h2>
        <p
            className="max-w-[520px] text-base text-para text-balance"
        >
            {description}
        </p>
    </div>
} 