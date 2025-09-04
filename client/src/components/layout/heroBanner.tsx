export default function HeroBanner(){
    return <div 
            className="container py-[32px_40px] md:py-16 mb-10 md:mb-16 border-b border-b-br"
        >
        <h1 
            className="max-w-[920px] text-[42px] md:text-[44px] lg:text-[52px] text-center font-bold leading-[1.2] -tracking-[2.6px] text-primary mx-auto"
        >
            Heartfelt
        <span 
            className="block xs:inline bg-clip-text text-transparent bg-linear-(--linear-bg) ml-2.5 dark:text-dark"
        >
             Reflections
        </span>
            : Stories of Love, Loss, and Growth
        </h1>
        <p 
            className="max-w-[640px] text-lg text-center text-para mt-2.5 mx-auto"
        >
            Revision Welcomes to ultimate source for fresh perspectives! Explore curated content to enlighten, entertain and engage global readers.
        </p>
    </div>
}