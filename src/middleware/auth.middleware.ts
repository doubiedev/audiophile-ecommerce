import type { NextFunction, Request, Response } from "express";

import { validateJWT } from "#services/auth.service.js";
import { getUserById } from "#services/user.service.js";
import { BadRequestError, UserForbiddenError, UserNotAuthenticatedError } from "#utils/errors.js";

export function getAPIKey(req: Request) {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
        throw new UserNotAuthenticatedError("Missing authorization header");
    }
    return extractApiKey(authHeader);
}

export function getBearerToken(req: Request) {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
        throw new UserNotAuthenticatedError("Missing authorization header");
    }
    return extractBearerToken(authHeader);
}

export async function requireAuth(req: Request, _: Response, next: NextFunction) {
    const token = getBearerToken(req);
    const userId = validateJWT(token);
    const user = await getUserById(userId);
    req.user = { id: userId, role: user.role };
    next();
}

export function requireOwnerOrAdmin(req: Request, _: Response, next: NextFunction) {
    const isOwner = req.user?.id === req.params.id;
    const isAdmin = req.user?.role.includes("admin");
    if (!isOwner && !isAdmin) {
        throw new UserForbiddenError("You cannot modify another user's account");
    }
    next();
}

export function requireRoles(...roles: string[]) {
    return (req: Request, _: Response, next: NextFunction) => {
        const role = req.user?.role;
        if (!role) {
            throw new UserNotAuthenticatedError("Not authenticated");
        }
        const hasRole = roles.some((r) => role.includes(r));
        if (!hasRole) {
            throw new UserForbiddenError("Insufficient permissions");
        }
        next();
    };
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
