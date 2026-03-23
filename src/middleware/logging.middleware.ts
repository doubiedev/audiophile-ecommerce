import type { NextFunction, Request, Response } from "express";

export default function middlewareLogResponse(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();
    res.on("finish", () => {
        const duration = Date.now() - start;
        const status = res.statusCode;
        const level = status >= 500 ? "ERROR" : status >= 400 ? "WARN" : "INFO";
        console.log(`[${level}] ${req.method} ${req.url} ${status.toString()} - ${duration.toString()}ms`);
    });
    next();
}
