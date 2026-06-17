import { BlogContentType } from "./blog-type";
import { AuthorType } from "./author-type";

export type SideBarDataType = {
    featuredWriters : AuthorType[],
    featuredBlogs : BlogContentType[],
    latestBlogs : BlogContentType[],
}