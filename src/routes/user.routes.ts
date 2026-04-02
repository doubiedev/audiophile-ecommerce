import {
    handlerCreateUser,
    handlerDeleteUser,
    handlerGetAllUsers,
    handlerGetUserById,
    handlerUpdateUser,
} from "#controllers/user.controller.js";
import { requireAuth, requireOwnerOrAdmin, requireRoles } from "#middleware/auth.middleware.js";
import { validateBody, validateParams } from "#middleware/validate.middleware.js";
import { createUserSchema, objectIdSchema, updateUserSchema } from "#utils/validators.js";
import express from "express";

const router = express.Router();

// Public
router.post("/", validateBody(createUserSchema), handlerCreateUser);

// Admin only
// TODO: add pagination validation
router.get("/", requireAuth, requireRoles("admin"), handlerGetAllUsers);

// Owner or admin
router.get("/:id", validateParams({ id: objectIdSchema }), requireAuth, requireOwnerOrAdmin, handlerGetUserById);
router.patch(
    "/:id",
    validateParams({ id: objectIdSchema }),
    validateBody(updateUserSchema),
    requireAuth,
    requireOwnerOrAdmin,
    handlerUpdateUser,
);
router.delete("/:id", validateParams({ id: objectIdSchema }), requireAuth, requireOwnerOrAdmin, handlerDeleteUser);

export default router;
