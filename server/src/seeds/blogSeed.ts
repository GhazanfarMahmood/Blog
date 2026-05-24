import { faker } from '@faker-js/faker';

import dotenv from "dotenv";
dotenv.config();

import mongoose from 'mongoose';
import Blog from '../models/Blog';

function createRandomBlog(){
    const title = faker.book.title();

    return {
        title,
        slug : faker.helpers.slugify(title).toLowerCase(),
        excerpt : faker.lorem.sentences(2),
        content : faker.lorem.paragraph(5),
        
        thumbnail: faker.image.url({
            width: 800,
            height: 800
        }),
        category : [
            faker.helpers.arrayElement([
                "MERN",
                "Web Development",
                "JavaScript",
                "Backend",
            ])
        ],
        tags : faker.helpers.arrayElements(
            ["React", "Node", "Express", "MongoDB", "TypeScript"],
            2
        ),
        author : faker.person.fullName(),

        isPublished : faker.datatype.boolean(),
        reading : faker.number.int({min: 1, max: 8})
    }
}

const blogs = faker.helpers.multiple(createRandomBlog, {
    count: 10,
});



async function seedBlogs(){
    try {
        if(!process.env.MONGO_URI){
            throw new Error("MONGO_URI is not defined");
        };

        await mongoose.connect(process.env.MONGO_URI);

        await Blog.deleteMany();

        await Blog.insertMany(blogs);
        
        console.log("Blogs seeded successfully");
        process.exit();
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

seedBlogs();