import express from "express";
import upload from "../middlewares/upload";

const router = express.Router();

router.post(
    "/upload",
    upload.single("image"),
    (req, res) => {
        res.status(200).json({
            imageUrl : req.file?.path,
        });
    }
);

export default router;