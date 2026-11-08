
import dotenv from "dotenv";
import mongoose from "mongoose";

import Category from "../models/Category";

dotenv.config();

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

function createRandomCategory(
    faker: any,
    categoryName: string
) {
    return {
        categoryName,
        slug: faker.helpers.slugify(categoryName).toLowerCase(),

        image: faker.image.url({
            width: 400,
            height: 368
        }),

        icon: faker.internet.emoji(),
        description: faker.lorem.sentences(3),
        isPublished: true,
    };
}

async function seedCategories() {
    try {
        // Dynamically import Faker (ESM compatibility).
        const { faker } = await import("@faker-js/faker");

        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is not defined");
        }

        await mongoose.connect(process.env.MONGO_URI);

        const categories = categoryList.map((categoryName) =>
            createRandomCategory(faker, categoryName)
        );

        await Category.deleteMany();

        await Category.insertMany(categories);

        console.log("✅ Category seeded successfully");
        console.log(`Total categories inserted: ${categories.length}`);

    } catch (error) {
        console.error("❌ Seed Error:", error);
        process.exitCode = 1;

    } finally {
        if (mongoose.connection.readyState !== 0) {
            await mongoose.disconnect();
        }
    }
}

seedCategories();
