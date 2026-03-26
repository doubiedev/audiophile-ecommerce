import type User from "#models/user.model.js";

import { type NewUser, type UserResponse } from "#models/user.model.js";
import { dbDeleteRefreshTokensForUser } from "#queries/refreshToken.queries.js";
import {
    dbCreateUser,
    dbDeleteUser,
    dbGetAllUsers,
    dbGetUserByEmail,
    dbGetUserById,
    dbUpdateUser,
} from "#queries/user.queries.js";
import { hashPassword } from "#services/auth.service.js";
import { NotFoundError, UserNotAuthenticatedError } from "#utils/errors.js";

export async function createUser(email: string, password: string, name: string) {
    const hashedPassword = await hashPassword(password);
    const user = await dbCreateUser({ email, hashedPassword, name } satisfies NewUser);
    return formatUserResponse(user);
}

export async function deleteUser(id: string) {
    const user = await dbDeleteUser(id);
    if (!user) {
        throw new NotFoundError(`User with id: ${id} not found`);
    }
    // NOTE: if deleteMany throws, the user is deleted but stale tokens remain
    // TODO: wrap in a MongoDB transaction
    await dbDeleteRefreshTokensForUser(user._id.toString());
}

export async function getAllUsers(page: number, pageSize: number) {
    const { count, users } = await dbGetAllUsers(page, pageSize);
    return {
        page,
        pages: Math.ceil(count / pageSize),
        users,
    };
}

export async function getAuthenticatedUser(id: string) {
    const user = await dbGetUserById(id);
    if (!user) {
        throw new UserNotAuthenticatedError("User no longer exists");
    }
    return user;
}

export async function getUserByEmail(email: string) {
    return dbGetUserByEmail(email);
}

export async function getUserById(id: string) {
    const user = await dbGetUserById(id);
    if (!user) {
        throw new NotFoundError(`User with id: ${id} not found`);
    }
    return formatUserResponse(user);
}

export async function updateUser(userId: string, email?: string, password?: string, name?: string) {
    const updatedUser: Partial<NewUser> = {};
    if (email) updatedUser.email = email;
    if (name) updatedUser.name = name;
    if (password) updatedUser.hashedPassword = await hashPassword(password);

    const user = await dbUpdateUser(userId, updatedUser);
    if (!user) {
        throw new NotFoundError(`User with id: ${userId} not found`);
    }
    return formatUserResponse(user);
}

function formatUserResponse(user: InstanceType<typeof User>): UserResponse {
    return {
        createdAt: user.createdAt,
        email: user.email,
        id: user.id,
        name: user.name,
        role: user.role,
        updatedAt: user.updatedAt,
    };
}
