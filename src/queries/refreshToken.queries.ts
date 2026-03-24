import { config } from "#config/config.js";
import RefreshToken from "#models/refreshToken.model.js";
import { getUserById } from "#services/user.service.js";

export async function dbDeleteRefreshTokensForUser(userId: string) {
    return RefreshToken.deleteMany({ userId });
}

export async function dbGetUserForRefreshToken(token: string) {
    const refreshToken = await RefreshToken.findOne({
        expiresAt: { $gt: new Date() },
        revokedAt: null,
        token,
    });

    if (!refreshToken) return null;

    const user = await getUserById(refreshToken.userId.toString());
    return user;
}

export async function dbRevokeRefreshToken(token: string) {
    const result = await RefreshToken.findOneAndUpdate(
        { token },
        { revokedAt: new Date() },
        { returnDocument: "after" },
    );
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
