// COMPONENTS
import BlogDetailPage from "@/components/sections/BlogDetail";
import BreadCrumb from "@/components/sections/BreadCrumb";


export default function BlogDetail() {
    return <>
        <div
            className="[&_ul]:justify-center"
        >
            <BreadCrumb pageName="Startups and AI: How Artificial Intelligence Drives Innovation" subPageName="Startups" />
        </div>
        <BlogDetailPage />
    </>
}