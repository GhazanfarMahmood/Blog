export type AboutType = {
    _id : string,
    title : string,
    description : string,
    images : string[],
    moreContent : MoreContentType[];
}

type MoreContentType = {
    excerpt : string,
    icon : string,
    title : string,
    _id : string
}