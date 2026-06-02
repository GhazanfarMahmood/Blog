import express from "express";
import { createWriter, getWriter, getWriterBySlug, updateWriter, deleteWriter } from "../controllers/writerController";
const router = express.Router();

router.get("/", getWriter);

router.get("/slug/:slug", getWriterBySlug);

router.post("/", createWriter);

router.patch("/:id", updateWriter);

router.delete("/:id", deleteWriter);

export default router;