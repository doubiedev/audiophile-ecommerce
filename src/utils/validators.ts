import mongoose from "mongoose";
import { z } from "zod";

export const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(1),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const createUserSchema = z.object({
    email: z.email().min(1).max(256),
    name: z.string().min(1).max(256),
    password: z.string().min(1).max(256),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;

export const updateUserSchema = z.object({
    email: z.email().min(1).max(256).optional(),
    name: z.string().min(1).max(256).optional(),
    password: z.string().min(1).max(256).optional(),
});

export type UpdateUserInput = z.infer<typeof updateUserSchema>;

export const objectIdSchema = z
    .string()
    .refine((id) => mongoose.isObjectIdOrHexString(id), { message: "Invalid id format" });

export type ObjectId = z.infer<typeof objectIdSchema>;
