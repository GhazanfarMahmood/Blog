// COMPONENT
import ContactForm from "@/components/forms/contactForm";
import BreadCrumb from "@/components/layout/breadCrumb";
import ContactLayout from "@/components/layout/contactLayout";

export default function ContactUs(){
    return <>
        <BreadCrumb pageName="Contacts" />
        <ContactLayout />
        <ContactForm />
    </>
}