import CreatePostForm from "./_components/create-post-form";

export default function Page() {
    return (
        <div className="mx-auto w-full max-w-7xl">
            <div className="mb-6">
                <h1 className="text-2xl font-semibold text-dark dark:text-white">
                    Create Post
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    Create and publish a new blog post.
                </p>
            </div>

            <CreatePostForm />
        </div>
    );
}