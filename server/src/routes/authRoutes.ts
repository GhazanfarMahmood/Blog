import express from "express";
import {login, createUser, logout} from "../controllers/authController";
import verifyToken from "../middlewares/verifyToken";
import authorizationRole from "../middlewares/authorizationRoles";

const router = express.Router();

router.post("/login", login);
router.post("/create-user", 
    createUser
);
router.post("/create-user", 
    verifyToken,
    authorizationRole("super-admin"),
    createUser
);

export default router;