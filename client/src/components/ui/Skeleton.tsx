
import React from "react";

type SkeletonProps = {
    width?: string;
    height?: string;
    rounded?: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";
    className?: string;
    count?: number;
};

const roundedStyles = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    "2xl": "rounded-2xl",
    full: "rounded-full",
};

const Skeleton = ({
    width = "100%",
    height = "16px",
    rounded = "md",
    className = "",
    count = 1,
}: SkeletonProps) => {
    return (
        <>
            {Array.from({ length: count }).map((_, index) => (
                <div
                    key={index}
                    className={`animate-pulse ${roundedStyles[rounded]} ${className}`}
                    style={{
                        width,
                        height,
                        backgroundColor: "var(--skeleton-bg)",
                    }}
                />
            ))}
        </>
    );
};

export default Skeleton;
