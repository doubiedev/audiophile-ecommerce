import type User from "#models/user.model.js";

import { config } from "#config/config.js";
import RefreshToken from "#models/refreshToken.model.js";

export async function dbDeleteRefreshTokensForUser(userId: string) {
    return RefreshToken.deleteMany({ userId });
}

export async function dbGetUserForRefreshToken(token: string) {
    const refreshToken = await RefreshToken.findOne({
        expiresAt: { $gt: new Date() },
        revokedAt: null,
        token,
    }).populate<{ userId: InstanceType<typeof User> }>("id");
    if (!refreshToken) return null;
    return refreshToken.userId;
}

export async function dbRevokeRefreshToken(token: string) {
    const result = await RefreshToken.findOneAndUpdate({ token }, { revokedAt: new Date() }, { new: true });
    if (!result) {
        throw new Error("Couldn't revoke token");
    }
}

export async function dbSaveRefreshToken(userID: string, token: string) {
    const refreshToken = await RefreshToken.create({
        expiresAt: new Date(Date.now() + config.jwt.refreshDuration),
        revokedAt: null,
        token,
        userId: userID,
    });
    return !!refreshToken;
}
