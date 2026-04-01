import { config } from "#config/config.js";
import errorMiddleware from "#middleware/error.middleware.js";
import middlewareLogResponse from "#middleware/logging.middleware.js";
import authRoutes from "#routes/auth.routes.js";
import userRoutes from "#routes/user.routes.js";
import express, { type Request, type Response } from "express";
import path from "path";

const app = express();

app.use(middlewareLogResponse);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

if (config.api.nodeEnv === "production") {
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, "frontend/dist")));
    app.get("*", (_: Request, res: Response) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
} else {
    app.get("/", (_: Request, res: Response) => res.send("Server is ready"));
}

app.use(errorMiddleware);

export default app;
