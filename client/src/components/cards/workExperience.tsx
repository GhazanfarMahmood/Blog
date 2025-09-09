
import { Experience } from "@/constants/main-data"

export default function WorkExperience (){
    return <div
        className="max-w-[450px] lg:max-w-none bg-light p-8 rounded-2xl shadow-search-field dark:bg-[#222] mx-auto lg:mx-0 mb-8 mt-4"
    >
        <span
            className="block text-xs font-extrabold uppercase leading-[1.2] tracking-widest text-para mb-5"
        >
            Work experience
        </span>
        <ul 
            className="mt-4 *:py-4 *:first-of-type:pt-0 *:border-b *:border-b-br *:last-of-type:border-b-0"
        >
            {Experience.map((data) => {
                return <li key={data.id}>
                    <div
                        className="flex items-center justify-between"
                    >
                        <strong
                            className="text-lg text-primary font-extrabold -tracking-[0.04em] capitalize leading-[1.2]"
                        >
                            {data.work}
                        </strong>
                        <ul
                            className="flex items-center justify-center gap-0.5 *:text-[15px] *:font-medium *:-tracking-[0.02em] *:leading-[1.2] *:text-para *:capitalize"
                        >
                            <li>{data.from}</li>
                            <li>—</li>
                            <li>{data.now}</li>
                        </ul>
                    </div>
                    <span
                        className="text-base text-primary capitalize mt-4"
                    >
                        {data.company}
                    </span>
                </li>
            })}
        </ul>
    </div>
}