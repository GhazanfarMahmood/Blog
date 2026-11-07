// COMPONENTS
import BreadCrumb from "@/components/sections/BreadCrumb";
import CategoryContent from "../../components/sections/CategoryContent";

export default function Category() {
    return (
        <>
            <BreadCrumb pageName="category" />
            <CategoryContent />
        </>
    );
}