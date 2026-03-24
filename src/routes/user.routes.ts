import {
    handlerCreateUser,
    handlerDeleteUser,
    handlerGetAllUsers,
    handlerGetUserById,
    handlerUpdateUser,
} from "#controllers/user.controller.js";
import { requireAuth, requireOwnerOrAdmin, requireRoles } from "#middleware/auth.middleware.js";
import express from "express";

const router = express.Router();

// Public
router.post("/", handlerCreateUser);

// Admin only
router.get("/", requireAuth, requireRoles("admin"), handlerGetAllUsers);

// Owner or admin
router.get("/:id", requireAuth, requireOwnerOrAdmin, handlerGetUserById);
router.patch("/:id", requireAuth, requireOwnerOrAdmin, handlerUpdateUser);
router.delete("/:id", requireAuth, requireOwnerOrAdmin, handlerDeleteUser);

export default router;
