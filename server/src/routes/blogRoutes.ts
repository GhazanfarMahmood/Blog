import express from "express";
import { createBlog, deleteBlog, getBlogs, getBlogsByCategory, getBlogsBySlug, updateBlog } from "../controllers/blogController";
const router = express.Router();

router.get("/", getBlogs);

router.get("/category/:slug", getBlogsByCategory);

router.get("/:slug", getBlogsBySlug);

router.post("/", createBlog);

router.patch("/:id", updateBlog);

router.delete("/:id", deleteBlog);

export default router;