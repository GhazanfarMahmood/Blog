export default function SearchLayout(){
    return <div
        className="container"
    >
        <h1
            className="text-[42px] md:text-[44px] lg:text-[52px] font-bold leading-[1.2] -tracking-wider md:-tracking-[2.6px] text-primary"
        >
            Search Results: <span>technology</span>
        </h1>
        <form 
            className="w-full max-w-[400px] flex items-center justify-center flex-col sm:flex-row gap-2 bg-transparent dark:bg-[#222] sm:bg-light p-[5px] border-0 sm:border border-solid border-br rounded-lg shadow-none mt-8 mb-3 sm:shadow-search-field transition-all duration-[0.25s] ease-in hover:shadow-none sm:hover:shadow-hover"
        >
            <input type="email" placeholder="Start Typing" 
            className="w-full text-primary font-medium py-2 px-4 border border-solid border-br sm:border-0 rounded-lg shadow-search-field sm:shadow-none transition-all duration-[0.25s] ease-in focus:outline-none hover:shadow-hover sm:hover:shadow-none" aria-label="email-input" 
            />
            <button type="button" 
                className="w-full sm:w-fit min-h-10 flex items-center justify-center leading-[1.2] text-light dark:text-dark font-bold -tracking-[0.03em] bg-linear-(--linear-bg) p-[10px_18px] rounded-lg cursor-pointer transition-all duration-[0.25s] ease-in hover:shadow-btn-hover"
            >
                Search
            </button>
        </form>
    </div>
}