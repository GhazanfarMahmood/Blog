
import mongoose from "mongoose";

// Cache the connection promise between serverless requests.
let cachedConnection: Promise<typeof mongoose> | null = null;

const connectDB = async () => {
    const MONGO_URI = process.env.MONGO_URI;

    if (!MONGO_URI) {
        throw new Error(
            "MONGO_URI is not defined in environment variables"
        );
    }

    // Reuse an existing active connection.
    if (mongoose.connection.readyState === 1) {
        return mongoose;
    }

    // Reset the cache if the connection was disconnected.
    if (mongoose.connection.readyState === 0) {
        cachedConnection = null;
    }

    // Reuse an ongoing connection attempt.
    if (!cachedConnection) {
        cachedConnection = mongoose.connect(MONGO_URI, {
            maxPoolSize: 5,
            serverSelectionTimeoutMS: 10000,
        }).catch((error) => {
            cachedConnection = null;
            throw error;
        });
    }

    return cachedConnection;
};

export default connectDB;
