
"use client";

import { useGetHomeQuery } from "@/services/api/homeApi";
import Skeleton from "@/components/ui/Skeleton";

export default function HeroBanner() {

    const {
        data,
        isLoading,
        error,
    } = useGetHomeQuery();

    // LOADING STATE
    if (isLoading) {
        return (
            <div className="container py-[32px_40px] md:py-16 mb-10 md:mb-16 border-b border-b-br">

                <div className="max-w-[920px] mx-auto flex flex-col items-center gap-3">
                    <Skeleton width="85%" height="52px" rounded="md" />
                    <Skeleton width="65%" height="52px" rounded="md" />
                </div>

                <div className="max-w-[640px] mx-auto mt-5 flex flex-col items-center gap-2">
                    <Skeleton width="100%" height="18px" />
                    <Skeleton width="85%" height="18px" />
                </div>

            </div>
        );
    }

    // ERROR STATE
    if (error || !data) {
        return (
            <div className="container py-[32px_40px] md:py-16 mb-10 md:mb-16 border-b border-b-br">
                <p className="text-center text-para">
                    Unable to load home content. Please try again later.
                </p>
            </div>
        );
    }

    // SPLIT TITLE AROUND HIGHLIGHTED TEXT
    const highlightIndex = data.title
        .toLowerCase()
        .indexOf(data.highlightText.toLowerCase());

    const titleStart = data.title.slice(0, highlightIndex);
    const highlightedText = data.title.slice(
        highlightIndex,
        highlightIndex + data.highlightText.length
    );
    const titleEnd = data.title.slice(
        highlightIndex + data.highlightText.length
    );

    return (
        <div className="container py-[32px_40px] md:py-16 mb-10 md:mb-16 border-b border-b-br">

            <h1
                className="max-w-[920px] text-[42px] md:text-[44px] lg:text-[52px] text-center font-bold leading-[1.2] -tracking-[2.6px] text-primary mx-auto
                [&_span]:block [&_span]:xs:inline [&_span]:bg-clip-text [&_span]:text-transparent [&_span]:bg-linear-(--linear-bg) [&_span]:ml-2.5 [&_span]:dark:text-dark"
            >
                {titleStart}
                <span>{highlightedText}</span>
                {titleEnd}
            </h1>

            <p className="max-w-[640px] text-lg text-center text-para mt-2.5 mx-auto">
                {data.description}
            </p>

        </div>
    );
}
