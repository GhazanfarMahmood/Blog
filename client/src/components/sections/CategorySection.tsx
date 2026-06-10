"use client";

import BreadCrumb from "./BreadCrumb";
import CategoryDetailContent from "./CategoryDetailContent";
import { useParams } from "next/navigation";

export default function CategorySection(){
     const params = useParams();
    const slug = params.slugs as string;
    return <>
        <BreadCrumb pageName={slug.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())} />
        <CategoryDetailContent />
    </>
}