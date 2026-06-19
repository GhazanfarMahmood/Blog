import {Request, Response} from "express";
import About from "../models/About";
import mongoose from "mongoose";

export const createAbout = async (req: Request, res: Response) => {
    try {
        const {title, images, description, moreContent } = req.body;

        if(
            !title?.trim() || 
            !images?.length || 
            !description?.trim() || 
            !moreContent?.length
        ) {
            return res.status(400).json({message: "All fields are required"});
        };

        const about = await About.create({
            title : title.trim(), 
            images,
            description : description.trim(), 
            moreContent
        });

        res.status(201).json({
            message : "About Content created successfully",
            data : about
        });

    } catch (error) {
        res.status(500).json({message : "Server error"});
    }
}

export const getAbout = async (req: Request, res: Response) => {
    try {
        const about = await About.findOne();

        if(!about) {
            return res.status(404).json({message : "About content not found"})
        }

        res.status(200).json(about);
    } catch (error) {
        res.status(500).json({message : "Server error"});
    }
}

export const updateAbout = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;

        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message : "id is not valid"});
        };

        const updatedAbout = await About.findByIdAndUpdate(
            id,
            req.body,
            {new : true}
        );

        if(!updatedAbout) {
            return res.status(404).json({message : "About content not found"});
        };

        res.status(200).json({
            message : "About content updated successfully",
            data : updatedAbout
        });

    } catch (error) {
        res.status(500).json({message : 'Server error'});
    }
}

export const deleteAbout = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;

        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message : "id is not valid" });
        };

        const deletedAbout = await About.findByIdAndDelete(id);

        if(!deletedAbout) {
            return res.status(404).json({ message : "About content is not found" });
        }

        res.status(200).json({message : "About content deleted successfully"})

    } catch (error) {
        res.status(500).json({message : "Server error"});
    }
}