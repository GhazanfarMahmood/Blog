
"use client";

import { useEffect, useState } from "react";
import {
  Save,
  Trash2,
  RotateCcw,
  Loader2,
  FileText,
  Eye,
} from "lucide-react";

import {
  useGetHomeQuery,
  useCreateHomeMutation,
  useUpdateHomeMutation,
  useDeleteHomeMutation,
  type HomeFormData,
} from "@/services/api/homeApi";

const emptyForm: HomeFormData = {
  title: "",
  highlightText: "",
  description: "",
};

function getErrorMessage(error: unknown): string {
  if (
    typeof error === "object" &&
    error !== null &&
    "data" in error
  ) {
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

function HighlightedTitle({
  title,
  highlightText,
}: {
  title: string;
  highlightText: string;
}) {
  if (!highlightText || !title.includes(highlightText)) {
    return <>{title || "Your homepage title"}</>;
  }

  const index = title.indexOf(highlightText);

  return (
    <>
      {title.slice(0, index)}
      <span className="text-[#7467E8]">
        {highlightText}
      </span>
      {title.slice(index + highlightText.length)}
    </>
  );
}

export default function HomeContentPage() {
  const {
    data: home,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetHomeQuery();

  const [createHome, { isLoading: isCreating }] =
    useCreateHomeMutation();

  const [updateHome, { isLoading: isUpdating }] =
    useUpdateHomeMutation();

  const [deleteHome, { isLoading: isDeleting }] =
    useDeleteHomeMutation();

  const [form, setForm] = useState<HomeFormData>(emptyForm);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const isSaving = isCreating || isUpdating;
  const isBusy = isSaving || isDeleting;

  const notFound =
    isError &&
    typeof error === "object" &&
    error !== null &&
    "status" in error &&
    error.status === 404;

  useEffect(() => {
    if (home) {
      setForm({
        title: home.title,
        highlightText: home.highlightText,
        description: home.description,
      });
    } else if (notFound) {
      setForm({ ...emptyForm });
    }
  }, [home, notFound]);

  const updateField = (
    field: keyof HomeFormData,
    value: string
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));

    setSuccessMessage("");
    setErrorMessage("");
  };

  const resetForm = () => {
    setForm(
      home
        ? {
            title: home.title,
            highlightText: home.highlightText,
            description: home.description,
          }
        : { ...emptyForm }
    );

    setSuccessMessage("");
    setErrorMessage("");
  };

  
const handleSubmit = async (
  event: React.FormEvent<HTMLFormElement>
) => {
  event.preventDefault();

  setSuccessMessage("");
  setErrorMessage("");

  const payload: HomeFormData = {
    title: form.title.trim(),
    highlightText: form.highlightText.trim(),
    description: form.description.trim(),
  };

  if (
    !payload.title ||
    !payload.highlightText ||
    !payload.description
  ) {
    setErrorMessage("All fields are required.");
    return;
  }

  const normalizedTitle = payload.title.toLowerCase();
  const normalizedHighlight = payload.highlightText.toLowerCase();

  if (!normalizedTitle.includes(normalizedHighlight)) {
    setErrorMessage(
      `Highlighted text "${payload.highlightText}" must appear inside the hero title "${payload.title}".`
    );
    return;
  }

  try {
    if (home?._id) {
      await updateHome({
        id: home._id,
        data: payload,
      }).unwrap();

      setSuccessMessage(
        "Homepage content updated successfully."
      );
    } else {
      await createHome(payload).unwrap();

      setSuccessMessage(
        "Homepage content created successfully."
      );
    }
  } catch (error) {
    setErrorMessage(getErrorMessage(error));
  }
};


  const handleDelete = async () => {
    if (!home?._id) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete the homepage content? The public homepage may have no hero content until you create it again."
    );

    if (!confirmed) return;

    setSuccessMessage("");
    setErrorMessage("");

    try {
      await deleteHome(home._id).unwrap();

      setForm({ ...emptyForm });
      setSuccessMessage(
        "Homepage content deleted successfully."
      );
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center gap-3 text-dark-6">
        <Loader2 size={22} className="animate-spin" />
        Loading homepage content...
      </div>
    );
  }

  if (isError && !notFound && !home) {
    return (
      <div className="rounded-[10px] border border-stroke bg-white p-8 text-center dark:border-dark-3 dark:bg-gray-dark">
        <p className="mb-4 text-red-500">
          Unable to load homepage content.
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
      {/* HEADER */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-dark dark:text-white">
            Home Content
          </h1>

          <p className="mt-1 text-sm text-dark-6">
            Manage your website's homepage hero section.
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

          {home && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={isBusy}
              className="flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2.5 text-sm font-medium text-red-600 disabled:opacity-50"
            >
              <Trash2 size={17} />
              Delete Content
            </button>
          )}
        </div>
      </div>

      {/* ALERTS */}
      {successMessage && (
        <div
          role="status"
          className="rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-700"
        >
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          {errorMessage}
        </div>
      )}

      {!home && notFound && (
        <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-800">
          No homepage content exists yet. Fill in the form
          below to create your first hero section.
        </div>
      )}

      {/* EDIT FORM */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <section className="rounded-[10px] border border-stroke bg-white p-5 shadow-1 dark:border-dark-3 dark:bg-gray-dark sm:p-6">
          <div className="mb-5 flex items-center gap-3">
            <FileText size={22} className="text-primary" />

            <h2 className="text-lg font-semibold text-dark dark:text-white">
              Hero Content
            </h2>
          </div>

          <div className="space-y-5">
            {/* TITLE */}
            <div>
              <label
                htmlFor="home-title"
                className="mb-2 block text-sm font-medium text-dark dark:text-white"
              >
                Hero Title
              </label>

              <input
                id="home-title"
                type="text"
                required
                value={form.title}
                onChange={(event) =>
                  updateField("title", event.target.value)
                }
                placeholder="Enter homepage title"
                className="w-full rounded-lg border border-stroke bg-transparent px-4 py-3 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:text-white"
              />
            </div>

            {/* HIGHLIGHT */}
            <div>
              <label
                htmlFor="home-highlight"
                className="mb-2 block text-sm font-medium text-dark dark:text-white"
              >
                Highlighted Text
              </label>

              <input
                id="home-highlight"
                type="text"
                required
                value={form.highlightText}
                onChange={(event) =>
                  updateField("highlightText", event.target.value)
                }
                placeholder="Example: Reflections"
                className="w-full rounded-lg border border-stroke bg-transparent px-4 py-3 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:text-white"
              />

              <p className="mt-2 text-xs text-dark-6">
                Enter the exact word or phrase from your title
                that should appear in purple.
              </p>
            </div>

            {/* DESCRIPTION */}
            <div>
              <label
                htmlFor="home-description"
                className="mb-2 block text-sm font-medium text-dark dark:text-white"
              >
                Hero Description
              </label>

              <textarea
                id="home-description"
                required
                rows={5}
                value={form.description}
                onChange={(event) =>
                  updateField("description", event.target.value)
                }
                placeholder="Write a short description for your homepage..."
                className="w-full resize-y rounded-lg border border-stroke bg-transparent px-4 py-3 text-sm text-dark outline-none focus:border-primary dark:border-dark-3 dark:text-white"
              />
            </div>
          </div>
        </section>

        {/* LIVE PREVIEW */}
        <section className="rounded-[10px] border border-stroke bg-white p-5 shadow-1 dark:border-dark-3 dark:bg-gray-dark sm:p-6">
          <div className="mb-5 flex items-center gap-3">
            <Eye size={22} className="text-primary" />

            <h2 className="text-lg font-semibold text-dark dark:text-white">
              Live Preview
            </h2>
          </div>

          <div className="rounded-xl border border-stroke bg-[#FAFAFC] px-5 py-12 text-center dark:border-dark-3 sm:px-10 sm:py-16">
            <h2 className="mx-auto max-w-4xl break-words text-2xl font-bold leading-tight text-[#292647] sm:text-4xl">
              <HighlightedTitle
                title={form.title}
                highlightText={form.highlightText}
              />
            </h2>

            <p className="mx-auto mt-5 max-w-2xl whitespace-pre-line text-sm leading-7 text-[#696780] sm:text-base">
              {form.description ||
                "Your homepage description will appear here."}
            </p>
          </div>
        </section>

        {/* SAVE BUTTON */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isBusy}
            className="flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSaving ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Save size={18} />
            )}

            {isSaving
              ? "Saving..."
              : home
                ? "Save Changes"
                : "Create Home Content"}
          </button>
        </div>
      </form>
    </div>
  );
}
