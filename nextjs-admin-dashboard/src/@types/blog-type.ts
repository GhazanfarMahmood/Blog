import { AuthorType } from "./author-type"
import { CategoryType } from "./category-type"

// BLOG CARD TYPE
export type BlogContentType = {
    _id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    thumbnail: string;
    category: CategoryType[];
    tags: string[];
    author: AuthorType;
    reading: number;
    isPublished: boolean;
    isFeatured: boolean;
    createdAt: string;
    updatedAt: string;
}

// BLOG DETAIL TYPE
export type BlogDetailType = {
    _id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    thumbnail: string;
    category: CategoryType[];
    tags: string[];
    author: AuthorType;
    reading: number;
    isPublished: boolean;
    isFeatured: boolean;
    createdAt: string;
    updatedAt: string;
}