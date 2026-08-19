import express from "express";
import {login, createUser, logout, forgotPassword, resetPassword, getMe, updateProfile} from "../controllers/authController";
import verifyToken from "../middlewares/verifyToken";
import authorize from "../middlewares/authorize";
import protect from "../middlewares/protect";
import { Roles } from "../constants/roles";
import upload from "../middlewares/upload";

const router = express.Router();

router.post("/login", login);

router.post("/create-user", 
    // verifyToken,
    // authorize(Roles.SUPER_ADMIN),
    createUser
);

router.post("/logout", logout);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

router.get("/me", protect, getMe);

router.patch(
    "/profile", 
    protect, 
    upload.single("profileImage"),
    updateProfile
);

export default router;