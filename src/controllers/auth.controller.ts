import type { Request, Response } from "express";

import { config } from "#config/config.js";
import { getBearerToken } from "#middleware/auth.middleware.js";
import { type UserResponse } from "#models/user.model.js";
import { checkPasswordHash, makeJWT, makeRefreshToken } from "#services/auth.service.js";
import { getUserForRefreshToken, revokeRefreshToken, saveRefreshToken } from "#services/refreshToken.service.js";
import { getUserByEmail } from "#services/user.service.js";
import { UserNotAuthenticatedError } from "#utils/errors.js";
import { z } from "zod";

type LoginResponse = UserResponse & {
    refreshToken: string;
    token: string;
};

const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(1),
});

export async function handlerLogin(req: Request, res: Response) {
    const params = loginSchema.parse(req.body);
    const user = await getUserByEmail(params.email);
    if (!user) {
        throw new UserNotAuthenticatedError("Invalid email or password");
    }
    const matching = await checkPasswordHash(params.password, user.hashedPassword);
    if (!matching) {
        throw new UserNotAuthenticatedError("Invalid email or password");
    }
    const accessToken = makeJWT(user.id, config.jwt.defaultDuration);
    const refreshToken = makeRefreshToken();
    await saveRefreshToken(user.id, refreshToken);
    res.status(201).json({
        createdAt: user.createdAt,
        email: user.email,
        id: user.id,
        name: user.name,
        refreshToken,
        roles: user.roles,
        token: accessToken,
        updatedAt: user.updatedAt,
    } satisfies LoginResponse);
}

export async function handlerRefresh(req: Request, res: Response) {
    const refreshToken = getBearerToken(req);
    const user = await getUserForRefreshToken(refreshToken);
    const accessToken = makeJWT(user.id, config.jwt.defaultDuration);
    res.status(200).json({ token: accessToken });
}

export async function handlerRevoke(req: Request, res: Response) {
    const refreshToken = getBearerToken(req);
    await revokeRefreshToken(refreshToken);
    res.status(204).send();
}
