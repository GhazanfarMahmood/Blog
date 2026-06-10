import { faker } from '@faker-js/faker';

import dotenv from "dotenv";
dotenv.config();

import mongoose from 'mongoose';
import Blog from '../models/Blog';
import Category from '../models/Category';
import Writer from "../models/Writer";

function createRandomBlog(categories : any[], writers: any[]){
    const title = faker.book.title();   

    return {
        title,
        slug : faker.helpers.slugify(title).toLowerCase(),
        excerpt : faker.lorem.sentences(2),
        content: Array.from({ length : 5}, () => 
            faker.lorem.sentences(
                faker.number.int({
                    min: 15,
                    max: 30
                })
            )
        ).join("\n\n"),
        
        thumbnail: faker.image.url({
            width: 800,
            height: 800
        }),
        category : faker.helpers.arrayElements(
            categories,
            faker.number.int({ min: 1, max: 2 })
        ).map((cat) => cat._id),
        tags : faker.helpers.arrayElements(
            ["React", "Node", "Express", "MongoDB", "TypeScript"],
            2
        ),
        author : faker.helpers.arrayElement(writers)._id,

        isPublished : faker.datatype.boolean(),
        reading : faker.number.int({min: 1, max: 8})
    }
}


async function seedBlogs(){
    try {
        if(!process.env.MONGO_URI){
            throw new Error("MONGO_URI is not defined");
        };

        await mongoose.connect(process.env.MONGO_URI);

        const categories = await Category.find();
        const writers = await Writer.find();

        if(categories.length === 0 || writers.length === 0) {
            throw new Error (
                "Seed categories and writers first."
            );
        }

        const blogs = faker.helpers.multiple(() => createRandomBlog(categories, writers), {
            count: 194,
        });


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