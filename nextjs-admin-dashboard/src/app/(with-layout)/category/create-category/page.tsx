import Link from "next/link";
import CreateCategoryForm from "./_components/create-category-form";

export default function Page() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-semibold text-dark dark:text-white">
                    Create Category
                </h1>

                <p className="mt-1 text-sm text-dark-5 dark:text-dark-6">
                    Create a new category for your blog.
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
                    Create Category
                </span>
            </div>

            <div className="rounded-xl border border-stroke bg-white p-6 shadow-1 dark:border-dark-3 dark:bg-gray-dark">
                <div className="mb-6">
                    <h2 className="text-lg font-semibold text-dark dark:text-white">
                        Category Information
                    </h2>

                    <p className="mt-1 text-sm text-dark-5 dark:text-dark-6">
                        Enter the information below to create a category.
                    </p>
                </div>

                <CreateCategoryForm />
            </div>
        </div>
    );
}