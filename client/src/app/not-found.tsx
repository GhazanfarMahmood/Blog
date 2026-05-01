// NOT FOUND
import Link from "next/link";

export default function NotFound(){
    return <div className="container flex items-center flex-col justify-center my-16">
        <h1
            className="text-9xl font-extrabold bg-clip-text text-transparent bg-linear-(--linear-bg) ml-2.5 dark:text-dark mb-5"
        >
            404
        </h1>
        <p
            className="text-lg font-semibold text-primary mb-2"
        >
            Page Could Not Found
        </p>
        <Link href={"/"} className="text-para underline transition-all duration-[0.25s] ease-in hover:text-secondary">
            Return Home
        </Link>
    </div>
}