"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { useCreateCategoryMutation } from "@/services/api/categoryApi";

export default function CreateCategoryForm() {
    const router = useRouter();

    const [createCategory, { isLoading }] =
        useCreateCategoryMutation();

    const [categoryName, setCategoryName] = useState("");
    const [slug, setSlug] = useState("");
    const [image, setImage] = useState("");
    const [icon, setIcon] = useState("");
    const [description, setDescription] = useState("");
    const [isPublished, setIsPublished] = useState(true);

    const generateSlug = (value: string) => {
        return value
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "");
    };

    const handleCategoryNameChange = (value: string) => {
        setCategoryName(value);

        if (!slug) {
            setSlug(generateSlug(value));
        }
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!categoryName.trim() || !image.trim() || !description.trim()) {
            toast.error(
                "Category name, image and description are required."
            );
            return;
        }

        try {
            const response = await createCategory({
                categoryName: categoryName.trim(),
                slug: slug.trim(),
                image: image.trim(),
                icon: icon.trim(),
                description: description.trim(),
                isPublished,
            }).unwrap();

            toast.success(response.message);

            router.push("/category/all-categories");
        } catch (error: any) {
            toast.error(
                error?.data?.message || "Failed to create category."
            );
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Category Name */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-dark dark:text-white">
                        Category Name
                    </label>

                    <input
                        type="text"
                        value={categoryName}
                        onChange={(event) =>
                            handleCategoryNameChange(
                                event.target.value
                            )
                        }
                        placeholder="e.g. Technology"
                        className="w-full rounded-lg border border-stroke bg-transparent px-4 py-3 text-sm outline-none transition focus:border-primary dark:border-dark-3 dark:text-white"
                    />
                </div>

                {/* Slug */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-dark dark:text-white">
                        Slug
                    </label>

                    <input
                        type="text"
                        value={slug}
                        onChange={(event) =>
                            setSlug(generateSlug(event.target.value))
                        }
                        placeholder="e.g. technology"
                        className="w-full rounded-lg border border-stroke bg-transparent px-4 py-3 text-sm outline-none transition focus:border-primary dark:border-dark-3 dark:text-white"
                    />

                    <p className="mt-1.5 text-xs text-dark-5 dark:text-dark-6">
                        Leave it as generated or customize it.
                    </p>
                </div>

                {/* Image */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-dark dark:text-white">
                        Image
                    </label>

                    <input
                        type="url"
                        value={image}
                        onChange={(event) =>
                            setImage(event.target.value)
                        }
                        placeholder="https://example.com/image.jpg"
                        className="w-full rounded-lg border border-stroke bg-transparent px-4 py-3 text-sm outline-none transition focus:border-primary dark:border-dark-3 dark:text-white"
                    />
                </div>

                {/* Icon */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-dark dark:text-white">
                        Icon
                    </label>

                    <input
                        type="text"
                        value={icon}
                        onChange={(event) =>
                            setIcon(event.target.value)
                        }
                        placeholder="Icon name or URL"
                        className="w-full rounded-lg border border-stroke bg-transparent px-4 py-3 text-sm outline-none transition focus:border-primary dark:border-dark-3 dark:text-white"
                    />
                </div>
            </div>

            {/* Description */}
            <div>
                <label className="mb-2 block text-sm font-medium text-dark dark:text-white">
                    Description
                </label>

                <textarea
                    value={description}
                    onChange={(event) =>
                        setDescription(event.target.value)
                    }
                    rows={5}
                    placeholder="Write a short description for this category..."
                    className="w-full resize-none rounded-lg border border-stroke bg-transparent px-4 py-3 text-sm outline-none transition focus:border-primary dark:border-dark-3 dark:text-white"
                />
            </div>

            {/* Published */}
            <div className="flex items-center justify-between rounded-lg border border-stroke p-4 dark:border-dark-3">
                <div>
                    <h3 className="text-sm font-medium text-dark dark:text-white">
                        Publish Category
                    </h3>

                    <p className="mt-1 text-xs text-dark-5 dark:text-dark-6">
                        Make this category visible on the website.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() =>
                        setIsPublished((previous) => !previous)
                    }
                    className={`relative h-6 w-11 rounded-full transition ${
                        isPublished
                            ? "bg-primary"
                            : "bg-gray-300"
                    }`}
                >
                    <span
                        className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                            isPublished
                                ? "left-6"
                                : "left-1"
                        }`}
                    />
                </button>
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-end gap-3 border-t border-stroke pt-6 dark:border-dark-3">
                <button
                    type="button"
                    onClick={() =>
                        router.push("/category/all-categories")
                    }
                    className="rounded-lg border border-stroke px-5 py-2.5 text-sm font-medium text-dark transition hover:border-primary hover:text-primary dark:border-dark-3 dark:text-white"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {isLoading ? "Creating..." : "Create Category"}
                </button>
            </div>
        </form>
    );
}