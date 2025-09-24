export default function ContactForm(){
    return <div 
        className="container mb-16 md:mb-24 lg:mb-28"
    >
        <form 
            className="w-full max-w-[640px] grid grid-cols-1 sm:grid-cols-2 gap-4 bg-light p-8 sm:p-12 rounded-2xl shadow-search-field mx-auto dark:bg-heading
            [&_label]:block [&_label]:text-primary [&_label]:leading-[1.55] [&_label]:mb-1.5
            [&_input]:w-full [&_input]:text-sm [&_input]:leading-[1.55] [&_input]:text-primary [&_input]:py-2 [&_input]:px-4 [&_input]:border [&_input]:border-br [&_input]:rounded-lg
            [&_textarea]:h-[100px] [&_textarea]:w-full [&_textarea]:text-sm [&_textarea]:leading-[1.55] [&_textarea]:text-primary [&_textarea]:py-2 [&_textarea]:px-4 [&_textarea]:border [&_textarea]:border-br [&_textarea]:rounded-lg

            "
        >
            <strong
                className="col-span-full sm:col-span-2 text-lg md:text-[21px] text-primary font-bold leading-[1.2] -tracking-[0.04em] mb-1 md:mb-2"
            >
                Ready to Get Started?
            </strong>
            <div>
                <label htmlFor="contact-first-name">First Name *</label>
                <input type="text" id="contact-first-name" aria-label="contact-first-name" />
            </div>
            <div>
                <label htmlFor="contact-last-name">Last Name *</label>
                <input type="text" id="contact-last-name" aria-label="contact-last-name"/>
            </div>
            <div>
                <label htmlFor="contact-email">Email *</label>
                <input type="text" id="contact-email" aria-label="contact-email" />
            </div>
            <div>
                <label htmlFor="contact-subject">Subject *</label>
                <input type="text" id="contact-subject" aria-label="contact-subject" />
            </div>
            <div
                className="col-span-full sm:col-span-2"
            >
                <label htmlFor="contact-message">Your message *</label>
                <textarea id="contact-message" aria-label="contact-message"></textarea>
            </div>
            <button
                className="w-full sm:w-fit min-h-10 flex items-center justify-center leading-[1.2] text-light dark:text-dark font-bold -tracking-[0.03em] bg-linear-(--linear-bg) p-[10px_18px] rounded-lg mt-1 cursor-pointer transition-all duration-[0.25s] ease-in hover:shadow-btn-hover "
            >
                Submit Request
            </button>
        </form>
    </div>
}