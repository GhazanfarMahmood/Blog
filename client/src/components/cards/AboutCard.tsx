// NEXT JS IMAGES AND IMAGE TYPE FROM NEXT JS
import Image, { StaticImageData } from "next/image";

export default function AboutCard({title, img, description} : {title : string, img : string | StaticImageData, description : string}){
    return <div
        className="bg-light p-8 rounded-2xl shadow-search-field dark:bg-heading"
    >
        <Image src={img} alt={title} width={40} height={40} className="dark:filter-(--filter-dark)" />
        <strong
            className="block text-primary text-[21px] font-bold leading-[1.2] -tracking-[0.04em] pt-7 mb-2"
        >
            {title}
        </strong>
        <p
            className="text-para leading-[1.55]"
        >
            {description}
        </p>
    </div>
}