import type { NextFunction, Request, Response } from "express";
import type { z } from "zod";

export function validateBody(schema: z.ZodType) {
    return (req: Request, _res: Response, next: NextFunction) => {
        req.validated = { ...req.validated, body: undefined };
        const parsed = schema.parse(req.body);
        req.validated.body = parsed;
        next();
    };
}

export function validateParams(schemas: Record<string, z.ZodType>) {
    return (req: Request, _res: Response, next: NextFunction) => {
        req.validated = { ...req.validated, params: undefined };
        for (const [key, schema] of Object.entries(schemas)) {
            req.validated.params = req.validated.params ?? {};
            (req.validated.params as Record<string, unknown>)[key] = schema.parse(req.params[key]);
        }
        next();
    };
}

// export function validateQuery(schemas: Record<string, z.ZodType>) {}
