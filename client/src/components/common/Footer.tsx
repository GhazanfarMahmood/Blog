
"use client";

// NEXT IMAGE AND LINK
import Image from "next/image";
import Link from "next/link";

// IMAGES AND ICONS
import footer_logo from "@/assets/images/footer-logo.webp";
import footer_dark from "@/assets/images/footer-dark-logo.webp";

import fb_icon from "@/assets/icons/fb-icon.svg";
import x_icon from "@/assets/icons/x.svg";
import insta_icon from "@/assets/icons/insta.svg";
import linkedin_icon from "@/assets/icons/linkedin.svg";

// FOOTER DATA
import { pagesLink } from "@/data/footer-data";

// COMPONENTS
import Skeleton from "@/components/ui/Skeleton";

// HOOKS
import { useState, type FormEvent } from "react";
import { useGetCategoryQuery } from "@/services/api/categoryApi";
import { useSubscribeNewsletterMutation } from "@/services/api/newsLetterApi";

export default function Footer() {
    const [footerLinks, setFooterLinks] = useState("");
    const [email, setEmail] = useState("");

    // GET CATEGORIES
    const {
        data,
        isLoading,
        error,
    } = useGetCategoryQuery();

    // NEWSLETTER MUTATION
    const [
        subscribeNewsletter,
        {
            isLoading: newsLetterLoading,
            isSuccess: newsLetterSuccess,
            error: newsLetterError,
        },
    ] = useSubscribeNewsletterMutation();

    // SPLIT CATEGORIES INTO TWO COLUMNS
    const firstHalf = data
        ? data.slice(0, Math.ceil(data.length / 2))
        : [];

    const secondHalf = data
        ? data.slice(Math.ceil(data.length / 2))
        : [];

    // NEWSLETTER SUBMISSION
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const trimmedEmail = email.trim();

        if (!trimmedEmail || newsLetterLoading) return;

        try {
            await subscribeNewsletter({
                email: trimmedEmail,
            }).unwrap();

            setEmail("");
        } catch (error) {
            console.error("Newsletter subscription failed:", error);
        }
    };

    // CATEGORY SKELETON
    const renderCategorySkeleton = () => (
        <>
            {Array.from({ length: 4 }).map((_, index) => (
                <li key={index}>
                    <Skeleton
                        width="100px"
                        height="14px"
                    />
                </li>
            ))}
        </>
    );

    // CATEGORY ERROR
    const renderCategoryError = () => (
        <li>
            <p className="text-sm text-red-500">
                Unable to load categories. Please try again later.
            </p>
        </li>
    );

    // CATEGORY EMPTY STATE
    const renderCategoryEmpty = () => (
        <li>
            <p className="text-sm text-para">
                No categories available.
            </p>
        </li>
    );

    // CATEGORY LINKS
    const renderCategoryLinks = (categories: typeof firstHalf) => (
        <>
            {categories.map((link) => (
                <li key={link._id}>
                    <Link
                        href={`/category/${link.slug}`}
                        aria-label={`${link.categoryName}-link`}
                    >
                        {link.categoryName}
                    </Link>
                </li>
            ))}
        </>
    );

    return (
        <>
            {/* NEWSLETTER SECTION */}
            <div className="container">
                <div className="max-w-[480px] flex flex-col items-center justify-center mx-auto mb-9 md:mb-12 lg:mb-16">

                    <h2 className="text-primary font-bold leading-[1.2] text-[33px] -tracking-[0.04em] text-center">
                        Subscribe to our Newsletter
                    </h2>

                    <p className="text-para text-center my-[10px_22px]">
                        Subscribe to our email newsletter to get the latest posts delivered right to your email.
                    </p>

                    <form
                        className="w-full max-w-[400px] flex items-center justify-center flex-col sm:flex-row gap-2 bg-transparent dark:bg-[#222] sm:bg-light p-[5px] border-0 sm:border border-solid border-br rounded-lg shadow-none sm:shadow-search-field transition-all duration-[0.25s] ease-in hover:shadow-none sm:hover:shadow-hover"
                        onSubmit={handleSubmit}
                    >
                        <input
                            type="email"
                            placeholder="Enter Your Email"
                            className="w-full text-primary font-medium py-2 px-4 border border-solid border-br sm:border-0 rounded-lg shadow-search-field sm:shadow-none transition-all duration-[0.25s] ease-in focus:outline-none hover:shadow-hover sm:hover:shadow-none"
                            aria-label="email-input"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={newsLetterLoading}
                        />

                        <button
                            type="submit"
                            disabled={newsLetterLoading}
                            className="w-full sm:w-fit min-h-10 flex items-center justify-center leading-[1.2] text-light dark:text-dark font-bold -tracking-[0.03em] bg-linear-(--linear-bg) p-[10px_18px] rounded-lg cursor-pointer transition-all duration-[0.25s] ease-in hover:shadow-btn-hover disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {newsLetterLoading ? (
                                <span className="flex items-center gap-2">
                                    <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                    Subscribing...
                                </span>
                            ) : (
                                "Subscribe"
                            )}
                        </button>
                    </form>

                    {/* NEWSLETTER SUCCESS */}
                    {newsLetterSuccess && (
                        <p
                            className="text-sm text-green-600 text-center mt-3"
                            role="status"
                            aria-live="polite"
                        >
                            Thank you! You have successfully subscribed to our newsletter.
                        </p>
                    )}

                    {/* NEWSLETTER ERROR */}
                    {newsLetterError && (
                        <p
                            className="text-sm text-red-500 text-center mt-3"
                            role="alert"
                            aria-live="polite"
                        >
                            Unable to subscribe right now. Please try again.
                        </p>
                    )}

                    <span className="block text-center text-primary text-[13px] -tracking-[0.03em] font-extrabold mt-3">
                        Pure inspiration, zero spam ✨
                    </span>

                </div>
            </div>

            {/* FOOTER SECTION */}
            <footer className="container">
                <div className="py-8 md:py-12 border-t border-t-br">

                    <div className="grid grid-cols-1 lg:grid-cols-2">

                        {/* FOOTER BRAND */}
                        <div>

                            <Link href="/" aria-label="footer home">
                                <Image
                                    src={footer_logo}
                                    alt="footer-logo"
                                    width={131}
                                    height={38}
                                    className="dark:hidden"
                                />

                                <Image
                                    src={footer_dark}
                                    alt="footer-logo"
                                    width={131}
                                    height={38}
                                    className="hidden dark:block"
                                />
                            </Link>

                            <p className="max-w-[410px] text-sm text-primary mt-3">
                                Welcome to ultimate source for fresh perspectives! Explore curated content to enlighten, entertain and engage global readers.
                            </p>

                            {/* SOCIAL LINKS */}
                            <ul className="flex items-center justify-start mt-2 mb-4 lg:mb-0 -ml-2 *:w-10 *:h-10 *:flex *:items-center *:justify-center [&_img]:transition [&_img]:duration-[0.25s] [&_img]:ease-in [&_img]:filter-(--filter-primary) dark:[&_img]:filter-(--filter-white) [&_a]:hover:*:filter-(--filter-secondary) dark:[&_img]:hover:opacity-80">

                                <li>
                                    <Link href="/" aria-label="facebook">
                                        <Image src={fb_icon} alt="facebook-icon" width={24} height={24} />
                                    </Link>
                                </li>

                                <li>
                                    <Link href="/" aria-label="twitter">
                                        <Image src={x_icon} alt="twitter-icon" width={24} height={24} />
                                    </Link>
                                </li>

                                <li>
                                    <Link href="/" aria-label="instagram">
                                        <Image src={insta_icon} alt="instagram-icon" width={24} height={24} />
                                    </Link>
                                </li>

                                <li>
                                    <Link href="/" aria-label="linkedin">
                                        <Image src={linkedin_icon} alt="linkedin-icon" width={24} height={24} />
                                    </Link>
                                </li>

                            </ul>
                        </div>

                        {/* FOOTER NAVIGATION */}
                        <div
                            className="
                                flex items-start justify-start lg:justify-end gap-x-12 xl:gap-x-20 gap-y-5 md:gap-y-8 md:flex-wrap flex-col md:flex-row
                                [&>*]:w-full [&>*]:md:w-fit
                                [&_strong]:w-full [&_strong]:md:w-fit [&_strong]:block [&_strong]:text-[12px] [&_strong]:uppercase [&_strong]:font-extrabold [&_strong]:tracking-widest [&_strong]:leading-[1.4] [&_strong]:text-para [&_strong]:mb-[1.2px] [&_strong]:relative
                                [&_ul]:md:block [&_ul]:h-0 [&_ul]:md:h-fit [&_ul]:opacity-0 [&_ul]:md:opacity-100 [&_ul]:invisible [&_ul]:md:visible [&_ul]:transition [&_ul]:duration-[0.25s] [&_ul]:ease-in [&_ul]:mt-0 [&_ul]:md:mt-[18px] [&_ul]:*:mt-[12px] [&_ul]:*:first:mt-[0]
                                [&_a]:font-semibold [&_a]:capitalize [&_a]:leading-[1.2] [&_a]:-tracking-[-0.03em] [&_a]:text-primary [&_a]:pb-[1.6px] [&_a]:transition [&_a]:duration-[0.25s] [&_a]:ease-in [&_a]:hover:opacity-70
                            "
                        >

                            {/* FIRST CATEGORY COLUMN */}
                            <div>

                                <strong
                                    className={`strong-after ${footerLinks === "active-one" && "rotation-active"}`}
                                    onClick={() => {
                                        setFooterLinks(
                                            footerLinks !== "active-one"
                                                ? "active-one"
                                                : ""
                                        );
                                    }}
                                >
                                    Categories
                                </strong>

                                <ul
                                    className={`${footerLinks === "active-one" && "h-fit! visible! opacity-100! mt-[18px]!"}`}
                                    aria-live="polite"
                                >
                                    {isLoading ? (
                                        renderCategorySkeleton()
                                    ) : error ? (
                                        renderCategoryError()
                                    ) : data && data.length > 0 ? (
                                        renderCategoryLinks(firstHalf)
                                    ) : (
                                        renderCategoryEmpty()
                                    )}
                                </ul>

                            </div>

                            {/* SECOND CATEGORY COLUMN */}
                            <div>

                                <strong
                                    className={`strong-after ${footerLinks === "active-two" && "rotation-active"}`}
                                    onClick={() => {
                                        setFooterLinks(
                                            footerLinks !== "active-two"
                                                ? "active-two"
                                                : ""
                                        );
                                    }}
                                >
                                    Categories
                                </strong>

                                <ul
                                    className={`${footerLinks === "active-two" && "h-fit! visible! opacity-100! mt-[18px]!"}`}
                                    aria-live="polite"
                                >
                                    {isLoading ? (
                                        renderCategorySkeleton()
                                    ) : !error && secondHalf.length > 0 ? (
                                        renderCategoryLinks(secondHalf)
                                    ) : null}
                                </ul>

                            </div>

                            {/* PAGES COLUMN */}
                            <div>

                                <strong
                                    className={`strong-after ${footerLinks === "active-three" && "rotation-active"}`}
                                    onClick={() => {
                                        setFooterLinks(
                                            footerLinks !== "active-three"
                                                ? "active-three"
                                                : ""
                                        );
                                    }}
                                >
                                    Pages
                                </strong>

                                <ul
                                    className={`${footerLinks === "active-three" && "h-fit! visible! opacity-100! mt-[18px]!"}`}
                                >
                                    {pagesLink.map((link) => (
                                        <li key={link.id}>
                                            <Link
                                                href={link.href}
                                                aria-label={`${link.name}-link`}
                                            >
                                                {link.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>

                            </div>

                        </div>

                    </div>

                    <p className="text-[12px] text-para mt-8 lg:mt-4">
                        © 2024 — Revision. All Rights Reserved.
                    </p>

                </div>
            </footer>
        </>
    );
}
