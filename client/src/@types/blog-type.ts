// BLOG CARD TYPE
export type BlogContentType = {
    author : string,
    category : string[],
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
    category : string,
    excerpt : string,
    createdAt : string,
    reading : string,
    thumbnail : string,
    content : string,
}