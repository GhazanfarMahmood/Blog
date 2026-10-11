
export type AuthorType = {
    _id : string,
    name : string,
    profileImage : string,
    designation : string | null,
    slug : string,
    aboutMe : string | null,
    location : string,
    fbLink : string | null, 
    twitterLink : string | null,
    instagramLink : string | null,
    linkedinLink : string | null,
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
  profileImage: string;
  aboutMe: string | null;
  location: string;
  fbLink: string | null;
  instagramLink: string | null;
  twitterLink: string | null;
  linkedinLink: string | null;
  slug: string;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface AuthorBoxType {
    writer ?: WriterType;
}