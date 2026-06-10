import { BlogContentType } from "./blog-type"

export type PaginatedBlogType = {
    blogs : BlogContentType[],
    currentPage : number,
    totalPages : number,
    hasNextPage : boolean,
    hasPrevPage : boolean,
}