
import express from "express";

import {
  createContact,
  getContact,
  getContactById,
  getContactStats,
  updateContact,
  deleteContact,
} from "../controllers/contactController";

import protect from "../middlewares/protect";
import { requireRole } from "../middlewares/requireRole";

const router = express.Router();

// PUBLIC ROUTE
router.post("/", createContact);

// ADMIN ROUTES
router.get(
  "/admin",
  protect,
  requireRole("super-admin", "admin"),
  getContact
);

router.get(
  "/admin/stats",
  protect,
  requireRole("super-admin", "admin"),
  getContactStats
);

router.get(
  "/admin/:id",
  protect,
  requireRole("super-admin", "admin"),
  getContactById
);

router.patch(
  "/admin/:id/status",
  protect,
  requireRole("super-admin", "admin"),
  updateContact
);

router.delete(
  "/admin/:id",
  protect,
  requireRole("super-admin", "admin"),
  deleteContact
);

export default router;
