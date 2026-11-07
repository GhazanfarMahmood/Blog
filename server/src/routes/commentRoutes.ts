import express from "express";

import {
  createComment,
  getApprovedComments,
  getAllComments,
  approveComment,
  unapproveComment,
  deleteComment,
  getPendingCommentsCount,
} from "../controllers/commentController";

import protect from "../middlewares/protect";
import { requireRole } from "../middlewares/requireRole";

const router = express.Router();

// PUBLIC ROUTES

router.post("/", createComment);

router.get("/blog/:blogId", getApprovedComments);

// ADMIN ROUTES

router.get(
  "/admin",
  protect,
  requireRole("super-admin", "admin"),
  getAllComments
);

router.patch(
  "/:id/approve",
  protect,
  requireRole("super-admin", "admin"),
  approveComment
);

router.patch(
  "/:id/unapprove",
  protect,
  requireRole("super-admin", "admin"),
  unapproveComment
);

router.delete(
  "/:id",
  protect,
  requireRole("super-admin", "admin"),
  deleteComment
);

router.get(
  "/admin/pending-count",
  protect,
  requireRole("super-admin", "admin"),
  getPendingCommentsCount
);

export default router;
