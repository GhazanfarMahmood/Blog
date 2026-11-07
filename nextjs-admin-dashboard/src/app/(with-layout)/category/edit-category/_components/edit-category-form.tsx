"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

import {
    useGetCategoriesQuery,
    useUpdateCategoryMutation,
} from "@/services/api/categoryApi";

export default function EditCategoryForm() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const categoryId = searchParams.get("id");

    const {
        data: categories = [],
        isLoading: isCategoriesLoading,
    } = useGetCategoriesQuery();

    const [updateCategory, { isLoading: isUpdating }] =
        useUpdateCategoryMutation();

    const [categoryName, setCategoryName] = useState("");
    const [slug, setSlug] = useState("");
    const [existingImage, setExistingImage] = useState("");
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState("");
    const [icon, setIcon] = useState("");
    const [description, setDescription] = useState("");
    const [isPublished, setIsPublished] = useState(true);

    const generateSlug = (value: string) => {
        return value
            .toLowerCase()
            .replace(/[^a-z0-9-]+/g, "-")
            .replace(/-+/g, "-")
            .replace(/^-+/g, "");
    };

    const category = categories.find(
        (item) => item._id === categoryId
    );

    useEffect(() => {
        if (!category) return;

        setCategoryName(category.categoryName);
        setSlug(category.slug);
        setExistingImage(category.image);
        setSelectedImage(null);
        setIcon(category.icon || "");
        setDescription(category.description);
        setIsPublished(category.isPublished);
    }, [category]);

    useEffect(() => {
        if (!selectedImage) {
            setImagePreview(existingImage);
            return;
        }

        const previewUrl = URL.createObjectURL(selectedImage);
        setImagePreview(previewUrl);

        return () => URL.revokeObjectURL(previewUrl);
    }, [selectedImage, existingImage]);

    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        if (!categoryId) {
            toast.error("Category ID is missing.");
            return;
        }

        if (!categoryName.trim() || !description.trim()) {
            toast.error("Category name and description are required.");
            return;
        }

        try {
            const formData = new FormData();

            formData.append("categoryName", categoryName.trim());
            formData.append("slug", slug.trim());
            formData.append("icon", icon.trim());
            formData.append("description", description.trim());
            formData.append("isPublished", String(isPublished));

            if (selectedImage) {
                formData.append("image", selectedImage);
            }

            const response = await updateCategory({
                id: categoryId,
                data: formData,
            }).unwrap();

            toast.success(response.message);

            router.push("/category/all-categories");
        } catch (error: any) {
            toast.error(
                error?.data?.message || "Failed to update category."
            );
        }
    };

    if (isCategoriesLoading) {
        return (
            <div className="py-10 text-center text-sm text-dark-5">
                Loading category...
            </div>
        );
    }

    if (!categoryId || !category) {
        return (
            <div className="rounded-lg border border-red-200 bg-red-50 p-5 text-sm text-red-600">
                Category not found.
            </div>
        );
    }

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
                            setCategoryName(event.target.value)
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
                            setSlug(
                                generateSlug(event.target.value)
                            )
                        }
                        placeholder="e.g. technology"
                        className="w-full rounded-lg border border-stroke bg-transparent px-4 py-3 text-sm outline-none transition focus:border-primary dark:border-dark-3 dark:text-white"
                    />
                </div>

                {/* Image */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-dark dark:text-white">
                        Category Image
                    </label>

                    <input
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        onChange={(event) =>
                        setSelectedImage(event.target.files?.[0] || null)
                        }
                        className="w-full rounded-lg border border-stroke bg-transparent px-4 py-3 text-sm outline-none dark:border-dark-3 dark:text-white"
                    />

                    {imagePreview && (
                        <img
                        src={imagePreview}
                        alt="Category preview"
                        className="mt-4 h-40 w-40 rounded-lg object-cover"
                        />
                    )}

                    <p className="mt-2 text-xs text-dark-5">
                        Select a new image only if you want to replace the existing one.
                    </p>
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
                    placeholder="Write a short description..."
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
                    disabled={isUpdating}
                    className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {isUpdating ? "Updating..." : "Update Category"}
                </button>
            </div>
        </form>
    );
}