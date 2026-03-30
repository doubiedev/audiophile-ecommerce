import mongoose from "mongoose";
import { z } from "zod";

export const objectIdSchema = z
    .string()
    .refine((id) => mongoose.isObjectIdOrHexString(id), { message: "Invalid id format" });
