import Link from "next/link";
import EditCategoryForm from "./_components/edit-category-form";

export default function Page() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-semibold text-dark dark:text-white">
                    Edit Category
                </h1>

                <p className="mt-1 text-sm text-dark-5 dark:text-dark-6">
                    Update an existing blog category.
                </p>
            </div>

            <div className="flex items-center gap-2 text-sm text-dark-5 dark:text-dark-6">
                <Link
                    href="/"
                    className="transition hover:text-primary"
                >
                    Dashboard
                </Link>

                <span>/</span>

                <Link
                    href="/category/all-categories"
                    className="transition hover:text-primary"
                >
                    Categories
                </Link>

                <span>/</span>

                <span className="text-dark dark:text-white">
                    Edit Category
                </span>
            </div>

            <div className="rounded-xl border border-stroke bg-white p-6 shadow-1 dark:border-dark-3 dark:bg-gray-dark">
                <div className="mb-6">
                    <h2 className="text-lg font-semibold text-dark dark:text-white">
                        Category Information
                    </h2>

                    <p className="mt-1 text-sm text-dark-5 dark:text-dark-6">
                        Update the information below and save your changes.
                    </p>
                </div>

                <EditCategoryForm />
            </div>
        </div>
    );
}