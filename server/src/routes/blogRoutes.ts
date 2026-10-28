import express from "express";
import { 
    createBlog, 
    deleteBlog, 
    getBlogs, 
    getBlogsByCategory, 
    getBlogsBySearch, 
    getBlogsBySlug, 
    getBlogsByWriter, 
    getWriterBySlug,
    updateBlog, 
    getSidebarData, 
    getBlogsById,  
    getWriters 
} from "../controllers/blogController";

const router = express.Router();

router.get("/", getBlogs);

router.get("/id/:id", getBlogsById);

router.get("/sidebar-data", getSidebarData);

router.get("/search", getBlogsBySearch);

router.get("/writer", getWriters);

router.get("/writer/:slug", getWriterBySlug);

router.get("/category/:slug", getBlogsByCategory);

router.get("/writer/:slug/blogs", getBlogsByWriter);

router.get("/:slug", getBlogsBySlug);

router.post("/", createBlog);

router.patch("/:id", updateBlog);

router.delete("/:id", deleteBlog);

export default router;