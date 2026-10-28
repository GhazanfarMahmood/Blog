
import { Request, Response } from "express";
import About from "../models/About";
import mongoose from "mongoose";

type MoreContentItem = {
  icon: string;
  title: string;
  excerpt: string;
};

const validateAboutData = (body: any) => {
  const { title, images, description, moreContent } = body ?? {};

  if (
    typeof title !== "string" ||
    !title.trim() ||
    typeof description !== "string" ||
    !description.trim()
  ) {
    return null;
  }

  if (
    !Array.isArray(images) ||
    images.length === 0 ||
    !images.every(
      (image) =>
        typeof image === "string" && image.trim().length > 0
    )
  ) {
    return null;
  }

  if (
    !Array.isArray(moreContent) ||
    moreContent.length === 0 ||
    !moreContent.every(
      (item: unknown) => {
        if (!item || typeof item !== "object") return false;

        const content = item as Record<string, unknown>;

        return (
          typeof content.icon === "string" &&
          content.icon.trim().length > 0 &&
          typeof content.title === "string" &&
          content.title.trim().length > 0 &&
          typeof content.excerpt === "string" &&
          content.excerpt.trim().length > 0
        );
      }
    )
  ) {
    return null;
  }

  return {
    title: title.trim(),
    images: images.map((image: string) => image.trim()),
    description: description.trim(),
    moreContent: moreContent.map((item: MoreContentItem) => ({
      icon: item.icon.trim(),
      title: item.title.trim(),
      excerpt: item.excerpt.trim(),
    })),
  };
};

// CREATE ABOUT - ADMIN
export const createAbout = async (
  req: Request,
  res: Response
) => {
  try {
    const exists = await About.exists({});

    if (exists) {
      return res.status(409).json({
        message: "About content already exists. Please update it.",
      });
    }

    const data = validateAboutData(req.body);

    if (!data) {
      return res.status(400).json({
        message: "Please provide valid About Us content.",
      });
    }

    const about = await About.create(data);

    return res.status(201).json({
      message: "About content created successfully",
      data: about,
    });
  } catch (error) {
    console.error("CREATE ABOUT ERROR:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};

// GET ABOUT - PUBLIC
export const getAbout = async (
  req: Request,
  res: Response
) => {
  try {
    const about = await About.findOne();

    if (!about) {
      return res.status(404).json({
        message: "About content not found",
      });
    }

    return res.status(200).json(about);
  } catch (error) {
    console.error("GET ABOUT ERROR:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};

// UPDATE ABOUT - ADMIN
export const updateAbout = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    if (
      typeof id !== "string" ||
      !mongoose.isObjectIdOrHexString(id)
    ) {
      return res.status(400).json({
        message: "Invalid About ID",
      });
    }

    const data = validateAboutData(req.body);

    if (!data) {
      return res.status(400).json({
        message: "Please provide valid About Us content.",
      });
    }

    const updatedAbout = await About.findByIdAndUpdate(
      id,
      { $set: data },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedAbout) {
      return res.status(404).json({
        message: "About content not found",
      });
    }

    return res.status(200).json({
      message: "About content updated successfully",
      data: updatedAbout,
    });
  } catch (error) {
    console.error("UPDATE ABOUT ERROR:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};

// DELETE ABOUT - ADMIN
export const deleteAbout = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    if (
      typeof id !== "string" ||
      !mongoose.isObjectIdOrHexString(id)
    ) {
      return res.status(400).json({
        message: "Invalid About ID",
      });
    }

    const deletedAbout = await About.findByIdAndDelete(id);

    if (!deletedAbout) {
      return res.status(404).json({
        message: "About content not found",
      });
    }

    return res.status(200).json({
      message: "About content deleted successfully",
    });
  } catch (error) {
    console.error("DELETE ABOUT ERROR:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};
