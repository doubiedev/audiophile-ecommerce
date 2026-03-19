import type { Request, Response } from "express";

import { config } from "#config.js";
import RefreshToken from "#db/models/refreshTokenModel.js";
import User, { NewUser, UserResponse } from "#db/models/userModel.js";
import { getBearerToken, hashPassword, validateJWT } from "#utils/auth.js";
import { BadRequestError, NotFoundError } from "#utils/errors.js";
import { respondWithJSON } from "#utils/json.js";
import asyncHandler from "express-async-handler";
import { z } from "zod";

// @desc    Create user
// @route   POST /api/users
// @access  Public

const createUserSchema = z.object({
    email: z.email(),
    name: z.string(),
    password: z.string(),
});

const createUser = asyncHandler(async (req: Request, res: Response) => {
    // FIX: zod error handling
    const params = createUserSchema.parse(req.body);

    // if (!params.password || !params.email || !params.name) {
    //     throw new BadRequestError("Missing required fields");
    // }

    const hashedPassword = await hashPassword(params.password);

    const user = await User.create({
        email: params.email,
        hashedPassword,
        name: params.name,
    } satisfies NewUser);

    // FIX: mongoose error handling
    // if (!user) {
    //     throw new Error("Could not create user");
    // }

    respondWithJSON(res, 201, {
        createdAt: user.createdAt,
        email: user.email,
        id: user.id,
        name: user.name,
        updatedAt: user.updatedAt,
    } satisfies UserResponse);
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private

const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 20;

    const count = await User.countDocuments();
    const users = await User.find({})
        .limit(pageSize)
        .skip(pageSize * (page - 1));

    // FIX: mongoose error handling
    // if (!users || users.length === 0) {
    //     throw new NotFoundError("No users found");
    // }

    res.status(200).json({
        page,
        pages: Math.ceil(count / pageSize),
        users,
    });
});

// @desc    Get user by email
// @route   N/A
// @access  Private

async function getUserByEmail(email: string) {
    const user = await User.findOne({ email: email });
    return user;
}

// BUG: Not implementing REST API route /api/users/:id
// @desc    Update user
// @route   PUT /api/users
// @access  Private

const updateUserSchema = z.object({
    email: z.email(),
    name: z.string(),
    password: z.string(),
});

const updateUser = asyncHandler(async (req: Request, res: Response) => {
    // FIX: zod error handling
    const params = updateUserSchema.parse(req.body);

    // interface parameters {
    //     email: string;
    //     name: string;
    //     password: string;
    // }

    const token = getBearerToken(req);
    const userId = validateJWT(token, config.jwt.secret);

    // const params: parameters = req.body;

    if (!params.password || !params.email || !params.name) {
        throw new BadRequestError("Missing required fields");
    }

    const hashedPassword = await hashPassword(params.password);

    const user = await User.findByIdAndUpdate(
        userId,
        {
            email: params.email,
            hashedPassword,
            name: params.name,
        },
        { returnDocument: "after", runValidators: true },
    );

    if (!user) {
        throw new NotFoundError(`User with id: ${userId} not found`);
    }

    respondWithJSON(res, 200, {
        createdAt: user.createdAt,
        email: user.email,
        id: user.id,
        name: user.name,
        updatedAt: user.updatedAt,
    } satisfies UserResponse);
});

// BUG: Not implementing REST API route /api/users/:id
// @desc    Delete user
// @route   DELETE /api/users
// @access  Private

const deleteUserSchema = z.object({
    id: z.string(),
});

const deleteUser = asyncHandler(async (req: Request, res: Response) => {
    // FIX: zod error handling
    const params = deleteUserSchema.parse(req.body);

    const user = await User.findByIdAndDelete(params.id);

    if (!user) {
        throw new NotFoundError(`User with id: ${params.id} not found`);
    }

    // If deleteMany throws, the user is deleted but stale refresh tokens will remain
    // FIX: would most likely be to use mongoDB transaction
    await RefreshToken.deleteMany({ userId: user._id });
    res.status(200).json({ message: "User removed successfully" });
});

export { createUser, deleteUser, getAllUsers, getUserByEmail, updateUser };
