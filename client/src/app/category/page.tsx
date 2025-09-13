// COMPONENTS
import BreadCrumb from "@/components/layout/breadCrumb";
import CategoryContent from "../../components/layout/categoryContent";


export default function category(){
    return <>
        <BreadCrumb pageName={"category"} />
        <CategoryContent />
    </>
}