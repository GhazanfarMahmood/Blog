import { BlogDetailType } from "./blog-type"

export type ExtendBlogType = {
    blog : BlogDetailType,
    nextBlog : {
        _id : string
        title : string,
        slug : string,
    },
    previousBlog : {
        _id : string,
        title : string,
        slug : string
    }
};
