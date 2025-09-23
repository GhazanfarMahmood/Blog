// COMPONENTS
import AuthorBox from "@/components/layout/authorBox";
import BreadCrumb from "@/components/layout/breadCrumb";
import WriterBox from "@/components/layout/writerBox";

export default function Writer(){
    return <>
        <BreadCrumb pageName="Archives for Ethan Caldwell" />
        <AuthorBox />
        <WriterBox />
    </>
}