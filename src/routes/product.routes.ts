import {
    handlerCreateProduct,
    handlerDeleteProduct,
    handlerGetAllProducts,
    handlerGetProductById,
    handlerUpdateProduct,
} from "#controllers/product.controller.js";
import { requireAuth, requireRoles } from "#middleware/auth.middleware.js";
import { validateBody, validateParams } from "#middleware/validate.middleware.js";
import { createProductSchema, updateProductSchema } from "#models/product.model.js";
import { objectIdSchema } from "#utils/validators.js";
import express from "express";

const router = express.Router();

// Public
router.get("/:id", validateParams({ id: objectIdSchema }), handlerGetProductById);

// Admin only
router.get("/", requireAuth, requireRoles("admin"), handlerGetAllProducts);
router.post(
    "/",
    validateBody(createProductSchema),
    requireAuth,
    requireRoles("admin"),
    handlerCreateProduct,
);
router.patch(
    "/:id",
    validateParams({ id: objectIdSchema }),
    validateBody(updateProductSchema),
    requireAuth,
    requireRoles("admin"),
    handlerUpdateProduct,
);
router.delete(
    "/:id",
    validateParams({ id: objectIdSchema }),
    requireAuth,
    requireRoles("admin"),
    handlerDeleteProduct,
);

export default router;
