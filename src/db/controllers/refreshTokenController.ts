import { config } from "#config.js";
import RefreshToken from "#db/models/refreshTokenModel.js";

export async function revokeRefreshToken(token: string) {
    const result = await RefreshToken.findOneAndUpdate({ token }, { revokedAt: new Date() }, { new: true });
    if (!result) {
        throw new Error("Couldn't revoke token");
    }
}

// NOTE: not sure if i need asyncHandler here
export async function saveRefreshToken(userID: string, token: string) {
    const refreshToken = await RefreshToken.create({
        expiresAt: new Date(Date.now() + config.jwt.refreshDuration),
        revokedAt: null,
        token,
        userId: userID,
    });
    return !!refreshToken;
}

export async function userForRefreshToken(token: string) {
    const refreshToken = await RefreshToken.findOne({
        expiresAt: { $gt: new Date() },
        revokedAt: null,
        token,
    }).populate("userId");

    if (!refreshToken) return null;
    return { user: refreshToken.userId }; // populated User document
}
