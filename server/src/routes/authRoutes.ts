import express from "express";
import {login, createUser, logout} from "../controllers/authController";

const router = express.Router();

router.post("/login", login);
router.post("/create-user", 
    verifyToken,
    authorizationRole("super-admin"),
    createUser
);
router.post("/logout", logout);

export default router;