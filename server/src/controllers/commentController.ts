import {Request, Response} from "express";
import Comment from "../models/Comment";

export const createComment = async (req: Request, res: Response) => {
    try {
        const {name, email, message} = req.body;

        if(!name || !email || !message) {
            return res.status(400).json({ message : "All fields are required"});
        }

        const newComment = await Comment.create({
            name,
            email,
            message
        });

        res.status(201).json({
            message : "Comment submitted successfully",
            data: newComment,
        });
    }
    catch (error) {
        res.status(500).json({ message : "Server error"});
    } 
};

export const getApprovedComments = async (req: Request, res: Response) => {
    try {
        const comments = await Comment.find({ isApproved: true }).sort({
            createdAt : -1,
        });

        res.status(200).json(comments);
    }
    catch (err) {
        res.status(500).json({ message: "Server error"});
    }
};