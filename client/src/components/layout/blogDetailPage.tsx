// NEXT JS IMAGE AND LINK
import Link from "next/link";

// COMPONENTS
import { NextBlogData } from "@/constants/next-blog";
import BlogCard from "../cards/blogCard";
import ArticleNavigation from "./articaleNavigation";
import { ArticleNavigationData } from "@/constants/article-navigation";
import BlogComment from "./blogComment";
import Image from "next/image";
import SideLink from "./sideLink";
import AuthorDetail from "../cards/authorDetail";
import FeatureCard from "../cards/featureCard";
import WorkExperience from "../cards/workExperience";
import Technology from "../cards/technology";
import Creating from "../cards/creating";

// IMAGE FROM ASSETS
import blog_detail_img1 from "@/assets/images/blog-detail-img1.webp";
import blog_detail_img2 from "@/assets/images/blog-detail-img2.webp";


export default function BlogDetailPage(){
    return <>
        <div 
            className="container"
        >
            <div 
                className="flex items-center justify-center gap-1.5 mb-2.5"
            >
                <Link aria-label="ethan caldwell-authorName" href={"/"}
                    className="text-[15px] font-semibold leading-[1.2] -tracking-[0.02em] text-secondary capitalize transition-all duration-[0.25s] ease-in hover:text-primary dark:text-dark dark:hover:text-para" 
                >
                    ethan caldwell
                </Link>
                <span 
                    className="text-[15px] font-semibold leading-[1.2] -tracking-[0.02em] text-para capitalize"
                >
                    on september 29, 2024
                </span>
            </div>
            <h2
                className="max-w-[720px] text-primary text-[42px] md:text-[44px] lg:text-[52px] font-bold leading-[1.2] -tracking-[0.04em] text-center mx-auto mb-2.5"
            >
                Startups and AI: How Artificial Intelligence Drives Innovation
            </h2>
            <p
                className="max-w-[640px] text-lg text-center text-primary text-balance leading-[1.55] mx-auto opacity-70"
            >
                See how startups are harnessing the power of AI to foster innovation and reshape industries.
            </p>
            <Link aria-label="category-link" href={"/"}
                className="block w-fit text-[11px] font-extrabold leading-[1.2] uppercase tracking-[0.1em] text-nowrap text-primary bg-light dark:bg-transparent p-[5px_10px] rounded-md mx-auto mt-6 mb-[27px] dark:border dark:border-br shadow-links dark:shadow-none transition-all duration-[0.25s] ease-in hover:text-para hover:shadow-link-hover hover:opacity-70 dark:hover:text-primary"    
            >
                Startups
            </Link>
            <div>
                <Image src={blog_detail_img1} alt="blog-detail-img" width={1248} height={702}
                    className="w-full h-full object-cover rounded-2xl"
                />
            </div>
            <div 
                className="grid grid-cols-1 lg:grid-cols-[minmax(80px,80px)_minmax(481px,746px)_minmax(340px,382px)] gap-5 xl:gap-10 mt-16 mb-16 md:mb-24 lg:mb-28"
            >
                <div 
                    className="hidden lg:block"
                >
                    <SideLink />
                </div>
                <div>
                    <div
                        className="[&_p]:text-lg [&_p]:leading-[1.55] [&_p]:text-primary [&_p]:mb-7
                        [&_strong]:text-lg [&_strong]:text-primary [&_strong]:font-extrabold [&_strong]:leading-[1.55]
                        [&_a]:text-lg [&_a]:text-secondary [&_a]:font-extrabold [&_a]:leading-[1.55] [&_a]:underline dark:[&_a]:text-dark
                        [&_ul]:pl-7 [&_ul]:mt-3.5 [&_ul]:mb-7 [&_ul]:marker:text-secondary dark:[&_ul]:marker:text-dark
                        [&_li]:text-lg [&_li]:text-primary [&_li]:leading-[1.55] [&_li]:list-disc [&_li]:mb-2
                        [&_small]:block [&_small]:text-sm [&_small]:text-para [&_small]:mt-2.5
                        [&_img]:w-full [&_img]:h-full [&_img]:object-cover [&_img]:rounded-2xl
                        [&_h3]:text-[33px] md:[&_h3]:text-[42px] [&_h3]:text-primary [&_h3]:font-bold [&_h3]:leading-[1.2] [&_h3]:-tracking-[0.04rem] [&_h3]:mt-7 [&_h3]:mb-3.5
                        [&_h4]:text-[24px] md:[&_h4]:text-[33px] [&_h4]:text-primary [&_h4]:font-bold [&_h4]:leading-[1.2] [&_h4]:-tracking-[0.04rem] [&_h4]:mt-7 [&_h4]:mb-3.5
                        [&_blockquote]:text-light [&_blockquote]:bg-primary [&_blockquote]:p-8 [&_blockquote]:rounded-2xl [&_blockquote]:my-7 [&_blockquote]:relative 
                        [&_blockquote>p]:text-light [&_blockquote>p]:text-2xl [&_blockquote>p]:font-bold [&_blockquote>p]:leading-[1.2] [&_blockquote>p]:-tracking-[0.04em] [&_blockquote>p]:mt-[30px] 
                        dark:[&_blockquote>p]:text-dark
                        [&_blockquote]:after:font-bold [&_blockquote]:after:leading-[1.2]
                        [&_blockquote]:after:text-[52px] [&_blockquote]:after:absolute [&_blockquote]:after:top-[19px] [&_blockquote]:after:left-[31px] [&_blockquote]:after:inline-block [&_blockquote]:after:content-['“'] dark:[&_blockquote]:bg-heading
                        dark:[&_blockquote]:text-dark
                        [&_blockquote>span]:block [&_blockquote>span]:font-bold [&_blockquote>span]:text-light [&_blockquote>span]:opacity-70 [&_blockquote>span]:text-xs [&_blockquote>span]:uppercase [&_blockquote>span]:leading-[1.2] [&_blockquote>span]:tracking-widest
                        dark:[&_blockquote>span]:text-dark
                        "
                    >
                        <p>
                            In today’s ever-evolving world, storytelling has become a powerful tool for connection. <strong>Revision</strong> provides a unique platform for individuals to share their stories.
                        </p>
                        <p>
                            Revision is more than a typical content hub. It’s a dynamic space for meaningful conversations and personal stories that resonate with people on an emotional level. Whether you are looking for inspiration, comfort, or just a different perspective on life, Revision offers a wide range of narratives to explore.
                        </p>
                        <p>
                            So, what makes Revision stand out as the place for heartfelt reflections?
                        </p>
                        <p>
                            Revision is more than a typical content hub. It’s a dynamic space for meaningful conversations and personal stories that resonate with people on an emotional level. Whether you are looking for inspiration, comfort, or just a different perspective on life, Revision offers a wide range of narratives to explore.
                        </p>
                        <p>
                            With <Link href={"/"} aria-label="category">categories</Link> covering everything from love and relationships to personal development and lifestyle, it encourages readers to explore topics that touch on their emotions and experiences.
                        </p>
                        <h3>Stories that Matter</h3>
                        <p>
                            At the core of Revision is a commitment to delivering stories that matter. Unlike traditional media platforms or news, Revision invites readers into a world of deeply personal narratives. The website’s title, “Heartfelt Reflections: Stories of Love, Loss, and Growth,” signals this intent clearly, inviting you to journey through the most intimate aspects of human experience.
                        </p>
                        <p>
                            But we’re not just talking about written content — there are many ways that Revision fosters connection and creativity. The different types of features include:
                        </p>
                        <ul>
                            <li>
                                Author Profiles: Each contributor has a detailed profile, allowing readers to connect with their personal journey and social media presence.
                            </li>
                            <li>
                                Experience Widgets: Contributors showcase their professional growth and skills, giving readers insight into their expertise.
                            </li>
                            <li>
                                Technologies Section: Creators highlight the tools they use, such as Figma, Photoshop, and more, providing transparency in their creative processes.
                            </li>
                            <li>
                                Creating Widget: A space where contributors can link to external projects and portfolios, expanding their reach beyond the platform.
                            </li>
                        </ul>
                        <Image src={blog_detail_img2} alt="blog-detail-img" width={700} height={394} />
                        <small>
                            How to raise customer loyalty.
                        </small>
                        <h3>
                            How do I create meaningful connections?
                        </h3>
                        <p>
                            When producing content for platforms like Revision, it’s essential to focus not only on the quality of the writing but also on how it fosters engagement
                        </p>
                        <h3>
                            How do I make authentic engagement? 
                        </h3>
                        <p>
                            There are several ways to ensure your content builds these connections effectively. Here’s what they are:
                        </p>
                        <h4>
                            1. Understand your audience
                        </h4>
                        <p>
                            The first step to creating meaningful connections is understanding who your audience is. This involves researching their demographics, interests, preferences, and needs. Are they young professionals looking for lifestyle tips? Or perhaps seasoned entrepreneurs seeking business insights? Once you have a clear picture of who your readers are, you can start shaping content that resonates with their unique preferences.
                        </p>
                        <p>
                            For instance, knowing that your audience values emotional, personal stories can guide your content to be more reflective and heartfelt, making it easier for them to relate to the subject matter. Furthermore, understanding your audience allows you to tailor your tone and style to better connect with them.
                        </p>
                        <h4>
                            2. Provide diverse perspectives
                        </h4>
                        <p>
                            Before you create content that truly connects, everyone involved in the creation process needs to understand the importance of incorporating diverse perspectives. This includes things like:
                        </p>
                        <ul>
                            <li>
                                Featuring contributors from different backgrounds
                            </li>
                            <li>
                                Showcasing a variety of life experiences
                            </li>
                            <li>
                                Including global viewpoints
                            </li>
                            <li>
                                Highlighting diverse professional expertise
                            </li>
                        </ul>
                        <p>
                            Going through this checklist will ensure that your content covers multiple angles, making it richer and more inclusive. This approach prevents your content from feeling one-dimensional or narrowly focused—allowing it to resonate with a broader and more diverse audience.
                        </p>
                        <p>
                            When diverse perspectives are incorporated, readers are more likely to see their own experiences reflected, creating a stronger emotional connection with the content.
                        </p>
                        <blockquote>
                            <p>
                                Stories are the threads that bind us; through them, we understand each other, grow, and heal.
                            </p>
                            <span>JOHN NOORD</span>
                        </blockquote>
                        <p>
                            By showcasing different perspectives, you encourage readers from all walks of life to engage with your content, feel represented, and contribute their own viewpoints. This ultimately enhances the value of the platform, transforming it into a more inclusive and dynamic community.
                        </p>
                    </div>
                    <div
                        className="flex items-center justify-between flex-wrap lg:flex-nowrap gap-4 mt-12 pb-6 border-b border-b-br"
                    >
                        <div 
                            className="flex items-center justify-center gap-1.5 mb-2.5"
                        >
                            <Link aria-label="ethan caldwell-authorName" href={"/"}
                                className="text-[15px] font-semibold leading-[1.2] -tracking-[0.02em] text-secondary capitalize transition-all duration-[0.25s] ease-in hover:text-primary dark:text-dark dark:hover:text-para" 
                            >
                                ethan caldwell
                            </Link>
                            <span 
                                className="text-[15px] font-semibold leading-[1.2] -tracking-[0.02em] text-para capitalize"
                            >
                                on september 29, 2024
                            </span>
                        </div>
                        <Link aria-label="category-link" href={"/"}
                            className="block w-fit text-[11px] font-extrabold leading-[1.2] uppercase tracking-[0.1em] text-nowrap text-primary bg-light dark:bg-transparent p-[5px_10px] rounded-md dark:border dark:border-br shadow-links dark:shadow-none transition-all duration-[0.25s] ease-in hover:text-para hover:shadow-link-hover hover:opacity-70 dark:hover:text-primary"    
                        >
                            Startups
                        </Link>
                        <div
                            className="w-full order-3 block lg:hidden"
                        >
                            <SideLink />
                        </div>
                    </div>
                    <div
                        className="flex flex-col sm:flex-row justify-center gap-6 mt-6"
                    >
                        {ArticleNavigationData.map((item) => {
                            return <ArticleNavigation key={item.id} title={item.title} id={item.id} />
                        })}
                    </div>
                    <BlogComment />
                </div>
                <div>
                    <AuthorDetail />
                    <FeatureCard />
                    <WorkExperience />
                    <Technology />
                    <Creating />
                </div>
            </div>  
            <div>
                <h3
                    className="text-[33px] text-primary font-bold leading-[1.2] -tracking-[0.04em] capitalize mb-6 sm:mb-8"
                >Read Next</h3>
                <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6 lg:gap-y-12 mb-16 md:mb-24 lg:mb-28"
                >
                    {NextBlogData.map((data) => {
                        return <BlogCard title={data.title} img={data.img} category={data.category} subCategory={data.subCategory} reading={data.reading} authorName={data.authorName} month={data.month} year={data.year} day={data.day} description={data.description} key={data.id} />
                    })}
                </div>
            </div>
        </div>
    </>
}