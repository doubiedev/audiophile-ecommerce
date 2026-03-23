import type { JwtPayload } from "jsonwebtoken";

import { config } from "#config/config.js";
import { UserNotAuthenticatedError } from "#utils/errors.js";
import argon2 from "argon2";
import crypto from "crypto";
import jwt from "jsonwebtoken";

type payload = Pick<JwtPayload, "exp" | "iat" | "iss" | "sub">;

export async function checkPasswordHash(password: string, hash: string) {
    if (!password) return false;
    try {
        return await argon2.verify(hash, password);
    } catch {
        return false;
    }
}

export async function hashPassword(password: string) {
    return argon2.hash(password);
}

export function makeJWT(userID: string, expiresIn: number) {
    const issuedAt = Math.floor(Date.now() / 1000);
    const expiresAt = issuedAt + expiresIn;
    return jwt.sign(
        {
            exp: expiresAt,
            iat: issuedAt,
            iss: config.jwt.issuer,
            sub: userID,
        } satisfies payload,
        config.jwt.secret,
        { algorithm: "HS256" },
    );
}

export function makeRefreshToken() {
    return crypto.randomBytes(32).toString("hex");
}

export function validateJWT(tokenString: string) {
    let decoded: payload;
    try {
        decoded = jwt.verify(tokenString, config.jwt.secret) as JwtPayload;
    } catch {
        throw new UserNotAuthenticatedError("Invalid token");
    }
    if (decoded.iss !== config.jwt.issuer) {
        throw new UserNotAuthenticatedError("Invalid issuer");
    }
    if (!decoded.sub) {
        throw new UserNotAuthenticatedError("No user ID in token");
    }
    return decoded.sub;
}
