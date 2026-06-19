"use client";

import { useAddContactMutation } from "@/services/api/contactApi";
import React, { useState } from "react";

export default function ContactForm(){
    const [form, setForm] = useState({
        firstName : "",
        lastName : "",
        email : "",
        subject : "",
        message : ""
    });
    const [addContact, { isLoading }] = useAddContactMutation();

    const handleChange = (e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setForm(prev => ({...prev, [name] : value}))
    }

    const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await addContact(form).unwrap();

            console.log(response);

            setForm({
                firstName: "",
                lastName : "",
                email : "",
                subject : "",
                message : "",
            });
        } catch (error) {
            console.log(error);
        }
    }


    return <div 
        className="container mb-16 md:mb-24 lg:mb-28"
    >
        <form 
            className="w-full max-w-[640px] grid grid-cols-1 sm:grid-cols-2 gap-4 bg-light p-8 sm:p-12 rounded-2xl shadow-search-field mx-auto dark:bg-heading
            [&_label]:block [&_label]:text-primary [&_label]:leading-[1.55] [&_label]:mb-1.5
            [&_input]:w-full [&_input]:text-sm [&_input]:leading-[1.55] [&_input]:text-primary [&_input]:py-2 [&_input]:px-4 [&_input]:border [&_input]:border-br [&_input]:rounded-lg
            [&_textarea]:h-[100px] [&_textarea]:w-full [&_textarea]:text-sm [&_textarea]:leading-[1.55] [&_textarea]:text-primary [&_textarea]:py-2 [&_textarea]:px-4 [&_textarea]:border [&_textarea]:border-br [&_textarea]:rounded-lg
            "
            onSubmit={handleSubmit}
        >
            <strong
                className="col-span-full sm:col-span-2 text-lg md:text-[21px] text-primary font-bold leading-[1.2] -tracking-[0.04em] mb-1 md:mb-2"
            >
                Ready to Get Started?
            </strong>
            <div>
                <label htmlFor="contact-first-name">First Name *</label>
                <input type="text" name="firstName" value={form.firstName} onChange={handleChange} id="contact-first-name" aria-label="contact-first-name" required />
            </div>
            <div>
                <label htmlFor="contact-last-name">Last Name *</label>
                <input type="text" name="lastName" value={form.lastName} onChange={handleChange} id="contact-last-name" aria-label="contact-last-name" required/>
            </div>
            <div>
                <label htmlFor="contact-email">Email *</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} id="contact-email" aria-label="contact-email" required />
            </div>
            <div>
                <label htmlFor="contact-subject">Subject *</label>
                <input type="text" name="subject" value={form.subject} onChange={handleChange} id="contact-subject" aria-label="contact-subject" required />
            </div>
            <div
                className="col-span-full sm:col-span-2"
            >
                <label htmlFor="contact-message">Your message *</label>
                <textarea id="contact-message" name="message" value={form.message} onChange={handleChange} aria-label="contact-message" required></textarea>
            </div>
            <button
                className="w-full sm:w-fit min-h-10 flex items-center justify-center leading-[1.2] text-light dark:text-dark font-bold -tracking-[0.03em] bg-linear-(--linear-bg) p-[10px_18px] rounded-lg mt-1 cursor-pointer transition-all duration-[0.25s] ease-in hover:shadow-btn-hover "
                type="submit"
                disabled={isLoading}
            >
                {isLoading ? "Submitting..." : "Submit Request"}
            </button>
        </form>
    </div>
}