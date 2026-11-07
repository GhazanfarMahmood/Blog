"use client";

import { useState, type FormEvent } from "react";
import { toast } from "react-toastify";
import { useGetUsersQuery } from "@/services/api/authApi";
import { useGetCategoriesQuery } from "@/services/api/categoryApi";
import { useCreateBlogMutation } from "@/services/api/blogApi";
import { buildBlogFormData } from "@/lib/build-blog-form-data";


const initialFormData = {
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    thumbnail: "",
    category: [] as string[],
    tags: [] as string[],
    author: "",
    reading: 0,
    isPublished: false,
    isFeatured: false,
};

export default function CreatePostForm() {
    const [formData, setFormData] = useState(initialFormData);
    const [tagInput, setTagInput] = useState("");
    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    const {
        data: usersData,
        isLoading: isUsersLoading,
        isError: isUsersError,
    } = useGetUsersQuery();

    const {
        data: categoriesData,
        isLoading: isCategoriesLoading,
        isError: isCategoriesError,
    } = useGetCategoriesQuery();

    const [createBlog, { isLoading: isCreating }] =
    useCreateBlogMutation();

    const authors = usersData?.users.filter(
        (user) => user.isWriter === true
    ) ?? [];

    const categories = categoriesData ?? [];

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    const handleCategoryChange = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        const categories = Array.from(
            event.target.selectedOptions,
            (option) => option.value,
        );

        setFormData((previous) => ({
            ...previous,
            category: categories,
        }));
    };

    const handleAddTag = () => {
        const tag = tagInput.trim();

        if (!tag) return;

        if (formData.tags.includes(tag)) {
            setTagInput("");
            return;
        }

        setFormData((previous) => ({
            ...previous,
            tags: [...previous.tags, tag],
        }));

        setTagInput("");
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setFormData((previous) => ({
            ...previous,
            tags: previous.tags.filter((tag) => tag !== tagToRemove),
        }));
    };

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
        ) => {
        event.preventDefault();

        if (!selectedImage) {
            toast.error("Please select a thumbnail");
            return;
        }

        if (selectedImage.size > 5 * 1024 * 1024) {
            toast.error("Thumbnail must be 5 MB or smaller");
            return;
        }

        try {
            const payload = buildBlogFormData(formData, selectedImage);

            await createBlog(payload).unwrap();

            toast.success("Blog created successfully");

            setSelectedImage(null);

            // Reset your other form fields here, if desired.
        } catch (error: unknown) {
            const message =
            typeof error === "object" &&
            error !== null &&
            "data" in error &&
            typeof error.data === "object" &&
            error.data !== null &&
            "message" in error.data
                ? String(error.data.message)
                : "Failed to create blog";

            toast.error(message);
        }
    };

    const handleReset = () => {
        setFormData(initialFormData);
        setTagInput("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                {/* Main Content */}
                <div className="space-y-6 xl:col-span-2">
                    <div className="rounded-lg border border-stroke bg-white p-6 dark:border-dark-3 dark:bg-gray-dark">
                        <h2 className="mb-5 text-lg font-medium text-dark dark:text-white">
                            Post Information
                        </h2>

                        <div className="space-y-5">
                            {/* Title */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-dark dark:text-white">
                                    Title
                                </label>

                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="Enter post title"
                                    className="w-full rounded-md border border-stroke bg-transparent px-4 py-3 text-sm outline-none focus:border-primary dark:border-dark-3"
                                />
                            </div>

                            {/* Slug */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-dark dark:text-white">
                                    Slug
                                </label>

                                <input
                                    type="text"
                                    name="slug"
                                    value={formData.slug}
                                    onChange={handleChange}
                                    placeholder="enter-post-slug"
                                    className="w-full rounded-md border border-stroke bg-transparent px-4 py-3 text-sm outline-none focus:border-primary dark:border-dark-3"
                                />
                            </div>

                            {/* Excerpt */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-dark dark:text-white">
                                    Excerpt
                                </label>

                                <textarea
                                    name="excerpt"
                                    value={formData.excerpt}
                                    onChange={handleChange}
                                    rows={4}
                                    placeholder="Write a short description..."
                                    className="w-full resize-none rounded-md border border-stroke bg-transparent px-4 py-3 text-sm outline-none focus:border-primary dark:border-dark-3"
                                />
                            </div>

                            {/* Content */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-dark dark:text-white">
                                    Content
                                </label>

                                <textarea
                                    name="content"
                                    value={formData.content}
                                    onChange={handleChange}
                                    rows={15}
                                    placeholder="Write your post content..."
                                    className="w-full resize-y rounded-md border border-stroke bg-transparent px-4 py-3 text-sm outline-none focus:border-primary dark:border-dark-3"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Publish */}
                    <div className="rounded-lg border border-stroke bg-white p-6 dark:border-dark-3 dark:bg-gray-dark">
                        <h2 className="mb-5 text-lg font-medium text-dark dark:text-white">
                            Publish
                        </h2>

                        <div className="space-y-4">
                            <label className="flex cursor-pointer items-center gap-3">
                                <input
                                    type="checkbox"
                                    checked={formData.isPublished}
                                    onChange={(event) =>
                                        setFormData((previous) => ({
                                            ...previous,
                                            isPublished:
                                                event.target.checked,
                                        }))
                                    }
                                />

                                <span className="text-sm text-dark dark:text-white">
                                    Publish post
                                </span>
                            </label>

                            <label className="flex cursor-pointer items-center gap-3">
                                <input
                                    type="checkbox"
                                    checked={formData.isFeatured}
                                    onChange={(event) =>
                                        setFormData((previous) => ({
                                            ...previous,
                                            isFeatured:
                                                event.target.checked,
                                        }))
                                    }
                                />

                                <span className="text-sm text-dark dark:text-white">
                                    Featured post
                                </span>
                            </label>
                        </div>
                    </div>

                    {/* Thumbnail */}
                    <div className="rounded-lg border border-stroke bg-white p-6 dark:border-dark-3 dark:bg-gray-dark">
                        <h2 className="mb-5 text-lg font-medium text-dark dark:text-white">
                            Thumbnail
                        </h2>

                        <div>
                            <label
                                htmlFor="create-thumbnail"
                                className="mb-2 block text-sm font-medium"
                            >
                                Blog Thumbnail
                            </label>

                            <input
                                id="create-thumbnail"
                                type="file"
                                accept="image/jpeg,image/png,image/webp"
                                required
                                onChange={(event) => {
                                setSelectedImage(event.target.files?.[0] ?? null);
                                }}
                                className="w-full rounded-md border p-3"
                            />

                            {selectedImage && (
                                <p className="mt-2 text-sm text-gray-500">
                                Selected: {selectedImage.name}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Author */}
                    <div className="rounded-lg border border-stroke bg-white p-6 dark:border-dark-3 dark:bg-gray-dark">
                        <h2 className="mb-5 text-lg font-medium text-dark dark:text-white">
                            Author
                        </h2>

                        <select
                            name="author"
                            value={formData.author}
                            onChange={(event) =>
                                setFormData((previous) => ({
                                ...previous,
                                author: event.target.value,
                                }))
                            }
                            disabled={isUsersLoading || isUsersError}
                            className="w-full rounded-md border border-stroke bg-transparent px-4 py-3 text-sm outline-none focus:border-primary dark:border-dark-3"
                        >
                            <option value="">
                                {isUsersLoading ? "Loading authors..." : "Select author"}
                            </option>

                            {authors.map((author) => (
                                <option key={author.id} value={author.id}>
                                {author.name}
                                </option>
                            ))}
                        </select>

                        {isUsersError && (
                            <p className="mt-2 text-sm text-red-500">
                                Failed to load authors.
                            </p>
                        )}
                    </div>

                    {/* Categories */}
                    <div className="rounded-lg border border-stroke bg-white p-6 dark:border-dark-3 dark:bg-gray-dark">
                        <h2 className="mb-5 text-lg font-medium text-dark dark:text-white">
                            Categories
                        </h2>

                        <select
                            multiple
                            value={formData.category}
                            onChange={handleCategoryChange}
                            disabled={isCategoriesLoading || isCategoriesError}
                            className="min-h-32 w-full rounded-md border border-stroke bg-transparent px-4 py-3 text-sm outline-none focus:border-primary dark:border-dark-3"
                        >
                            {categories.map((category) => (
                                <option key={category._id} value={category._id}>
                                {category.categoryName}
                                </option>
                            ))}
                        </select>

                        {isCategoriesLoading && (
                            <p className="mt-2 text-sm text-gray-500">
                                Loading categories...
                            </p>
                        )}

                        {isCategoriesError && (
                            <p className="mt-2 text-sm text-red-500">
                                Failed to load categories.
                            </p>
                        )}

                        <p className="mt-2 text-xs text-gray-500">
                            Hold Ctrl/Cmd to select multiple categories.
                        </p>
                    </div>

                    {/* Tags */}
                    <div className="rounded-lg border border-stroke bg-white p-6 dark:border-dark-3 dark:bg-gray-dark">
                        <h2 className="mb-5 text-lg font-medium text-dark dark:text-white">
                            Tags
                        </h2>

                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={tagInput}
                                onChange={(event) =>
                                    setTagInput(event.target.value)
                                }
                                onKeyDown={(event) => {
                                    if (event.key === "Enter") {
                                        event.preventDefault();
                                        handleAddTag();
                                    }
                                }}
                                placeholder="Add tag"
                                className="min-w-0 flex-1 rounded-md border border-stroke bg-transparent px-4 py-3 text-sm outline-none focus:border-primary dark:border-dark-3"
                            />

                            <button
                                type="button"
                                onClick={handleAddTag}
                                className="rounded-md border border-stroke px-3 py-2 text-sm dark:border-dark-3"
                            >
                                Add
                            </button>
                        </div>

                        {formData.tags.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-2">
                                {formData.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1.5 text-xs dark:bg-gray-800"
                                    >
                                        {tag}

                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleRemoveTag(tag)
                                            }
                                            className="text-gray-500 hover:text-red-500"
                                        >
                                            ×
                                        </button>
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Reading Time */}
                    <div className="rounded-lg border border-stroke bg-white p-6 dark:border-dark-3 dark:bg-gray-dark">
                        <h2 className="mb-5 text-lg font-medium text-dark dark:text-white">
                            Reading Time
                        </h2>

                        <input
                            type="number"
                            name="reading"
                            min={0}
                            value={formData.reading}
                            onChange={(event) =>
                                setFormData((previous) => ({
                                    ...previous,
                                    reading: Number(event.target.value),
                                }))
                            }
                            placeholder="Minutes"
                            className="w-full rounded-md border border-stroke bg-transparent px-4 py-3 text-sm outline-none focus:border-primary dark:border-dark-3"
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={handleReset}
                            className="rounded-md border border-stroke px-5 py-2.5 text-sm font-medium text-dark dark:border-dark-3 dark:text-white"
                        >
                            Reset
                        </button>

                        <button
                            type="submit"
                            disabled={isCreating}
                            className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white disabled:opacity-50"
                        >
                            {isCreating ? "Creating..." : "Create Post"}
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}