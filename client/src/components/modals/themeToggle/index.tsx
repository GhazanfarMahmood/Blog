'use client';

import { useTheme } from "next-themes";

export default function ThemeToggle(
    {themeDropdown, setThemeDropdown} :{themeDropdown : boolean, setThemeDropdown: (arg: boolean) => void}
){
      const { setTheme } = useTheme()
    return <>
        <div className={`w-32 bg-light dark:bg-[#222] rounded-lg shadow-search dark:shadow-none opacity-0 invisible p-1 absolute top-[unset] bottom-[82%] lg:bottom-[unset] lg:top-[120%] right-5 lg:right-0 z-[4] transition-all duration-[0.25s] ease-in *:block *:leading-[1.2] *:p-[10px_30px_10px_10px] *:rounded-lg *:cursor-pointer *:transition-all *:duration-[0.25s] *:ease-in *:hover:bg--link-bg ${themeDropdown && "opacity-100 visible"}`}>
            <span onClick={() => {setThemeDropdown(!themeDropdown); setTheme("light")}}>Light</span>
            <span onClick={() => {setThemeDropdown(!themeDropdown); setTheme("dark")}}>Dark</span>
            <span onClick={() => {setThemeDropdown(!themeDropdown); setTheme("system")}}>System</span>
        </div>
    </>
}