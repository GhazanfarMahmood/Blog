import { Request, Response } from "express";
import Writer from "../models/Writer";
import mongoose from "mongoose";

export const createWriter = async (req : Request, res: Response) => {
    try {
        const {name, designation, slug, excerpt, location, fbLink, twitterLink, instagramLink, LinkedinLink, isFeatured
            
        } = req.body;

        if(!name || !location) {
            return res.status(400).json({ message : "Name and location are required" });
        }

        const finalSlug = slug?.toLowerCase().trim() || name.toLowerCase().replace(/\s+/g, "-");

        const existingWriter = await Writer.findOne({slug : finalSlug});

        if(existingWriter) {
            return res.status(409).json({
                message : "Writer already exists"
            });
        }

        const newWriter = await Writer.create({
            name, 
            designation : designation || "Writer",
            slug: finalSlug, 
            excerpt: excerpt || "", 
            location, 
            fbLink: fbLink || "", 
            twitterLink: twitterLink || "", 
            instagramLink: instagramLink || "", 
            LinkedinLink : LinkedinLink || "",
            isFeatured,
        });

        res.status(201).json({
            message : "Writer created successfully",
            data : newWriter
        });

    } catch (error) {
        res.status(500).json({message : "Server Error"});
    }
};

export const getWriter = async (req: Request, res: Response) => {
    try {
        const writers = await Writer.find().sort({ createdAt : -1 });

        res.status(200).json(writers);
    } catch (error) {
        res.status(500).json({message : "Server Error"});
    }
}

export const getWriterBySlug = async (req: Request, res: Response) => {
    try {
        const {slug} = req.params;

        const writer = await Writer.findOne({ slug });

        if(!writer) {
            return res.status(404).json({message : "Writer is not found"});
        }

        res.status(200).json(writer);
    } catch (error) {
        res.status(500).json({message : "Server Error"});
    }
};

export const updateWriter = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;

        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({message : "Invalid writer ID"});
        }

        const updatedWriter = await Writer.findByIdAndUpdate(
            id, 
            req.body,
            { new : true }
        )

        if(!updatedWriter) {
            return res.status(404).json({ message : "Writer is not found" })
        };

        res.status(200).json({
            message : "Writer updated successfully",
            data : updatedWriter
        });
    } catch (error) {
        res.status(500).json({message : "Server Error"});
    }
}

export const deleteWriter = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;

        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({message : "Invalid writer ID"});
        }

        const deletedWriter = await Writer.findByIdAndDelete(id);

        if(!deletedWriter) {
            return res.status(404).json({message : "Writer is not found"});
        }

        res.status(200).json({
            message : "Writer deleted successfully",
            data: deletedWriter
        });
    } catch (error) {
        res.status(500).json({message : "Server Error"});
    }
}