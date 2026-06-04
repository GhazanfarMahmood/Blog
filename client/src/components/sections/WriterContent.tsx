"use client";

// COMPONENTS
import AuthorBox from "@/components/sections/AuthorBox";
import BreadCrumb from "@/components/sections/BreadCrumb";
// import WriterBox from "@/components/sections/WriterBox";
import { useGetBlogsByWriterQuery } from "@/services/api/blogApi";
import { useGetWriterBySlugQuery } from "@/services/api/writerApi";
import { useParams } from "next/navigation";
import BlogCard from "../cards/BlogCard";


export default function WriterContent(){
    const params = useParams();
    const slug = params.slug as string;

    const {data: writer, isLoading: writerLoading, error: writerError} = useGetWriterBySlugQuery(slug);
    const {data: writerBlog, isLoading: blogLoading, error: blogError} = useGetBlogsByWriterQuery(slug);
    if(writerLoading || blogLoading) {
        return <p>Loading...</p>
    }

    if(writerError || blogError) {
        return <p>Some type of error is coming...</p>
    }
    console.log(writerBlog);

    return <>
        <BreadCrumb pageName={`Archives for ${writer?.name}`} />
        <AuthorBox name={writer?.name} designation={writer?.designation} writerImg={writer?.writerImg} excerpt={writer?.excerpt} location={writer?.location} fbLink={writer?.fbLink} instagramLink={writer?.instagramLink} twitterLink={writer?.twitterLink} LinkedinLink={writer?.LinkedinLink}  />
        {/* <WriterBox /> */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6 lg:gap-y-12 container mb-16 md:mb-24 lg:mb-28">
            {writerBlog?.map((item) => {
                return <BlogCard 
                    title = {item.title} 
                    img={item.thumbnail} 
                    category={item.category} 
                    reading={item.reading} 
                    author={item.author}
                    date={item.createdAt}
                    description={item.excerpt} 
                    slug={item.slug}
                    key={item._id}
                    />
            }) }
        </div>
    </>
}