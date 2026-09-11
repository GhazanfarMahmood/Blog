export type BlogFormType = {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    thumbnail: string;
    category: string[];
    tags: string[];
    author: string;
    reading: number;
    isPublished: boolean;
    isFeatured: boolean;
}