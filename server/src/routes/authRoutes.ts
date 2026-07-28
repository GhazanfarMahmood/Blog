import express from "express";
import {login, createUser, logout, forgotPassword, resetPassword} from "../controllers/authController";
import verifyToken from "../middlewares/verifyToken";
import authorizationRole from "../middlewares/authorizationRoles";

const router = express.Router();

router.post("/login", login);

router.post("/create-user", 
    verifyToken,
    authorizationRole("super-admin"),
    createUser
);

router.post("/logout", logout);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password", resetPassword);


export default router;