
import { faker } from "@faker-js/faker";

import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import Blog from "../models/Blog";
import Category from "../models/Category";
import User from "../models/User";

function createRandomBlog(
  categories: any[],
  writers: any[],
  usedTitles: Set<string>,
  usedSlugs: Set<string>
) {
  const originalTitle = faker.book.title().trim();
  const baseSlug = faker.helpers.slugify(originalTitle).toLowerCase();

  let title = originalTitle;
  let normalizedTitle = title.toLowerCase();
  let slug = baseSlug;

  // Ensure both title and slug are unique.
  while (
    !title ||
    !slug ||
    usedTitles.has(normalizedTitle) ||
    usedSlugs.has(slug)
  ) {
    const suffix = faker.string.alphanumeric(6).toLowerCase();

    title = `${originalTitle} ${suffix}`;
    normalizedTitle = title.toLowerCase();
    slug = `${baseSlug}-${suffix}`;
  }

  // Reserve this title and slug for the current seed execution.
  usedTitles.add(normalizedTitle);
  usedSlugs.add(slug);

  return {
    title,
    slug,

    excerpt: faker.lorem.sentences(2),

    content: Array.from({ length: 5 }, () =>
      faker.lorem.sentences(
        faker.number.int({
          min: 15,
          max: 30,
        })
      )
    ).join("\n\n"),

    thumbnail: faker.image.url({
      width: 800,
      height: 800,
    }),

    category: faker.helpers
      .arrayElements(
        categories,
        faker.number.int({ min: 1, max: 2 })
      )
      .map((cat) => cat._id),

    tags: faker.helpers.arrayElements(
      ["React", "Node", "Express", "MongoDB", "TypeScript"],
      2
    ),

    author: faker.helpers.arrayElement(writers)._id,

    isPublished: faker.datatype.boolean(),
    isFeatured: faker.datatype.boolean(),

    reading: faker.number.int({
      min: 1,
      max: 8,
    }),
  };
}

async function seedBlogs() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined");
    }

    await mongoose.connect(process.env.MONGO_URI);

    const categories = await Category.find();

    const writers = await User.find({
      isWriter: true,
    });

    if (categories.length === 0 || writers.length === 0) {
      throw new Error("Seed categories and writers first.");
    }

    // Track generated titles and slugs during this seed execution.
    const usedTitles = new Set<string>();
    const usedSlugs = new Set<string>();

    const blogs = faker.helpers.multiple(
      () =>
        createRandomBlog(
          categories,
          writers,
          usedTitles,
          usedSlugs
        ),
      {
        count: 194,
      }
    );

    // Remove existing fake blog data.
    await Blog.deleteMany({});

    // Insert newly generated blogs.
    await Blog.insertMany(blogs);

    console.log("Blogs seeded successfully");
    console.log(`Total blogs inserted: ${blogs.length}`);
    console.log(`Unique titles: ${usedTitles.size}`);
    console.log(`Unique slugs: ${usedSlugs.size}`);

  } catch (error) {
    console.error("Blog seeding failed:", error);
    process.exitCode = 1;

  } finally {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
  }
}

seedBlogs();
