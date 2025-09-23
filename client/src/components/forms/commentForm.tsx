// REACT ICONS
import { BsCheck } from "react-icons/bs";

export default function CommentForm(){
    return <div
        className="bg-light p-8 rounded-2xl shadow-search-field mt-6 dark:bg-heading"
    >
        <h3
            className=" text-lg text-primary font-bold leading-[1.2] -tracking-[0.04em] mb-1.5"
        >Leave a Comment</h3>
        <p
            className="text-sm text-para mb-6"
        >Your email address will not be published. Required fields are marked *</p>
        <form
            className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 *:mb-4
            [&_label]:block [&_label]:text-sm [&_label]:text-primary [&_label]:leading-[1.55] [&_label]:mb-1.5
            [&_input]:w-full [&_input]:text-primary [&_input]:leading-[1.55] [&_input]:py-[9px] [&_input]:px-4 [&_input]:border [&_input]:border-br [&_input]:rounded-lg
            [&_textarea]:w-full [&_textarea]:h-32! [&_textarea]:text-primary [&_textarea]:leading-[1.55] [&_textarea]:py-[9px] [&_textarea]:px-4 [&_textarea]:border [&_textarea]:border-br [&_textarea]:rounded-lg
            "
        >
            <div>
                <label htmlFor="comment-name">Name *</label>
                <input type="text" placeholder="Name *" id="comment-name" aria-label="comment-name" />
            </div>
            <div>
                <label htmlFor="comment-email">Email *</label>
                <input type="email" placeholder="Email *" id="comment-email" aria-label="comment-email" />
            </div>
            <div
                className="col-span-full sm:col-span-2"
            >
                <label htmlFor="comment-message">Your Comment *</label>
                <textarea id="comment-message" placeholder="Your Comment *" aria-label="comment-message"></textarea>
            </div>
            <div
                className="w-full sm:w-[75%] flex items-start justify-start gap-2 col-span-full sm:col-span-2"
            >
                <div
                    className="flex-none w-[18px] h-[18px] flex items-center justify-center border border-para rounded-sm cursor-pointer relative has-checked:[&_svg]:visible"
                >
                    <input type="checkbox" id="save-name"
                        className="w-full h-full opacity-0 absolute top-0 left-0 z-[1] cursor-pointer"
                    />
                    <BsCheck 
                        className="w-[20px] h-[20px] absolute top-1/2 left-1/2 -translate-1/2 invisible transition-all duration-[0.25s] ease-in"
                    />
                </div>
                <label htmlFor="save-name"
                    className="text-primary text-sm leading-[1.55] mb-0! cursor-pointer"
                >Save my name and email in this browser for the next time I comment.</label>
            </div>
            <button  
                className="w-full sm:w-fit min-h-10 flex items-center justify-center leading-[1.2] text-light dark:text-dark font-bold -tracking-[0.03em] bg-linear-(--linear-bg) p-[10px_18px] rounded-lg cursor-pointer transition-all duration-[0.25s] ease-in hover:shadow-btn-hover"
            aria-label="submit-comment">Submit Comment</button>
        </form>
    </div>
}