import express from "express";
const router = express.Router();

router.get("/", () => {});

router.get("/:slug", () => {});

router.get("/category/:slug", () => {});

router.post("/", () => {});

router.patch("/:id", () => {});

router.delete("/:id", () => {});

export default router;