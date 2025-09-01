// SEARCH DATA LINK
import { searchLinks } from "@/constants/header-data";

// LINK FROM NEXT LINK 
import Link from "next/link";

// REACT ICON
import { IoMdClose } from "react-icons/io";

export function HeaderSearch(
    {searchActive, setSearchActive}: {searchActive : boolean, setSearchActive: (arg: boolean) => void}
){
    return <div 
            className={`w-[calc(100%-48px)] sm:w-[430px] lg:w-[480px] bg-light dark:bg-[#222] py-6 sm:py-10 px-5 sm:px-8 rounded-2xl shadow-search dark:shadow-none opacity-0 invisible absolute top-[90%] sm:top-[104%] right-6 z-[4] transition-all duration-[0.25s] ease-in ${searchActive && "opacity-100 visible"}`}
        >
        <h2 
            className="max-w-[189px] sm:max-w-full text-md font-bold text-primary leading-[1.2] -tracking-[0.04em] break-all mb-4"
        >
            What are You Looking For?
        </h2>
        <button
            className="w-10 h-10 flex items-center justify-center text-phara dark:text-dark hover:text-primary cursor-pointer absolute top-[12px] right-[13px] transition-all duration-[0.25s] ease-in"
            onClick={() => setSearchActive(false)} aria-label="close search tab" 
        >
            <IoMdClose className="w-6 h-6" />
        </button>
        <form 
            className="flex items-center justify-center flex-col sm:flex-row gap-2 bg-transparent sm:bg-light dark:bg-[#222] p-[5px] border-0 sm:border border-solid border-br rounded-lg shadow-none sm:shadow-search-field hover:shadow-none sm:hover:shadow-hover transition-all duration-[0.25s] ease-in"
        >
            <input type="text" placeholder="Start Typing" aria-label="search box"
                className="w-full text-primary focus:outline-none rounded-lg py-2 px-4 font-medium border border-solid border-br sm:border-0 shadow-search-field sm:shadow-none transition-all duration-[0.25s] ease-in hover:shadow-hover sm:hover:shadow-none" 
            />
            <button type="button" 
                className="w-full sm:w-fit p-[10px_18px] bg-linear-(--linear-bg) min-h-10 flex items-center justify-center leading-[1.2] text-light dark:text-dark font-bold -tracking-[0.03em] rounded-lg cursor-pointer transition-all duration-[0.25s] ease-in hover:shadow-btn-hover "
            >
                Search
            </button>
        </form>
        <ul 
            className="flex items-center justify-start gap-[9px] sm:gap-[9px] flex-wrap mt-3 sm:mt-4 md:mt-6"
        >
            {searchLinks.map((link) => {
               return <li key={link.id}>
                    <Link href={"/"} aria-label={`${link.name} link`}
                        className="text-[11px] font-extrabold leading-[1.2] uppercase tracking-[0.1em] text-nowrap text-primary bg-light dark:bg-transparent p-[5px_10px] rounded-md dark:border dark:border-br shadow-links dark:shadow-none transition-all duration-[0.25s] ease-in hover:text-phara hover:shadow-link-hover hover:opacity-70 dark:hover:text-primary"
                    >
                        {link.name}
                    </Link>
               </li>
            })}
        </ul>
    </div>
}