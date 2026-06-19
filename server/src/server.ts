import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import commentRoutes from "./routes/commentRoutes";
import blogRoutes from "./routes/blogRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import writerRoutes from "./routes/writerRoutes";
import contactRoutes from "./routes/contactRoutes";
import aboutRoutes from "./routes/aboutRoutes";

dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({
    origin : "http://localhost:3000", 
    credentials:  true
}))

app.get("/", (req, res) => {
    res.send("Server running and MongoDB connected!");
});

app.use("/api/comments", commentRoutes)

app.use("/api/blogs", blogRoutes);

app.use("/api/categories", categoryRoutes);

app.use("/api/writers", writerRoutes);

app.use("/api/contacts", contactRoutes);

app.use("/api/about", aboutRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`)
})