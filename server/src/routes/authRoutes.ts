import express from "express";
import {login, createUser, logout, forgotPassword, resetPassword, getMe, updateProfile, deleteProfileImage, getUsers, getUserById} from "../controllers/authController";
import protect from "../middlewares/protect";
import upload from "../middlewares/upload";
import { requireRole } from "../middlewares/requireRole";

const router = express.Router();

router.post("/login", login);

router.post("/logout", logout);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password", resetPassword);

router.get(
    "/me",
    protect,
    getMe
);

router.post(
    "/create-user",
    protect,
    requireRole("super-admin"),
    createUser
);

router.get(
    "/users",
    protect,
    requireRole("super-admin"),
    getUsers
);

router.get(
    "/user/:id",
    protect,
    requireRole("super-admin"),
    getUserById
);


router.patch(
    "/profile",
    protect,
    upload.single("profileImage"),
    updateProfile
);

router.delete(
    "/profile-image",
    protect,
    deleteProfileImage
);


export default router;