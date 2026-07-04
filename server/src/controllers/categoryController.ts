import {Request, Response} from "express";
import Category from "../models/Category";
import mongoose from "mongoose";

export const createCategory = async (req: Request, res: Response) =>{
    try {
        const {categoryName, slug, image, icon, description} = req.body;

        if(!categoryName || !slug || !image || !description) {
            return res.status(400).json({message : "All fields are required"});
        }

        const existingCategory = await Category.findOne({
            $or : [{categoryName}, {slug}],
        });

        if(existingCategory){
            return res.status(409).json({message : "Category already exists"});
        }

        const finalSlug = slug?.toLowerCase().trim() || categoryName.toLowerCase().replace(/\s+/g, "-")

        const newCategory = await Category.create({
            categoryName,
            slug  : finalSlug,
            image, 
            icon,
            description
        });

        res.status(201).json({
            message : "Category created successfully",
            data : newCategory
        });

    } catch (error) {
        res.status(500).json({ message : "Server error" });
    }
} 

export const getCategory = async (req: Request, res: Response) => {
    try {
        const categories = await Category.find().sort({ createdAt : -1 });

        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message : "Server error" })
    }
}

export const getCategoryBySlug = async (req: Request, res: Response) => {
    try {
        const {slug} = req.params

        const category = await Category.findOne({slug});
        
        if(!category) {
            return res.status(404).json({message : "Category not found"});
        }

        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message : "Server error" });
    }
}

export const updateCategory = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({message : "Invalid Category ID"})
        }

        const updatedCategory = await Category.findByIdAndUpdate(
            id,
            req.body, 
            { new : true }
        );

        if(!updatedCategory) {
            return res.status(404).json({message : "Category is not found"});
        }

        res.status(200).json({
            message : "Category updated successfully",
            data : updatedCategory 
        });
    } catch (error) {
        res.status(500).json({ message : "Server error" });
    }
}

export const deleteCategory = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;

        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message : "Invalid category id" })
        }

        const deletedCategory = await Category.findByIdAndDelete(id);

        if(!deletedCategory) {
            return res.status(404).json({message : "Category is not found"});
        };

        res.status(200).json({message : "Category deleted successfully."})

    } catch (error) {
        res.status(500).json({ message : "Server error" })
    }
}