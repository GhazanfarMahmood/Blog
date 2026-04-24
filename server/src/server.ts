import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";

dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Server running and MongoDB connected!");
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`)
})