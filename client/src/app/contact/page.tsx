// COMPONENT
import ContactForm from "@/components/forms/contactForm";
import BreadCrumb from "@/components/sections/BreadCrumb";
import ContactLayout from "@/components/sections/ContactLayout";

export default function ContactUs(){
    return <>
        <BreadCrumb pageName="Contacts" />
        <ContactLayout />
        <ContactForm />
    </>
}