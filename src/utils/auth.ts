import type { JwtPayload } from "jsonwebtoken";

import { BadRequestError, UserNotAuthenticatedError } from "#utils/errors.js";
import argon2 from "argon2";
import crypto from "crypto";
import { Request } from "express";
import jwt from "jsonwebtoken";

const TOKEN_ISSUER = "audiophile";

type payload = Pick<JwtPayload, "exp" | "iat" | "iss" | "sub">;

export async function checkPasswordHash(password: string, hash: string) {
    if (!password) return false;
    try {
        return await argon2.verify(hash, password);
    } catch {
        return false;
    }
}

export function extractApiKey(header: string) {
    const splitAuth = header.split(" ");
    if (splitAuth.length < 2 || splitAuth[0] !== "ApiKey") {
        throw new BadRequestError("Malformed authorization header");
    }
    return splitAuth[1];
}

export function extractBearerToken(header: string) {
    const splitAuth = header.split(" ");
    if (splitAuth.length < 2 || splitAuth[0] !== "Bearer") {
        throw new BadRequestError("Malformed authorization header");
    }
    return splitAuth[1];
}

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

export async function hashPassword(password: string) {
    return argon2.hash(password);
}

export function makeJWT(userID: string, expiresIn: number, secret: string) {
    const issuedAt = Math.floor(Date.now() / 1000);
    const expiresAt = issuedAt + expiresIn;
    const token = jwt.sign(
        {
            exp: expiresAt,
            iat: issuedAt,
            iss: TOKEN_ISSUER,
            sub: userID,
        } satisfies payload,
        secret,
        { algorithm: "HS256" },
    );

    return token;
}

export function makeRefreshToken() {
    return crypto.randomBytes(32).toString("hex");
}

export function validateJWT(tokenString: string, secret: string) {
    let decoded: payload;
    try {
        decoded = jwt.verify(tokenString, secret) as JwtPayload;
    } catch {
        throw new UserNotAuthenticatedError("Invalid token");
    }

    if (decoded.iss !== TOKEN_ISSUER) {
        throw new UserNotAuthenticatedError("Invalid issuer");
    }

    if (!decoded.sub) {
        throw new UserNotAuthenticatedError("No user ID in token");
    }

    return decoded.sub;
}
