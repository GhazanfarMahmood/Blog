import express from "express";
import { createBlog, deleteBlog, getBlogs, getBlogsByCategory, getBlogsBySearch, getBlogsBySlug, getBlogsByWriter, updateBlog, getSidebarData } from "../controllers/blogController";
const router = express.Router();

router.get("/", getBlogs);

router.get("/sidebar-data", getSidebarData)

router.get("/search", getBlogsBySearch);

router.get("/category/:slug", getBlogsByCategory);

router.get("/:slug", getBlogsBySlug);

router.get("/writer/:slug", getBlogsByWriter);

router.post("/", createBlog);

router.patch("/:id", updateBlog);

router.delete("/:id", deleteBlog);

export default router;