// COMPONENTS
import AuthorDetail from "../cards/authorDetail";
import BlogCard from "../cards/blogCard";
import Creating from "../cards/creating";
import FeatureCard from "../cards/featureCard";
import Technology from "../cards/technology";
import WorkExperience from "../cards/workExperience";
import Pagination from "./pagingation";

export default function MainContent() {
    return <>
        <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(530px,826px)_minmax(370px,382px)] gap-[40px] mb-16 md:mb-24 lg:mb-28">
                <div>
                    <div className="grid grid-cols-1 md:max-lg:grid-cols-2 lg:max-xl:grid-cols-1 xl:grid-cols-2 gap-x-6 gap-y-6 lg:gap-y-12">
                        <BlogCard />
                    </div>
                    <Pagination />
                </div>
                <div>
                    <AuthorDetail />
                    <FeatureCard />
                    <WorkExperience />
                    <Technology />
                    <Creating />
                </div>
            </div>
        </div>
    </>
}