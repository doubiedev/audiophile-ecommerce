import {
    dbGetUserForRefreshToken,
    dbRevokeRefreshToken,
    dbSaveRefreshToken,
} from "#queries/refreshToken.queries.js";
import { UserNotAuthenticatedError } from "#utils/errors.js";

export async function getUserForRefreshToken(token: string) {
    const user = await dbGetUserForRefreshToken(token);
    if (!user) {
        throw new UserNotAuthenticatedError("Invalid refresh token");
    }
    return user;
}

export async function revokeRefreshToken(token: string) {
    await dbRevokeRefreshToken(token);
}

export async function saveRefreshToken(userID: string, token: string) {
    const saved = await dbSaveRefreshToken(userID, token);
    if (!saved) {
        throw new UserNotAuthenticatedError("Could not save refresh token");
    }
}
