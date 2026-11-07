import express from "express";

import {
  subscribeNewsletter,
  getAllSubscribers,
  sendNewsletter,
  deleteNewsletterSubscriber,
} from "../controllers/newsletterController";

import protect from "../middlewares/protect";
import authorize from "../middlewares/authorize";

const router = express.Router();

router.post("/subscribe", subscribeNewsletter);

// Super-admin only
router.get(
  "/admin",
  protect,
  authorize("super-admin"),
  getAllSubscribers
);

router.post(
  "/send",
  protect,
  authorize("super-admin"),
  sendNewsletter
);

router.post("/test-email", sendNewsletter);


router.delete(
  "/admin/:id",
  protect,
  authorize("super-admin"),
  deleteNewsletterSubscriber
);


export default router;