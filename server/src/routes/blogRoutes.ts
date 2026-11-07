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
import protect from "../middlewares/protect";
import uploadBlogThumbnail from "../middlewares/uploadBlogThumbnail";

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

router.post(
    "/", 
    protect,
    uploadBlogThumbnail.single("thumbnail"),
    createBlog
);

router.patch(
    "/:id", 
    protect,
    uploadBlogThumbnail.single("thumbnail"),
    updateBlog
);

router.delete("/:id", protect, deleteBlog);

export default router;