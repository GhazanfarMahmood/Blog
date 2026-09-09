
export type AuthorType = {
    _id : string,
    name : string,
    writerImg : string,
    designation : string | null,
    slug : string,
    excerpt : string | null,
    location : string,
    fbLink : string | null, 
    twitterLink : string | null,
    instagramLink : string | null,
    LinkedinLink : string | null,
    createdAt : string,
    isFeatured: boolean;
    updatedAt: string;
  __v: number;
}

export type AuthorDetailType = {
    name: string, 
    designation: string | null, 
    writerImg: string, 
    excerpt: string | null, 
    slug: string, 
    location: string, 
    fbLink: string | null, 
    twitterLink: string | null, 
    instagramLink: string | null, 
    LinkedinLink: string | null
}

export interface WriterType {
  _id: string;
  name: string;
  designation: string | null;
  writerImg: string;
  excerpt: string | null;
  location: string;
  fbLink: string | null;
  instagramLink: string | null;
  twitterLink: string | null;
  LinkedinLink: string | null;
  slug: string;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface AuthorBoxType {
    writer ?: WriterType;
}