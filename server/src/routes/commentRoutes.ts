import express from "express";
import { createComment, getApprovedComments } from "../controllers/commentController";

const router = express.Router();

router.post("/", createComment);

router.get("/", getApprovedComments);

export default router;