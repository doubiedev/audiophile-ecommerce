import type { NextFunction, Request, Response } from "express";
import type { z } from "zod";

type ValidationTarget = "body" | "params" | "query";

export function validate(target: ValidationTarget, schema: z.ZodType) {
    return (req: Request, _res: Response, next: NextFunction) => {
        req.validated = { ...req.validated, body: undefined, params: undefined, query: undefined };
        const parsed = schema.parse(req[target]);
        if (target === "body") {
            req.validated.body = parsed;
        } else if (target === "params") {
            req.validated.params = parsed;
        } else {
            req.validated.query = parsed;
        }
        next();
    };
}
