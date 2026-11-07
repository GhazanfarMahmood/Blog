
import express from "express";

import {
  createHome,
  getHome,
  updateHome,
  deleteHome,
} from "../controllers/homeController";

import protect from "../middlewares/protect";
import { requireRole } from "../middlewares/requireRole";

const router = express.Router();

// PUBLIC ROUTE
router.get("/", getHome);

// ADMIN ROUTES
router.post(
  "/",
  protect,
  requireRole("super-admin", "admin"),
  createHome
);

router.put(
  "/:id",
  protect,
  requireRole("super-admin", "admin"),
  updateHome
);

router.delete(
  "/:id",
  protect,
  requireRole("super-admin"),
  deleteHome
);

export default router;
