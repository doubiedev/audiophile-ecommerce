import type { Request, Response } from "express";

import { config } from "#config.js";
import { revokeRefreshToken, saveRefreshToken, userForRefreshToken } from "#db/controllers/refreshTokenController.js";
import { getUserByEmail } from "#db/controllers/userController.js";
import { UserResponse } from "#db/models/userModel.js";
import { checkPasswordHash, getBearerToken, makeJWT, makeRefreshToken } from "#utils/auth.js";
import { UserNotAuthenticatedError } from "#utils/errors.js";
import { respondWithJSON } from "#utils/json.js";
import asyncHandler from "express-async-handler";
import { z } from "zod";

type LoginResponse = UserResponse & {
    refreshToken: string;
    token: string;
};

const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(1),
});

const handlerLogin = asyncHandler(async (req: Request, res: Response) => {
    // FIX: zod error handling
    const params = loginSchema.parse(req.body);

    const user = await getUserByEmail(params.email);
    if (!user) {
        throw new UserNotAuthenticatedError("invalid email or password");
    }

    const matching = await checkPasswordHash(params.password, user.hashedPassword);
    if (!matching) {
        throw new UserNotAuthenticatedError("invalid email or password");
    }

    const accessToken = makeJWT(user.id, config.jwt.defaultDuration, config.jwt.secret);
    const refreshToken = makeRefreshToken();

    const saved = await saveRefreshToken(user.id, refreshToken);
    if (!saved) {
        throw new UserNotAuthenticatedError("could not save refresh token");
    }

    respondWithJSON(res, 200, {
        createdAt: user.createdAt,
        email: user.email,
        id: user.id,
        name: user.name,
        refreshToken: refreshToken,
        token: accessToken,
        updatedAt: user.updatedAt,
    } satisfies LoginResponse);
});

const handlerRefresh = asyncHandler(async (req: Request, res: Response) => {
    const refreshToken = getBearerToken(req);

    const result = await userForRefreshToken(refreshToken);
    if (!result) {
        throw new UserNotAuthenticatedError("invalid refresh token");
    }

    const user = result.user;
    const accessToken = makeJWT(user.id.toString(), config.jwt.defaultDuration, config.jwt.secret);

    interface response {
        token: string;
    }

    respondWithJSON(res, 200, {
        token: accessToken,
    } satisfies response);
});

const handlerRevoke = asyncHandler(async (req: Request, res: Response) => {
    const refreshToken = getBearerToken(req);
    await revokeRefreshToken(refreshToken);
    res.status(204).send();
});

export { handlerLogin, handlerRefresh, handlerRevoke };
