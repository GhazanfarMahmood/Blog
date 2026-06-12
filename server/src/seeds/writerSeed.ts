import { faker } from "@faker-js/faker";

import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import Writer from "../models/Writer";

const writerList = [
    "Fyodor Dostoevsky",
    "Dante Alighieri",
    "Lev Tolstoy",
    "Victor Hugo",
    "William Shakespeare",
    "Johann Wolfgang von Goethe",
]

function createRandomWriter(name : string) {
    return { 
        name,
        writerImg : faker.image.url({
            width : 130,
            height: 130
        }),
        slug : faker.helpers.slugify(name).toLowerCase(),
        designation : faker.helpers.arrayElement([
            "Reflective Blogger",
            "Tech Writer",
            "Travel Journalist",
            "Business Analyist",
            "Digital Creator",
            "Content Strategist",
        ]),
        fbLink : `https://facebook.com/${faker.internet.username()}`,
        twitterLink : `https://twitter.com/${faker.internet.username()}`,
        instagramLink : `https://instagram.com/${faker.internet.username()}`,
        LinkedinLink : `https://linkedin.com/in/${faker.internet.username()}`,
        excerpt : faker.lorem.sentences(3),
        location : `${faker.location.city()}, ${faker.location.country()}`,
        isFeatured : faker.datatype.boolean(),
    }
}

const writers = writerList.map((writerName) => createRandomWriter(writerName));

async function seedWriter() {
    try {
        if(!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is not defined");
        };

        await mongoose.connect(process.env.MONGO_URI);

        await Writer.deleteMany();
        await Writer.insertMany(writers);

        console.log("✅ Category seeded successfully");
        process.exit();
    } catch (error) {
        console.log("❌ Seed Error:", error)
        process.exit(1)
    }
}

seedWriter();