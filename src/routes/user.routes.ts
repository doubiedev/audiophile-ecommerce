import {
    handlerCreateUser,
    handlerDeleteUser,
    handlerGetAllUsers,
    handlerGetUserById,
    handlerUpdateUser,
} from "#controllers/user.controller.js";
import { requireAuth, requireOwnerOrAdmin, requireRoles } from "#middleware/auth.middleware.js";
import { validate } from "#middleware/validate.middleware.js";
import { createUserSchema, objectIdSchema, updateUserSchema } from "#utils/validators.js";
import express from "express";

const router = express.Router();

// Public
router.post("/", validate("body", createUserSchema), handlerCreateUser);

// Admin only
// TODO: add pagination validation
router.get("/", requireAuth, requireRoles("admin"), handlerGetAllUsers);

// Owner or admin
router.get("/:id", validate("params", objectIdSchema), requireAuth, requireOwnerOrAdmin, handlerGetUserById);
router.patch(
    "/:id",
    validate("params", objectIdSchema),
    validate("body", updateUserSchema),
    requireAuth,
    requireOwnerOrAdmin,
    handlerUpdateUser,
);
router.delete("/:id", validate("params", objectIdSchema), requireAuth, requireOwnerOrAdmin, handlerDeleteUser);

export default router;
