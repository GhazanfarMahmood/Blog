import express from "express";
import { createContact, deleteContact, getContact, updateContact } from "../controllers/contactController";

const router = express.Router();

router.post("/", createContact);

router.get("/", getContact);

router.put("/:id", updateContact);

router.delete("/:id", deleteContact);

export default router;