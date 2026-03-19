import { BadRequestError, NotFoundError, UserForbiddenError, UserNotAuthenticatedError } from "#utils/errors.js";
import { respondWithError } from "#utils/json.js";
import { NextFunction, Request, Response } from "express";
import { Error } from "mongoose";
import { ZodError } from "zod";

export default function errorMiddleWare(err: Error, _: Request, res: Response, __: NextFunction) {
    // FIX: Zod and Mongoose error handling
    if (err instanceof ZodError) {
        respondWithError(res, 400, err.issues[0].message);
    } else if (err instanceof BadRequestError) {
        respondWithError(res, 400, err.message);
    } else if (err instanceof UserNotAuthenticatedError) {
        res.status(401).send("Unauthorized");
    } else if (err instanceof UserForbiddenError) {
        res.status(403).send("Forbidden");
    } else if (err instanceof Error.CastError && err.kind === "ObjectId") {
        respondWithError(res, 404, "Resource not found");
    } else if (err instanceof NotFoundError) {
        res.status(404).send("Not Found");
    } else {
        res.status(500).send("Internal Server Error");
    }
}
