
import express from "express";

import {
  createAbout,
  getAbout,
  updateAbout,
  deleteAbout,
} from "../controllers/aboutController";

import protect from "../middlewares/protect";
import { requireRole } from "../middlewares/requireRole";

const router = express.Router();

// PUBLIC ROUTE
router.get("/", getAbout);

// ADMIN ROUTES
router.post(
  "/",
  protect,
  requireRole("super-admin", "admin"),
  createAbout
);

router.put(
  "/:id",
  protect,
  requireRole("super-admin", "admin"),
  updateAbout
);

router.delete(
  "/:id",
  protect,
  requireRole("super-admin"),
  deleteAbout
);

export default router;
