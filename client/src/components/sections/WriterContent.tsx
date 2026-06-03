"use client";

// COMPONENTS
import AuthorBox from "@/components/sections/AuthorBox";
import BreadCrumb from "@/components/sections/BreadCrumb";
import WriterBox from "@/components/sections/WriterBox";
import { useGetWriterBySlugQuery } from "@/services/api/writerApi";
import { useParams } from "next/navigation";


export default function WriterContent(){
    const params = useParams();
    const slug = params.slug as string;

    const {data: writer, isLoading: writerLoading, error} = useGetWriterBySlugQuery(slug);
    if(writerLoading) {
        return <p>Loading...</p>
    }

    if(error) {
        return <p>Some type of error is coming...</p>
    }

    return <>
        <BreadCrumb pageName={`Archives for ${writer?.name}`} />
        <AuthorBox name={writer?.name} designation={writer?.designation} writerImg={writer?.writerImg} excerpt={writer?.excerpt} location={writer?.location} fbLink={writer?.fbLink} instagramLink={writer?.instagramLink} twitterLink={writer?.twitterLink} LinkedinLink={writer?.LinkedinLink}  />
        <WriterBox />
    </>
}