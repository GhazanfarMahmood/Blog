import BlogDetailPage from "@/components/layout/blogDetailPage";
import BreadCrumb from "@/components/layout/breadCrumb";


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