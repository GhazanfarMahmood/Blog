import { Request, Response } from "express";
import Blog from "../models/Blog";
import Category from "../models/Category";
import Writer from "../models/Writer";
import mongoose from "mongoose";
import { getPagination } from "../utils/pagination";

export const createBlog = async (req: Request, res: Response) => {
    try {
        const {title, slug, content, thumbnail, category, tags, author} = req.body;

        if(!title || !slug || !content || !thumbnail || !category || !tags || !author) {
            return res.status(400).json({ message : "All fields are required" });
        }

        const newBlog = await Blog.create({
            title, 
            slug, 
            content, 
            thumbnail,
            category,
            tags, 
            author
        });

        res.status(201).json({
            message : "Blog created successfully",
            data : newBlog
        });

    } catch(error) {
        res.status(500).json({ message : "Server error" });
    }
};

export const getBlogs = async (req: Request, res: Response) => {
    try {
        const {page, limit, skip} = getPagination(req.query.page, req.query.limit);  
        const blogs = await Blog.find()
        .sort({ createdAt : -1})
        .skip(skip)
        .limit(limit)
        .populate("category")
        .populate("author");

        const totalBlogs = await Blog.countDocuments();


        const totalPages = Math.ceil(totalBlogs / limit);

        res.status(200).json({
            blogs, 
            currentPage : page, 
            totalPages, 
            totalBlogs,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1,
        });
    } catch(error) {
        res.status(500).json({ message : "Server error" })
    }
};

export const getBlogsById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params as {id : string};

        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message : "Invalid blog ID",
            });
        }

        const blog = await Blog.findById(id).populate("category").populate("author");

        if(!blog) {
            return res.status(404).json({
                message : "Blog not found",
            });
        }

        return res.status(200).json({
            data : blog,
        });
    } catch (error) {
        console.error("GET BLOG BY ID ERROR:", error);

        return res.status(500).json({
            message : "Server error",
        });
    }
};

export const getSidebarData = async (req: Request, res: Response) => {
    try {
        const featuredWriters = await Writer.find({isFeatured: true});

        const featuredBlogs = await Blog.find({isFeatured: true})
        .limit(5)
        .populate("category")
        .populate("author")
        .sort({createdAT : -1});
        
        const latestBlogs = await Blog.find()
        .limit(3)
        .populate("category")
        .populate("author")
        .sort({createdAt : -1});

        res.status(200).json({
            featuredWriters,
            featuredBlogs,
            latestBlogs,
        });
    } catch (error) {
        res.status(500).json({message : "Server error"});
    }
};

export const getBlogsBySearch = async (req: Request, res: Response) => {
    try {
        const { page, limit, skip } = getPagination(req.query.page, req.query.limit);
        const { q } = req.query;

        if (!q || typeof q !== "string") {
            return res.status(400).json({
                message: "Search query is required"
            });
        }

        const searchQuery = {
            $or: [
                { title: { $regex: q, $options: "i" } },
                { excerpt: { $regex: q, $options: "i" } },
                { tags: { $in: [new RegExp(q, "i")] } }
            ]
        };

        const blogs = await Blog.find(searchQuery)
            .populate("category")
            .populate("author")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const totalBlogs = await Blog.countDocuments(searchQuery);

        const totalPages = Math.ceil(totalBlogs / limit);

        return res.status(200).json({
            blogs,
            currentPage: page,
            totalPages,
            totalBlogs,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1,
        });

    } catch (error) {
        return res.status(500).json({
            message: "Server Error"
        });
    }
};

export const getBlogsBySlug = async (
    req: Request,
    res: Response
) => {
    try {
        const { slug } = req.params;

        const blog = await Blog.findOne({ slug })
            .populate("category")
            .populate("author");

        if (!blog) {
            return res.status(404).json({
                message: "Blog not found",
            });
        }

        const previousBlog = await Blog.findOne({
            _id: { $lt: blog._id },
        })
            .select("title slug")
            .sort({ _id: -1 });

        const nextBlog = await Blog.findOne({
            _id: { $gt: blog._id },
        })
            .select("title slug")
            .sort({ _id: 1 });

        res.status(200).json({
            blog,
            previousBlog,
            nextBlog,
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error",
        });
    }
};

export const getBlogsByCategory = async (req: Request, res: Response) => {
    try {
        const {page, limit, skip} = getPagination(req.query.page, req.query.limit);  
        const { slug } = req.params;

        const category = await Category.findOne({ slug });

        if(!category) {
            return res.status(404).json({ message : "Category not found"});
        } 
        
        const blogs = await Blog.find({ category : category._id })
        .populate("category")
        .populate("author")
        .sort({ createdAt : -1})
        .skip(skip)
        .limit(limit);

        const totalBlogs = await Blog.countDocuments({
            category: category._id
        });
        const totalPages = Math.ceil(totalBlogs / limit);

        res.status(200).json({
            blogs,
            currentPage : page,
            totalPages,
            totalBlogs,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1,
        });
    }catch (error) {
        res.status(500).json({ message : "Server error"});
    }
};

export const getBlogsByWriter = async (req: Request, res: Response) => {
    try {
        const {page, limit, skip} = getPagination(req.query.page, req.query.limit);  
        const { slug } = req.params;

        const writer = await Writer.findOne({ slug });

        if(!writer) {
            return res.status(404).json({message : "Writer not found"});
        }

        const blogs = await Blog.find({ author : writer._id })
        .populate("category")
        .populate("author")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

         const totalBlogs = await Blog.countDocuments({
            author: writer._id
        });
        const totalPages = Math.ceil(totalBlogs / limit);

        res.status(200).json({
            blogs,
            currentPage : page,
            totalPages,
            totalBlogs,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1,
        });


    } catch (error) {
        res.status(500).json({ message : "Server Error" });
    }
}

export const updateBlog = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid blog ID"})
        }

        const updatedBlog = await Blog.findByIdAndUpdate(
            id, 
            req.body,
            { new : true}
        );

        if(!updatedBlog) {
            return res.status(404).json({ message : "Blog not found" });
        }

        res.status(200).json({
            message: "Blog updated successfully",
            data : updatedBlog,
        });
    }catch (error) {
        res.status(500).json({ message : "Server error"});
    }
}

export const deleteBlog = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        
        const deletedBlog = await Blog.findByIdAndDelete(id);

        if(!deletedBlog) {
            return res.status(404).json({ message : "Blog not found" });
        }

        res.status(200).json({
            message : "Blog deleted Successfully",
        })
    }catch (error) {
        res.status(500).json({ message : "Server error" });
    }
};