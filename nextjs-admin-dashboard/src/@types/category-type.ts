import { StaticImageData } from "next/image"

export type CategoryType = {
    categoryName : string,
    createdAt : string,
    icon : string,
    image : string,
    isPublished : boolean,
    slug : string,
    _id : string,
}

export type CategoryCardType = {
    mainImg:string | StaticImageData, 
    icon: string, 
    name:string, 
    slug: string
}

export type CategoryDetailInfoType = {
    img: string | StaticImageData, 
    title : string, 
    description: string
}