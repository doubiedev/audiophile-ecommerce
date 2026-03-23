import { config } from "#config/config.js";
import mongoose from "mongoose";

const connectDB = async () => {
    mongoose.connection.on("connected", () => {
        console.log(`MongoDB connected: ${mongoose.connection.host}`);
    });
    mongoose.connection.on("error", (error) => {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    });
    mongoose.connection.on("disconnected", () => {
        console.log("MongoDB disconnected");
    });

    await mongoose.connect(config.db.url);
};

export default connectDB;
