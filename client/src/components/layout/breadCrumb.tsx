import Link from "next/link";

export default function BreadCrumb({pageName, subPageName}: {pageName: string, subPageName?: string }){
    return <div className="container">
        <ul 
            className="flex items-center justify-start gap-1 flex-wrap mb-4 sm:mb-5 md:mb-6 lg:mb-8 **:text-xs **:capitalize [&_a]:text-primary [&_a]:pr-4 [&_a]:transition-all [&_a]:duration-[0.25s] [&_a]:ease-in [&_a]:hover:text-para [&_a]:relative [&_span]:text-para breadcrumb"
        >
            <li>
                <Link href={"/"} aria-label="home page link">Home</Link>
            </li>
            {subPageName && 
            <li>
                <Link href={"/"} aria-label="sub page link">{subPageName}</Link>
            </li>
            }
            <li>
                <span>{pageName}</span>
            </li>
        </ul>
    </div>
}