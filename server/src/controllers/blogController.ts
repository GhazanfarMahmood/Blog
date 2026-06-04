import { Request, Response } from "express";
import Blog from "../models/Blog";
import Category from "../models/Category";
import Writer from "../models/Writer";
import mongoose from "mongoose";

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
        const blogs = await Blog.find()
        .populate("category")
        .populate("author")
        .sort({ createdAt : -1});

        res.status(200).json(blogs)
    } catch(error) {
        res.status(500).json({ message : "Server error" })
    }
}

export const getBlogsBySlug = async (req: Request, res: Response) => {
    try {
        const { slug } = req.params;
        
        const blog = await Blog.findOne({ slug }).populate("category").populate("author");

        if(!blog) {
            return res.status(404).json({ message : "Blog not found" });
        }

        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ message : "Server error" });
    }
};

export const getBlogsByCategory = async (req: Request, res: Response) => {
    try {
        const { slug } = req.params;

        const category = await Category.findOne({ slug });

        if(!category) {
            return res.status(404).json({ message : "Category not found"});
        } 
        
        const blogs = await Blog.find({ category : category._id }).populate("category").populate("author").sort({ createdAt : -1});

        res.status(200).json(blogs);
    }catch (error) {
        res.status(500).json({ message : "Server error"});
    }
};

export const getBlogsByWriter = async (req: Request, res: Response) => {
    try {
        const { slug } = req.params;

        const writer = await Writer.findOne({ slug });

        if(!writer) {
            return res.status(404).json({message : "Writer not found"});
        }

        const blogs = await Blog.find({ author : writer._id })
        .populate("category")
        .populate("author")
        .sort({ createdAt: -1 });

        res.status(200).json(blogs);


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