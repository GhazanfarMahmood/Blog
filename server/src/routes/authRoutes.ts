import express from "express";
import {login, createUser, logout, forgotPassword, resetPassword, getMe, updateProfile, deleteProfileImage, getUsers, getUserById, updateUser, deleteUser, setUserPassword, changeOwnPassword} from "../controllers/authController";
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
    upload.single("profileImage"),
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
  "/user/:id",
  protect,
  requireRole("super-admin"),
  updateUser
);

router.patch(
    "/user/:id/password",
    protect, 
    requireRole("super-admin"),
    setUserPassword
);

router.patch(
    "/me/password",
    protect,
    changeOwnPassword,
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

router.delete(
    "/user/:id",
    protect,
    requireRole("super-admin"),
    deleteUser,
)


export default router;