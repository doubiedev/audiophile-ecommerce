import type { Request, Response } from "express";

import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from "#services/user.service.js";
import { objectIdSchema } from "#utils/validators.js";
import { z } from "zod";

const createUserSchema = z.object({
    email: z.email().min(1).max(256),
    name: z.string().min(1).max(256),
    password: z.string().min(1).max(256),
});

export async function handlerCreateUser(req: Request, res: Response) {
    const params = createUserSchema.parse(req.body);
    const user = await createUser(params.email, params.password, params.name);
    res.status(201).json(user);
}

export async function handlerDeleteUser(req: Request, res: Response) {
    const id = objectIdSchema.parse(req.params.id);
    await deleteUser(id);
    res.status(204).send();
}

export async function handlerGetAllUsers(req: Request, res: Response) {
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 20;
    const result = await getAllUsers(page, pageSize);
    res.status(200).json(result);
}

export async function handlerGetUserById(req: Request, res: Response) {
    const id = objectIdSchema.parse(req.params.id);
    const user = await getUserById(id);
    res.status(200).json(user);
}

const updateUserSchema = z.object({
    email: z.email().min(1).max(256).optional(),
    name: z.string().min(1).max(256).optional(),
    password: z.string().min(1).max(256).optional(),
});

export async function handlerUpdateUser(req: Request, res: Response) {
    const id = objectIdSchema.parse(req.params.id);
    const params = updateUserSchema.parse(req.body);
    const user = await updateUser(id, params.email, params.password, params.name);
    res.status(200).json(user);
}
