import express from "express";
import { createCategory, deleteCategory, getCategory, getCategoryBySlug, updateCategory } from "../controllers/categoryController";

const router = express.Router();

router.get("/", getCategory);

router.get("/:slug", getCategoryBySlug);

router.post("/", createCategory);

router.patch("/:id", updateCategory);

router.delete("/:id", deleteCategory);

export default router;