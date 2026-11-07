
import { Request, Response } from "express";
import mongoose from "mongoose";
import Home from "../models/Home";

// VALIDATE HOME CONTENT
const validateHomeData = (body: unknown) => {
  if (!body || typeof body !== "object") {
    return null;
  }

  const data = body as Record<string, unknown>;

  const { title, highlightText, description } = data;

  if (
    typeof title !== "string" ||
    !title.trim() ||
    typeof highlightText !== "string" ||
    !highlightText.trim() ||
    typeof description !== "string" ||
    !description.trim()
  ) {
    return null;
  }

  const normalizedTitle = title.trim();
  const normalizedHighlight = highlightText.trim();
  const normalizedDescription = description.trim();

  if (
    !normalizedTitle
      .toLowerCase()
      .includes(normalizedHighlight.toLowerCase())
  ) {
    return null;
  }

  return {
    title: normalizedTitle,
    highlightText: normalizedHighlight,
    description: normalizedDescription,
  };
};

// CREATE HOME CONTENT - ADMIN
export const createHome = async (
  req: Request,
  res: Response
) => {
  try {
    const exists = await Home.exists({});

    if (exists) {
      return res.status(409).json({
        message:
          "Home content already exists. Please update it.",
      });
    }

    const data = validateHomeData(req.body);

    if (!data) {
      return res.status(400).json({
        message:
          "Valid title, highlighted text, and description are required. Highlighted text must appear in the title.",
      });
    }

    const home = await Home.create(data);

    return res.status(201).json({
      message: "Home content created successfully",
      data: home,
    });
  } catch (error) {
    console.error("CREATE HOME ERROR:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};

// GET HOME CONTENT - PUBLIC
export const getHome = async (
  req: Request,
  res: Response
) => {
  try {
    const home = await Home.findOne();

    if (!home) {
      return res.status(404).json({
        message: "Home content not found",
      });
    }

    return res.status(200).json(home);
  } catch (error) {
    console.error("GET HOME ERROR:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};

// UPDATE HOME CONTENT - ADMIN
export const updateHome = async (
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
        message: "Invalid Home ID",
      });
    }

    const data = validateHomeData(req.body);

    if (!data) {
      return res.status(400).json({
        message:
          "Valid title, highlighted text, and description are required. Highlighted text must appear in the title.",
      });
    }

    const updatedHome = await Home.findByIdAndUpdate(
      id,
      { $set: data },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedHome) {
      return res.status(404).json({
        message: "Home content not found",
      });
    }

    return res.status(200).json({
      message: "Home content updated successfully",
      data: updatedHome,
    });
  } catch (error) {
    console.error("UPDATE HOME ERROR:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};

// DELETE HOME CONTENT - SUPER ADMIN
export const deleteHome = async (
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
        message: "Invalid Home ID",
      });
    }

    const deletedHome = await Home.findByIdAndDelete(id);

    if (!deletedHome) {
      return res.status(404).json({
        message: "Home content not found",
      });
    }

    return res.status(200).json({
      message: "Home content deleted successfully",
    });
  } catch (error) {
    console.error("DELETE HOME ERROR:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};
