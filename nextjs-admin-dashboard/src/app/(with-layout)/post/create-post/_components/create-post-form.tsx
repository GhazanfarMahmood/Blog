"use client";

import { useState, type FormEvent } from "react";
import { toast } from "react-toastify";

export default function CreatePostForm() {
    const [formData, setFormData] = useState({
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
    });

    const handleChange = (
        event: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >,
    ) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        console.log("Create post:", formData);

        toast.success("Post created successfully");
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                {/* Main content */}
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
                            <label className="flex items-center gap-3">
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

                            <label className="flex items-center gap-3">
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

                        <input
                            type="text"
                            name="thumbnail"
                            value={formData.thumbnail}
                            onChange={handleChange}
                            placeholder="Thumbnail URL"
                            className="w-full rounded-md border border-stroke bg-transparent px-4 py-3 text-sm outline-none focus:border-primary dark:border-dark-3"
                        />
                    </div>

                    {/* Author */}
                    <div className="rounded-lg border border-stroke bg-white p-6 dark:border-dark-3 dark:bg-gray-dark">
                        <h2 className="mb-5 text-lg font-medium text-dark dark:text-white">
                            Author
                        </h2>

                        <input
                            type="text"
                            name="author"
                            value={formData.author}
                            onChange={handleChange}
                            placeholder="Author ID"
                            className="w-full rounded-md border border-stroke bg-transparent px-4 py-3 text-sm outline-none focus:border-primary dark:border-dark-3"
                        />
                    </div>

                    {/* Reading time */}
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
                            onClick={() =>
                                setFormData({
                                    title: "",
                                    slug: "",
                                    excerpt: "",
                                    content: "",
                                    thumbnail: "",
                                    category: [],
                                    tags: [],
                                    author: "",
                                    reading: 0,
                                    isPublished: false,
                                    isFeatured: false,
                                })
                            }
                            className="rounded-md border border-stroke px-5 py-2.5 text-sm font-medium text-dark dark:border-dark-3 dark:text-white"
                        >
                            Reset
                        </button>

                        <button
                            type="submit"
                            className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white"
                        >
                            Create Post
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}