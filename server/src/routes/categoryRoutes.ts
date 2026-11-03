import express from "express";

import {
  createCategory,
  deleteCategory,
  getCategory,
  getCategoryBySlug,
  updateCategory,
} from "../controllers/categoryController";

import uploadCategoryImage from "../middlewares/uploadCategoryImage";

const router = express.Router();

router.get("/", getCategory);
router.get("/:slug", getCategoryBySlug);

router.post(
  "/",
  uploadCategoryImage.single("image"),
  createCategory
);

router.patch(
  "/:id",
  uploadCategoryImage.single("image"),
  updateCategory
);

router.delete("/:id", deleteCategory);

export default router;