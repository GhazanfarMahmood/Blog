import {Request, Response} from "express";
import Category from "../models/Category";
import mongoose from "mongoose";

const generateSlug = (value : string) => {
    return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const parseBoolean = (value: unknown) => {
  return value === true || value === "true";
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { categoryName, slug, icon, description, isPublished } = req.body;

    const image = req.file?.path;

    if (!categoryName?.trim() || !image || !description?.trim()) {
      return res.status(400).json({
        message: "Category name, image and description are required",
      });
    }

    const finalSlug = generateSlug(slug || categoryName);

    if (!finalSlug) {
      return res.status(400).json({
        message: "A valid category slug is required",
      });
    }

    const existingCategory = await Category.findOne({
      $or: [
        { categoryName: categoryName.trim() },
        { slug: finalSlug },
      ],
    });

    if (existingCategory) {
      return res.status(409).json({
        message: "Category name or slug already exists",
      });
    }

    const newCategory = await Category.create({
      categoryName: categoryName.trim(),
      slug: finalSlug,
      image,
      icon: icon?.trim(),
      description: description.trim(),
      isPublished: isPublished === undefined
        ? true
        : parseBoolean(isPublished),
    });

    return res.status(201).json({
      message: "Category created successfully",
      data: newCategory,
    });
  } catch (error) {
    console.error("Create category error:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};

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

export const updateCategory = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid category ID",
      });
    }

    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    const {
      categoryName,
      slug,
      icon,
      description,
      isPublished,
    } = req.body;

    const updatedName = categoryName?.trim() || category.categoryName;
    const updatedSlug = generateSlug(slug || updatedName);

    if (!updatedSlug) {
      return res.status(400).json({
        message: "A valid category slug is required",
      });
    }

    const existingCategory = await Category.findOne({
      _id: { $ne: id },
      $or: [
        { categoryName: updatedName },
        { slug: updatedSlug },
      ],
    });

    if (existingCategory) {
      return res.status(409).json({
        message: "Category name or slug already exists",
      });
    }

    category.categoryName = updatedName;
    category.slug = updatedSlug;
    category.image = req.file?.path || category.image;
    category.icon = icon !== undefined ? icon.trim() : category.icon;
    category.description =
      description !== undefined
        ? description.trim()
        : category.description;

    if (isPublished !== undefined) {
      category.isPublished = parseBoolean(isPublished);
    }

    await category.save();

    return res.status(200).json({
      message: "Category updated successfully",
      data: category,
    });
  } catch (error) {
    console.error("Update category error:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};

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