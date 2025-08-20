// SEARCH DATA LINK
import { searchLinks } from "@/constants/headerData";

// LINK FROM NEXT LINK 
import Link from "next/link";

// REACT ICON
import { IoMdClose } from "react-icons/io";

export function HeaderSearch({searchActive, setSearchActive}){
    return <div className={`w-[480px] opacity-0 invisible absolute bg-light py-10 px-8 z-[4] right-6 top-[104%] shadow-search rounded-2xl transition-all duration-[0.25s] ease-in ${searchActive && "opacity-100 visible"}`}>
        <h2 className="text-md text-primary font-bold mb-4 break-all leading-[1.2] -tracking-[0.04em]">What are You Looking For?</h2>
        <button aria-label="close-search" className="w-10 h-10 top-[12px] right-[13px] cursor-pointer flex items-center justify-center absolute text-phara hover:text-primary transition-all duration-[0.25s] ease-in" onClick={() => setSearchActive(false)}>
            <IoMdClose className="w-6 h-6" />
        </button>
        <form className="flex items-center justify-center gap-2 p-[5px] border border-solid border-br rounded-lg bg-light shadow-search-field transition-all duration-[0.25s] ease-in hover:shadow-hover">
            <input type="text" placeholder="Start Typing" className="w-full focus:outline-none text-xs leading-[1.55] text-primary rounded-lg py-2 px-4 font-medium" />
            <button type="button" className="p-[10px_18px] bg-linear-(--linear-bg) min-h-10 flex leading-[1.2] text-light font-bold -tracking-[0.03em] rounded-lg cursor-pointer transition-all duration-[0.25s] ease-in hover:shadow-btn-hover">Search</button>
        </form>
        <ul className="mt-6 flex items-center justify-start gap-[16px_14px] flex-wrap">
            {searchLinks.map((link) => {
               return <li key={link.id}>
                <Link href={"/"} className="p-[5px_10px] text-primary text-[11px] uppercase tracking-[0.1em] leading-[1.2] font-extrabold text-nowrap bg-light rounded-md shadow-links transition-all duration-[0.25s] ease-in hover:text-phara hover:shadow-link-hover hover:opacity-70">{link.name}</Link>
               </li>
            })}
        </ul>
    </div>
}