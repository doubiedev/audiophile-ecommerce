import express, { type Request, type Response } from "express";
import path from "path";

import errorMiddleware from "./api/middleware/errorMiddleware.js";
import middlewareLogResponse from "./api/middleware/loggingMiddleware.js";
import { config } from "./config.js";
import connectDB from "./db/db.js";
import authRoutes from "./db/routes/authRoutes.js";
import userRoutes from "./db/routes/userRoutes.js";

await connectDB();

const app = express();

app.use(middlewareLogResponse);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

if (config.api.platform === "prod") {
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, "frontend/dist")));

    app.get("*", (_: Request, res: Response) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
} else {
    app.get("/", (_: Request, res: Response) => res.send("Server is ready"));
}

app.use(errorMiddleware);

app.listen(config.api.port, () => {
    console.log(`Server started on port ${config.api.port.toString()}`);
});
