import type { Request, Response } from "express";

import { getBearerToken } from "#middleware/auth.middleware.js";
import { validateJWT } from "#services/auth.service.js";
import { createUser, deleteUser, getAllUsers, updateUser } from "#services/user.service.js";
import { objectIdSchema } from "#utils/validators.js";
import { z } from "zod";

const createUserSchema = z.object({
    email: z.email(),
    name: z.string().min(1),
    password: z.string().min(1),
});

export async function handlerCreateUser(req: Request, res: Response) {
    const params = createUserSchema.parse(req.body);
    const user = await createUser(params.email, params.password, params.name);
    res.status(201).json(user);
}

export async function handlerDeleteUser(req: Request, res: Response) {
    const id = objectIdSchema.parse(req.params.id);
    await deleteUser(id);
    res.status(200).json({ message: "User removed successfully" });
}

export async function handlerGetAllUsers(req: Request, res: Response) {
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 20;
    const result = await getAllUsers(page, pageSize);
    res.status(200).json(result);
}

const updateUserSchema = z.object({
    email: z.email(),
    name: z.string().min(1),
    password: z.string().min(1),
});

export async function handlerUpdateUser(req: Request, res: Response) {
    const params = updateUserSchema.parse(req.body);
    const token = getBearerToken(req);
    const userId = validateJWT(token);
    const user = await updateUser(userId, params.email, params.password, params.name);
    res.status(200).json(user);
}
