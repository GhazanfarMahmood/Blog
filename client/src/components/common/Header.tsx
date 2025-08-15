
// NEXT JS IMAGE AND LINK FOR OPTIMIZATION AND SINGLE PAGE APPLICATION WE USE NEXT JS IMAGE AND LINK
import Image from "next/image";
import Link from "next/link";

// ICONS AND IMAGES
import Logo from "@/assets/images/revision.webp";

// ICONS FROM REACT ICON 
import { MdWbSunny } from "react-icons/md";

// LINKS
import {links} from "@/constants/data";

export default function Header(){
    
    return (<>
        <header className="container flex items-center justify-center gap-5">
            <Link href={"/"}>
                <Image src={Logo} alt="revision" width={131} height={38} />
            </Link>
            <ul>
                {links.map((item) => {
                    return <li key={item.id}>
                        <Link href={"/"}>
                            {item.name}
                        </Link>
                    </li>
                })}
            </ul>
            <div className="flex items-center justify-center">
                <button>

                </button>
                <button>
                    <MdWbSunny />
                </button>
            </div>
        </header>
    </>)
}