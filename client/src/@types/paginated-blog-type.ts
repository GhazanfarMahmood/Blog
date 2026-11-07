import { BlogContentType } from "./blog-type";

export type PaginatedBlogType = {
  blogs: BlogContentType[];
  currentPage: number;
  totalPages: number;
  totalBlogs: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};