import { faker } from "@faker-js/faker";

import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import Category from "../models/Category";

const categoryList = [
    "Technology",
    "Travel",
    "Sport",
    "Business",
    "Management",
    "Trends",
    "Startups",
    "News"
];

function createRandomCategory(categoryName : string) {
    return {
        categoryName,
        slug : faker.helpers.slugify(categoryName).toLowerCase(),
        image : faker.image.url({
            width: 400,
            height : 368
        }),
        icon : faker.internet.emoji(),
        description : faker.lorem.sentences(3),
        isPublished : true,
    }
};

const categories = categoryList.map((categoryName) => 
    createRandomCategory(categoryName)
);

async function seedCategories() {
    try {
        if(!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is not defined");
        }

        await mongoose.connect(process.env.MONGO_URI);

        await Category.deleteMany();

        await Category.insertMany(categories);

        console.log("✅ Category seeded successfully");
        process.exit();
    } catch(error) {
        console.log("❌ Seed Error:", error);
        process.exit(1);
    }
};

seedCategories();