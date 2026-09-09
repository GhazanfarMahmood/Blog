import { AuthorType } from "./author-type"
import { BlogContentType } from "./blog-type"

export type PaginatedBlogType = {
    blogs : BlogContentType[],
    featuredAuthor : AuthorType[],
    featuredBlogs : BlogContentType[],
    currentPage : number,
    totalPages : number,
    hasNextPage : boolean,
    hasPrevPage : boolean,
}