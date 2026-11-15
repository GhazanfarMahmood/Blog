
import { Suspense } from "react";

// COMPONENT
import SearchContent from "@/components/sections/SearchContent";

export default function Search() {
    return (
        <Suspense
            fallback={
                <div className="container py-16 text-center">
                    Loading search...
                </div>
            }
        >
            <SearchContent />
        </Suspense>
    );
}
