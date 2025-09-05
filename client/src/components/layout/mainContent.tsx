import AuthorDetail from "../cards/authorDetail";
import BlogCard from "../cards/blogCard";

export default function MainContent() {
    return <>
        <div className="container">
            <div className="grid grid-cols-[minmax(824px,826px)_minmax(370px,372px)] gap-[50px]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 lg:gap-y-12">
                    <BlogCard />
                </div>
                <div>
                    <AuthorDetail />
                </div>
            </div>
        </div>
    </>
}