import mongoose from "mongoose";
import {Request, Response} from "express";
import Comment from "../models/Comment";
import Blog from "../models/Blog";

// CREATE COMMENTS
export const createComment = async (req: Request, res: Response) => {
    try {
        const { blogId, name, email, message } = req.body;

        if(!blogId || !name || !email || !message) {
            return res.status(400).json({ message : "All fields are required"});
        }

        if(
            typeof blogId !== "string" ||
            !mongoose.isObjectIdOrHexString(blogId)
        ) {
            return res.status(400).json({
                message : "Invalid blog ID",
            });
        }

        if(
            typeof name !== "string" ||
            typeof email !== "string" ||
            typeof message !== "string"
        ) {
            return res.status(400).json({
                message : "Invalid comment fields.",
            });
        }

        const normalizedName = name.trim();
        const normalizedEmail = email.trim().toLowerCase();
        const normalizedMessage = message.trim();

        if(
            !normalizedName ||
            !normalizedEmail ||
            !normalizedMessage ||
            normalizedName.length > 100 ||
            normalizedMessage.length > 2000 ||
            normalizedEmail.length > 254 ||
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)
        ) {
            return res.status(400).json({
                message : "Please provide valid comment details.",
            });
        }

        const blog = await Blog.findOne({
            _id : blogId,
            isPublished: true,
        });

        if (!blog) {
            return res.status(404).json({
                message : "Blog not found",
            });
        }

        await Comment.create({
            blog : blog._id,
            name : normalizedName,
            email : normalizedEmail,
            message : normalizedMessage,
            isApproved: false,
        });


        res.status(201).json({
            message : "Comment submitted successfully. Awaiting admin approval.",
        });
    }
    catch (error) {
        console.error("CREATE COMMENT ERROR:", error);
        res.status(500).json({ message : "Server error"});
    } 
};

// GET APPROVED COMMENTS BY BLOG
export const getApprovedComments = async (req: Request, res: Response) => {
    try {
        const { blogId } = req.params;

        if(
            typeof blogId !== "string" ||
             !mongoose.isObjectIdOrHexString(blogId)
        ) {
            return res.status(400).json({
                message : "Invalid blog ID",
            });
        }

        const blog = await Blog.findOne({
            _id : blogId,
            isPublished : true
        });

        if(!blog) {
            return res.status(404).json({
                message : "Blog not found",
            });
        }

        const comments = await Comment.find({
            blog : blogId,
            isApproved : true,
        })
            .select("name message createdAt")
            .sort({ createdAt : -1});

        res.status(200).json(comments);
    }
    catch (error) {
        console.error("GET APPROVED COMMENTS ERROR:", error);
        res.status(500).json({ message: "Server error"});
    }
};

// GET ALL COMMENTS - ADMIN PANEL
export const getAllComments = async (req: Request, res: Response) => {
    try {
        const comments = await Comment.find()
        .populate("blog", "title slug")
        .sort({ createdAt : -1 });
        
        return res.status(200).json(comments);
    } catch (error) {
        console.error("GET ALL COMMENTS ERROR:", error);

        return res.status(500).json({
            message : "Server error",
        });
    }
};

// APPROVE COMMENT
export const approveComment = async(req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if(
            typeof id !== "string" ||
            !mongoose.isObjectIdOrHexString(id)
        ) {
            return res.status(400).json({
                message : "Invalid comment ID",
            });
        }

        const comment = await Comment.findByIdAndUpdate(
            id,
            { isApproved: true},
            { new : true}
        );

        if(!comment) {
            return res.status(404).json({
                message : "Comment not found",
            });
        }

        return res.status(200).json({
            message : "Comment approved successfully",
            data : comment,
        });
    } catch (error) {
        console.error("APPROVE COMMENT ERROR:", error);

        return res.status(500).json({
            message : "Server error",
        });
    }
};

// UNAPPROVE COMMENT
export const unapproveComment = async (
    req: Request,
    res: Response
) => {
    try {
        const { id } = req.params;

        if(
            typeof id !== "string" ||
            !mongoose.isObjectIdOrHexString(id)
        ) {
            return res.status(400).json({
                message : "Invalid comment ID",
            });
        }

        const comment = await Comment.findByIdAndUpdate(
            id,
            { isApproved : false},
            { new : true }
        );

        if(!comment) {
            return res.status(404).json({
                message : "Comment not found",
            });
        }

        return res.status(200).json({
            message : "Comment unapproved successfully",
            data : comment,
        });
    } catch (error) {
        console.error("UNAPPROVE COMMENT ERROR:", error);

        return res.status(500).json({
            message : "Server error",
        });
    }
};

// DELETE COMMENT
export const deleteComment = async (
    req: Request,
    res: Response
) => {
    try {
        const { id } = req.params;

        if(
            typeof id !== "string" ||
            !mongoose.isObjectIdOrHexString(id)
        ) {
            return res.status(400).json({
                message : "Invalid comment ID",
            });
        }

        const comment = await Comment.findByIdAndDelete(id);

        if(!comment) {
            return res.status(404).json({
                message : "Comment not found",
            });
        }

        return res.status(200).json({
            message : "Comment deleted successfully",
        })

    } catch (error) {
        console.error('DELETE COMMENT ERROR:', error);

        return res.status(500).json({
            message : "Server error",
        })
    }
}