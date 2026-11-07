
import { Request, Response } from "express";
import Newsletter from "../models/Newsletter";
import { sendNewsletterEmail } from "../services/brevoEmailService";
import mongoose from "mongoose";

// Subscribe to newsletter
export const subscribeNewsletter = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email } = req.body;

    if (typeof email !== "string" || !email.trim()) {
      res.status(400).json({
        success: false,
        message: "Email is required.",
      });
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(normalizedEmail)) {
      res.status(400).json({
        success: false,
        message: "Please provide a valid email address.",
      });
      return;
    }

    const existingSubscriber = await Newsletter.findOne({
      email: normalizedEmail,
    });

    if (existingSubscriber) {
      res.status(409).json({
        success: false,
        message: "This email is already subscribed.",
      });
      return;
    }

    await Newsletter.create({
      email: normalizedEmail,
    });

    res.status(201).json({
      success: true,
      message: "Successfully subscribed to the newsletter.",
    });
  } catch (error: any) {
    if (error.code === 11000) {
      res.status(409).json({
        success: false,
        message: "This email is already subscribed.",
      });
      return;
    }

    console.error("Newsletter subscription error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to subscribe to newsletter.",
    });
  }
};

// Get all subscribers
export const getAllSubscribers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const subscribers = await Newsletter.find()
      .select("email createdAt updatedAt")
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({
      success: true,
      total: subscribers.length,
      subscribers,
    });
  } catch (error) {
    console.error("Get subscribers error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch subscribers.",
    });
  }
};

// Send newsletter to all subscribers
export const sendNewsletter = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { subject, content } = req.body;

    if (
      typeof subject !== "string" ||
      typeof content !== "string" ||
      !subject.trim() ||
      !content.trim()
    ) {
      res.status(400).json({
        success: false,
        message: "Subject and content are required.",
      });
      return;
    }

    const trimmedSubject = subject.trim();
    const trimmedContent = content.trim();

    if (trimmedSubject.length > 200) {
      res.status(400).json({
        success: false,
        message: "Subject cannot exceed 200 characters.",
      });
      return;
    }

    if (trimmedContent.length > 20000) {
      res.status(400).json({
        success: false,
        message: "Content cannot exceed 20000 characters.",
      });
      return;
    }

    const subscribers = await Newsletter.find()
      .select("email")
      .lean();

    if (subscribers.length === 0) {
      res.status(404).json({
        success: false,
        message: "No newsletter subscribers found.",
      });
      return;
    }

    let sent = 0;
    let failed = 0;

    for (const subscriber of subscribers) {
      try {
        await sendNewsletterEmail(
          subscriber.email,
          trimmedSubject,
          trimmedContent
        );

        sent++;
      } catch (error) {
        failed++;

        console.error(
          `Failed to send newsletter to ${subscriber.email}:`,
          error
        );
      }
    }

    res.status(200).json({
      success: failed === 0,
      message:
        failed === 0
          ? "Newsletter submitted successfully to all subscribers."
          : "Newsletter sending completed with some failures.",
      total: subscribers.length,
      sent,
      failed,
    });
  } catch (error) {
    console.error("Send newsletter error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to send newsletter.",
    });
  }
};

// Delete newsletter subscriber

export const deleteNewsletterSubscriber = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    if (typeof id !== "string" || !mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid subscriber ID.",
      });
      return;
    }

    const subscriber = await Newsletter.findByIdAndDelete(id);

    if (!subscriber) {
      res.status(404).json({
        success: false,
        message: "Newsletter subscriber not found.",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Newsletter subscriber deleted successfully.",
    });
  } catch (error) {
    console.error("Delete newsletter subscriber error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete newsletter subscriber.",
    });
  }
};
