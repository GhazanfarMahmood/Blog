import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import commentRoutes from "./routes/commentRoutes";
import blogRoutes from "./routes/blogRoutes";

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

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`)
})