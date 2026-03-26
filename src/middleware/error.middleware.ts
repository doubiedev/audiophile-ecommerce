import type { NextFunction, Request, Response } from "express";

import { MongoServerError } from "mongodb";
import { Error as MongooseError } from "mongoose";
import { ZodError } from "zod";

export default function errorMiddleware(err: Error, _req: Request, res: Response, _next: NextFunction) {
    if (err instanceof ZodError) {
        res.status(400).json({
            error: "Validation error",
            issues: err.issues.map((i) => ({
                field: i.path.join("."),
                message: i.message,
            })),
        });
        return;
    }

    if (err instanceof MongoServerError && err.code === 11000) {
        const keyValue = err.keyValue as Record<string, unknown>;
        const field = Object.keys(keyValue)[0] ?? "field";
        res.status(409).json({ error: `Duplicate value for field: ${field}` });
        return;
    }

    if (err instanceof MongooseError.CastError && err.kind === "ObjectId") {
        res.status(404).json({ error: "Resource not found" });
        return;
    }

    if (hasStatusCode(err)) {
        res.status(err.statusCode).json({ error: err.message });
        return;
    }

    console.error("Unhandled error:", err);
    res.status(500).json({ error: "Internal server error" });
}

function hasStatusCode(err: unknown): err is Error & { statusCode: number } {
    return err instanceof Error && "statusCode" in err && typeof err.statusCode === "number";
}
