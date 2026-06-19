import express from "express"
import { createAbout, deleteAbout, getAbout, updateAbout } from "../controllers/aboutController";

const router = express.Router();

router.get("/", getAbout);

router.post("/", createAbout);

router.put("/:id", updateAbout);

router.delete("/:id", deleteAbout);

export default router;