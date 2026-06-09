import { HeaderLinksType } from "@/@types/header-links-type";

// HEADER LINK
export const links : HeaderLinksType[] = [
    {id : 0, name : "home", href : "/", isDropdown: false},
    {id : 1, name : "categories", href : "/category", isDropdown:true},
    {id : 2, name : "about", href : "/about", isDropdown: false},
    {id : 3, name : "contacts", href : "/contact", isDropdown: false},
];
