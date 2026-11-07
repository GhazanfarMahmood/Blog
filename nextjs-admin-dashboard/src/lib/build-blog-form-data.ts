import { BlogFormType } from "@/@types/blog-form-type";

export function buildBlogFormData(
  values: BlogFormType,
  image: File | null
): FormData {
  const payload = new FormData();

  payload.append("title", values.title);
  payload.append("slug", values.slug);
  payload.append("excerpt", values.excerpt);
  payload.append("content", values.content);
  payload.append("author", values.author);
  payload.append("reading", String(values.reading));
  payload.append("isPublished", String(values.isPublished));
  payload.append("isFeatured", String(values.isFeatured));

  payload.append("category", JSON.stringify(values.category));
  payload.append("tags", JSON.stringify(values.tags));

  if (image) {
    payload.append("thumbnail", image);
  }

  return payload;
}