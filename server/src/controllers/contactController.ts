
import { Request, Response } from "express";
import Contact from "../models/Contact";
import mongoose from "mongoose";

// CREATE CONTACT - PUBLIC
export const createContact = async (
  req: Request,
  res: Response
) => {
  try {
    const { firstName, lastName, email, subject, message } = req.body;

    const fields = [firstName, lastName, email, subject, message];

    if (
      fields.some(
        (field) =>
          typeof field !== "string" || !field.trim()
      )
    ) {
      return res.status(400).json({
        message: "All fields are required!",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    if (
      normalizedEmail.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)
    ) {
      return res.status(400).json({
        message: "Invalid email address",
      });
    }

    const contact = await Contact.create({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: normalizedEmail,
      subject: subject.trim(),
      message: message.trim(),
    });

    return res.status(201).json(contact);
  } catch (error) {
    console.error("CREATE CONTACT ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// GET ALL CONTACT MESSAGES - ADMIN
export const getContact = async (
  req: Request,
  res: Response
) => {
  try {
    const contacts = await Contact.find()
      .sort({ createdAt: -1 });

    return res.status(200).json(contacts);
  } catch (error) {
    console.error("GET CONTACT ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// GET CONTACT STATISTICS - ADMIN
export const getContactStats = async (
  req: Request,
  res: Response
) => {
  try {
    const [total, newMessages, read, resolved] =
      await Promise.all([
        Contact.countDocuments(),
        Contact.countDocuments({ status: "new" }),
        Contact.countDocuments({ status: "read" }),
        Contact.countDocuments({ status: "resolved" }),
      ]);

    return res.status(200).json({
      success: true,
      total,
      newMessages,
      read,
      resolved,
    });
  } catch (error) {
    console.error("GET CONTACT STATS ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// GET SINGLE CONTACT - ADMIN
export const getContactById = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    if (
      typeof id !== "string" ||
      !mongoose.isObjectIdOrHexString(id)
    ) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const contact = await Contact.findById(id);

    if (!contact) {
      return res.status(404).json({
        message: "Contact message not found",
      });
    }

    return res.status(200).json(contact);
  } catch (error) {
    console.error("GET CONTACT BY ID ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// UPDATE CONTACT STATUS - ADMIN
export const updateContact = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const { status } = req.body ?? {};

    if (
      typeof id !== "string" ||
      !mongoose.isObjectIdOrHexString(id)
    ) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    if (!["new", "read", "resolved"].includes(status)) {
      return res.status(400).json({
        message: "Invalid contact status",
      });
    }

    const updatedContact = await Contact.findByIdAndUpdate(
      id,
      { $set: { status } },
      { new: true, runValidators: true }
    );

    if (!updatedContact) {
      return res.status(404).json({
        message: "Contact message not found",
      });
    }

    return res.status(200).json({
      message: "Contact status updated successfully",
      data: updatedContact,
    });
  } catch (error) {
    console.error("UPDATE CONTACT ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// DELETE CONTACT - ADMIN
export const deleteContact = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    if (
      typeof id !== "string" ||
      !mongoose.isObjectIdOrHexString(id)
    ) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const deletedContact = await Contact.findByIdAndDelete(id);

    if (!deletedContact) {
      return res.status(404).json({
        message: "Contact message not found",
      });
    }

    return res.status(200).json({
      message: "Contact message deleted successfully",
    });
  } catch (error) {
    console.error("DELETE CONTACT ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
