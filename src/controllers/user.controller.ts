import type { CreateUserInput, ObjectId, UpdateUserInput } from "#utils/validators.js";
import type { Request, Response } from "express";

import {
    createUser,
    deleteUser,
    getAllUsers,
    getUserById,
    updateUser,
} from "#services/user.service.js";

export async function handlerCreateUser(req: Request, res: Response) {
    const params = req.validated.body as CreateUserInput;
    const user = await createUser(params.email, params.password, params.name);
    res.status(201).json(user);
}

export async function handlerDeleteUser(req: Request, res: Response) {
    const { id } = req.validated.params as { id: ObjectId };
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
    const { id } = req.validated.params as { id: ObjectId };
    const user = await getUserById(id);
    res.status(200).json(user);
}

export async function handlerUpdateUser(req: Request, res: Response) {
    const { id } = req.validated.params as { id: ObjectId };
    const params = req.validated.body as UpdateUserInput;
    const user = await updateUser(id, params.email, params.password, params.name);
    res.status(200).json(user);
}
