import { AuthorType } from "./author-type"
import { CategoryType } from "./category-type"

// BLOG CARD TYPE
export type BlogContentType = {
    author : AuthorType,
    category : CategoryType[],
    content : string,
    createdAt : string,
    excerpt : string,
    isPublished : boolean,
    reading : string,
    slug : string,
    tags : string[],
    thumbnail : string,
    title : string,
    updateAt : string,
    _id : string,
}

// BLOG DETAIL TYPE
export type BlogDetailType = {
    title : string,
    author : string,
    category : CategoryType[],
    excerpt : string,
    createdAt : string,
    reading : string,
    thumbnail : string,
    content : string,
}