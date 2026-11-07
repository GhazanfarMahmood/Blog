
"use client";

import { useEffect, useState } from "react";
import {
  Plus,
  Trash2,
  Save,
  Loader2,
  ImageIcon,
  FileText,
  RotateCcw,
} from "lucide-react";

import {
  useGetAboutQuery,
  useCreateAboutMutation,
  useUpdateAboutMutation,
  useDeleteAboutMutation,
  type AboutFormData,
} from "@/services/api/aboutApi";

const emptyForm: AboutFormData = {
  title: "",
  images: [""],
  description: "",
  moreContent: [
    {
      icon: "",
      title: "",
      excerpt: "",
    },
  ],
};

function getErrorMessage(error: unknown): string {
  if (typeof error === "object" && error !== null && "data" in error) {
    const data = error.data;

    if (
      typeof data === "object" &&
      data !== null &&
      "message" in data &&
      typeof data.message === "string"
    ) {
      return data.message;
    }
  }

  return "Something went wrong. Please try again.";
}

export default function AboutPage() {
  const {
    data: about,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useGetAboutQuery();

  const [createAbout, { isLoading: isCreating }] =
    useCreateAboutMutation();

  const [updateAbout, { isLoading: isUpdating }] =
    useUpdateAboutMutation();

  const [deleteAbout, { isLoading: isDeleting }] =
    useDeleteAboutMutation();

  const [form, setForm] = useState<AboutFormData>({
    ...emptyForm,
    images: [""],
    moreContent: [{ icon: "", title: "", excerpt: "" }],
  });

  const [message, setMessage] = useState("");
  const [formError, setFormError] = useState("");

  const isSaving = isCreating || isUpdating;
  const isBusy = isSaving || isDeleting;

  // Fill the form with existing MongoDB data
  useEffect(() => {
    if (!about) return;

    setForm({
      title: about.title,
      images: [...about.images],
      description: about.description,
      moreContent: about.moreContent.map((item) => ({
        icon: item.icon,
        title: item.title,
        excerpt: item.excerpt,
      })),
    });
  }, [about]);

  const updateField = (
    field: "title" | "description",
    value: string
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const updateImage = (index: number, value: string) => {
    setForm((previous) => ({
      ...previous,
      images: previous.images.map((image, i) =>
        i === index ? value : image
      ),
    }));
  };

  const addImage = () => {
    setForm((previous) => ({
      ...previous,
      images: [...previous.images, ""],
    }));
  };

  const removeImage = (index: number) => {
    setForm((previous) => ({
      ...previous,
      images: previous.images.filter((_, i) => i !== index),
    }));
  };

  const updateContent = (
    index: number,
    field: "icon" | "title" | "excerpt",
    value: string
  ) => {
    setForm((previous) => ({
      ...previous,
      moreContent: previous.moreContent.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const addContent = () => {
    setForm((previous) => ({
      ...previous,
      moreContent: [
        ...previous.moreContent,
        { icon: "", title: "", excerpt: "" },
      ],
    }));
  };

  const removeContent = (index: number) => {
    setForm((previous) => ({
      ...previous,
      moreContent: previous.moreContent.filter(
        (_, i) => i !== index
      ),
    }));
  };

  const resetForm = () => {
    if (about) {
      setForm({
        title: about.title,
        images: [...about.images],
        description: about.description,
        moreContent: about.moreContent.map((item) => ({
          icon: item.icon,
          title: item.title,
          excerpt: item.excerpt,
        })),
      });
    } else {
      setForm({
        title: "",
        images: [""],
        description: "",
        moreContent: [
          { icon: "", title: "", excerpt: "" },
        ],
      });
    }

    setMessage("");
    setFormError("");
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setMessage("");
    setFormError("");

    const payload: AboutFormData = {
      title: form.title.trim(),
      description: form.description.trim(),
      images: form.images.map((image) => image.trim()),
      moreContent: form.moreContent.map((item) => ({
        icon: item.icon.trim(),
        title: item.title.trim(),
        excerpt: item.excerpt.trim(),
      })),
    };

    if (
      !payload.title ||
      !payload.description ||
      payload.images.length === 0 ||
      payload.images.some((image) => !image) ||
      payload.moreContent.length === 0 ||
      payload.moreContent.some(
        (item) => !item.icon || !item.title || !item.excerpt
      )
    ) {
      setFormError(
        "Please fill in all required fields. At least one image and one additional content section are required."
      );
      return;
    }

    try {
      if (about?._id) {
        await updateAbout({
          id: about._id,
          data: payload,
        }).unwrap();

        setMessage("About Us content updated successfully.");
      } else {
        await createAbout(payload).unwrap();

        setMessage("About Us content created successfully.");
      }
    } catch (error) {
      setFormError(getErrorMessage(error));
    }
  };

  const handleDelete = async () => {
    if (!about?._id) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete the entire About Us document? Your public About Us page may stop working until new content is created."
    );

    if (!confirmed) return;

    setMessage("");
    setFormError("");

    try {
      await deleteAbout(about._id).unwrap();

      setForm({
        title: "",
        images: [""],
        description: "",
        moreContent: [
          { icon: "", title: "", excerpt: "" },
        ],
      });

      setMessage("About Us content deleted successfully.");
    } catch (error) {
      setFormError(getErrorMessage(error));
    }
  };

  // A 404 means no About Us document exists.
  const notFound =
    isError &&
    typeof error === "object" &&
    error !== null &&
    "status" in error &&
    error.status === 404;

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center gap-3 text-dark-6">
        <Loader2 className="animate-spin" size={22} />
        Loading About Us content...
      </div>
    );
  }

  if (isError && !notFound && !about) {
    return (
      <div className="rounded-[10px] border border-stroke bg-white p-8 text-center dark:border-dark-3 dark:bg-gray-dark">
        <p className="mb-4 text-red-500">
          Unable to load About Us content.
        </p>

        <button
          type="button"
          onClick={() => refetch()}
          className="rounded-lg bg-primary px-5 py-2 text-white"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-dark dark:text-white">
            About Us
          </h1>

          <p className="mt-1 text-sm text-dark-6">
            Manage the content displayed on your website's About Us page.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={resetForm}
            disabled={isBusy}
            className="flex items-center gap-2 rounded-lg border border-stroke px-4 py-2.5 text-sm font-medium text-dark disabled:opacity-50 dark:border-dark-3 dark:text-white"
          >
            <RotateCcw size={17} />
            Reset Changes
          </button>

          {about && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={isBusy}
              className="flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2.5 text-sm font-medium text-red-600 disabled:opacity-50"
            >
              <Trash2 size={17} />
              Delete Page
            </button>
          )}
        </div>
      </div>

      {message && (
        <div
          role="status"
          className="rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-700"
        >
          {message}
        </div>
      )}

      {formError && (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          {formError}
        </div>
      )}

      {!about && (
        <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-800">
          No About Us document exists yet. Fill in the fields below to create one.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic information */}
        <section className="rounded-[10px] border border-stroke bg-white p-5 shadow-1 dark:border-dark-3 dark:bg-gray-dark sm:p-6">
          <div className="mb-5 flex items-center gap-3">
            <FileText className="text-primary" size={22} />
            <h2 className="text-lg font-semibold text-dark dark:text-white">
              Basic Information
            </h2>
          </div>

          <div className="space-y-5">
            <div>
              <label
                htmlFor="about-title"
                className="mb-2 block text-sm font-medium text-dark dark:text-white"
              >
                Page Title
              </label>

              <input
                id="about-title"
                type="text"
                required
                value={form.title}
                onChange={(event) =>
                  updateField("title", event.target.value)
                }
                placeholder="Enter About Us title"
                className="w-full rounded-lg border border-stroke bg-transparent px-4 py-3 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:text-white"
              />
            </div>

            <div>
              <label
                htmlFor="about-description"
                className="mb-2 block text-sm font-medium text-dark dark:text-white"
              >
                Description
              </label>

              <textarea
                id="about-description"
                required
                rows={8}
                value={form.description}
                onChange={(event) =>
                  updateField("description", event.target.value)
                }
                placeholder="Enter About Us description (HTML supported)"
                className="w-full resize-y rounded-lg border border-stroke bg-transparent px-4 py-3 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:text-white"
              />

              <p className="mt-2 text-xs text-dark-6">
                Your existing HTML tags, such as &lt;br /&gt;,
                will be preserved when saving.
              </p>
            </div>
          </div>
        </section>

        {/* Images */}
        <section className="rounded-[10px] border border-stroke bg-white p-5 shadow-1 dark:border-dark-3 dark:bg-gray-dark sm:p-6">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <ImageIcon className="text-primary" size={22} />
              <h2 className="text-lg font-semibold text-dark dark:text-white">
                About Images
              </h2>
            </div>

            <button
              type="button"
              onClick={addImage}
              disabled={isBusy}
              className="flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-white disabled:opacity-50"
            >
              <Plus size={16} />
              Add Image
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {form.images.map((image, index) => (
              <div
                key={index}
                className="rounded-lg border border-stroke p-4 dark:border-dark-3"
              >
                <div className="mb-3 flex aspect-video items-center justify-center overflow-hidden rounded-lg bg-gray-1 dark:bg-dark-2">
                  {image.trim() ? (
                    <img
                      src={image}
                      alt={`About image ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <ImageIcon size={30} className="text-dark-6" />
                  )}
                </div>

                <label className="mb-2 block text-sm font-medium text-dark dark:text-white">
                  Image {index + 1} URL / Path
                </label>

                <input
                  type="text"
                  value={image}
                  onChange={(event) =>
                    updateImage(index, event.target.value)
                  }
                  placeholder="/images/about-img1.webp"
                  className="w-full rounded-lg border border-stroke bg-transparent px-3 py-2.5 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:text-white"
                />

                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  disabled={isBusy || form.images.length <= 1}
                  className="mt-3 flex items-center gap-2 text-sm text-red-500 disabled:opacity-40"
                >
                  <Trash2 size={15} />
                  Remove Image
                </button>
              </div>
            ))}
          </div>

          <p className="mt-4 text-xs text-dark-6">
            Enter an image URL or a path served by your admin application.
            This editor saves image paths; it does not upload image files.
          </p>
        </section>

        {/* More Content */}
        <section className="rounded-[10px] border border-stroke bg-white p-5 shadow-1 dark:border-dark-3 dark:bg-gray-dark sm:p-6">
          <div className="mb-5 flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-dark dark:text-white">
              Additional Content
            </h2>

            <button
              type="button"
              onClick={addContent}
              disabled={isBusy}
              className="flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-white disabled:opacity-50"
            >
              <Plus size={16} />
              Add Section
            </button>
          </div>

          <div className="space-y-5">
            {form.moreContent.map((item, index) => (
              <div
                key={index}
                className="rounded-lg border border-stroke p-5 dark:border-dark-3"
              >
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-semibold text-dark dark:text-white">
                    Section {index + 1}
                  </h3>

                  <button
                    type="button"
                    onClick={() => removeContent(index)}
                    disabled={isBusy || form.moreContent.length <= 1}
                    className="flex items-center gap-2 text-sm text-red-500 disabled:opacity-40"
                  >
                    <Trash2 size={16} />
                    Remove
                  </button>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-dark dark:text-white">
                      Icon URL / Path
                    </label>

                    <input
                      type="text"
                      required
                      value={item.icon}
                      onChange={(event) =>
                        updateContent(
                          index,
                          "icon",
                          event.target.value
                        )
                      }
                      placeholder="/icons/rocket.webp"
                      className="w-full rounded-lg border border-stroke bg-transparent px-4 py-3 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-dark dark:text-white">
                      Section Title
                    </label>

                    <input
                      type="text"
                      required
                      value={item.title}
                      onChange={(event) =>
                        updateContent(
                          index,
                          "title",
                          event.target.value
                        )
                      }
                      placeholder="Empowering Innovation"
                      className="w-full rounded-lg border border-stroke bg-transparent px-4 py-3 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:text-white"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="mb-2 block text-sm font-medium text-dark dark:text-white">
                    Excerpt
                  </label>

                  <textarea
                    required
                    rows={3}
                    value={item.excerpt}
                    onChange={(event) =>
                      updateContent(
                        index,
                        "excerpt",
                        event.target.value
                      )
                    }
                    placeholder="Write a short description..."
                    className="w-full resize-y rounded-lg border border-stroke bg-transparent px-4 py-3 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:text-white"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Save button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isBusy || isFetching}
            className="flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSaving ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Save size={18} />
            )}

            {isSaving
              ? "Saving..."
              : about
                ? "Save Changes"
                : "Create About Page"}
          </button>
        </div>
      </form>
    </div>
  );
}
