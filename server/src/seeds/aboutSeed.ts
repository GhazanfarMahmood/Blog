import mongoose from "mongoose";
import About from "../models/About";


const seedAbout = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URI as string);

        const exists = await About.countDocuments();

        if(exists) {
            console.log("About already exists");
            process.exit();
        }

        await About.create({
            title : "About Us",
            images: [
                "/images/about-img1.webp",
                "/images/about-img2.webp",
                "/images/about-img3.webp"
            ],
            description : "By 2016, we began to see the fruits of our labor as word spread about our work, leading us to our first major client — a regional retail chain. This was a pivotal moment for us, as it allowed us to hire our first employee. Emma stepped up to lead user experience design, while Liam and I focused on coding and project management. <br /> As we gathered to reflect on our incredible journey, hosting a community event to showcase local tech talent felt like the perfect way to give back and inspire the next generation of innovators. It reminded us that with passion, collaboration, and a bit of code, anything is possible.",
            moreContent : [
                {
                    icon : "/icons/rocket.webp",
                    title : "Empowering Innovation",
                    excerpt : "We consistently push the boundaries of technology, leading to unique and effective solutions.",
                },
                {
                    icon : "/icons/light.webp",
                    title : "Community-Centric Approach",
                    excerpt : "Our commitment to giving back not only enhances their reputation but also strengthens ties within the community.",
                },
                {
                    icon : "/icons/rocket.webp",
                    title : "Flexibility & Adaptability",
                    excerpt : "Our team agile work environment allows them to quickly adapt to changing market needs.",
                },

            ]
        });

        console.log("About seeded successfully");
        process.exit();
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

seedAbout();