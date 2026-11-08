
import "dotenv/config";

import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./config/db";

import commentRoutes from "./routes/commentRoutes";
import blogRoutes from "./routes/blogRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import contactRoutes from "./routes/contactRoutes";
import aboutRoutes from "./routes/aboutRoutes";
import uploadRoutes from "./routes/uploadRotes";
import newsletterRoutes from "./routes/newsletterRoutes";
import authRoutes from "./routes/authRoutes";
import homeRoutes from "./routes/homeRoutes";

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Allowed frontend origins.
const allowedOrigins = (
    process.env.CORS_ORIGINS ||
    "http://localhost:3000,http://localhost:3001"
)
    .split(",")
    .map((origin) => origin.trim().replace(/\/$/, ""))
    .filter(Boolean);

// CORS configuration
app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                return callback(null, true);
            }

            return callback(null, false);
        },
        credentials: true,
    })
);

// Connect to MongoDB before handling API requests.
app.use("/api", async (_req, _res, next) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        next(error);
    }
});

// Health check
app.get("/", (_req, res) => {
    res.send("Backend is running!");
});

// API Routes
app.use("/api/comments", commentRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/home", homeRoutes);

// Global error handler
app.use(
    (
        error: unknown,
        _req: Request,
        res: Response,
        _next: NextFunction
    ) => {
        console.error("API Error:", error);

        res.status(500).json({
            message: "Internal server error",
        });
    }
);

export default app;
