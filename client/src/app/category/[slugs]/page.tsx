"use client";

// COMPONENTS
import BreadCrumb from "@/components/sections/BreadCrumb";
import CategoryDetailContent from "@/components/sections/CategoryDetailContent";
import { useParams } from "next/navigation";

export default function CategoryDetail(){
    const params = useParams();
    const slug = params.slugs as string;
    console.log(slug)
    return <>
        <BreadCrumb pageName={slug.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())} />
        <CategoryDetailContent />
    </>
}