import type { Request } from "express";

import { BadRequestError, UserNotAuthenticatedError } from "#utils/errors.js";

export function getAPIKey(req: Request) {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
        throw new UserNotAuthenticatedError("Malformed authorization header");
    }
    return extractApiKey(authHeader);
}

export function getBearerToken(req: Request) {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
        throw new UserNotAuthenticatedError("Malformed authorization header");
    }
    return extractBearerToken(authHeader);
}

function extractApiKey(header: string) {
    const splitAuth = header.split(" ");
    if (splitAuth.length < 2 || splitAuth[0] !== "ApiKey") {
        throw new BadRequestError("Malformed authorization header");
    }
    return splitAuth[1];
}

function extractBearerToken(header: string) {
    const splitAuth = header.split(" ");
    if (splitAuth.length < 2 || splitAuth[0] !== "Bearer") {
        throw new BadRequestError("Malformed authorization header");
    }
    return splitAuth[1];
}
