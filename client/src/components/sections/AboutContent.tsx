export default function AboutContent({description}){
    return <div className="container">
        <div 
            className="max-w-[640px] mx-auto mb-16
            *:first:pb-[18px] *:first:mb-[14px] *:text-[21px] md:*:text-2xl *:text-primary *:font-bold *:leading-[1.2] *:-tracking-[0.04em]"
        >
            <h4>
               {description}
            </h4>
        </div>
    </div>
}