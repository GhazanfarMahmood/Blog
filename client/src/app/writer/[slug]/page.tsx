// COMPONENTS
import AuthorBox from "@/components/sections/AuthorBox";
import BreadCrumb from "@/components/sections/BreadCrumb";
import WriterBox from "@/components/sections/WriterBox";

export default function Writer(){
    return <>
        <BreadCrumb pageName="Archives for Ethan Caldwell" />
        <AuthorBox />
        <WriterBox />
    </>
}