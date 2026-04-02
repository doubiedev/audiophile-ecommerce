import { handlerLogin, handlerRefresh, handlerRevoke } from "#controllers/auth.controller.js";
import { validateBody } from "#middleware/validate.middleware.js";
import { loginSchema } from "#utils/validators.js";
import express from "express";

const router = express.Router();

// Public
router.post("/login", validateBody(loginSchema), handlerLogin);
router.post("/refresh", handlerRefresh);
router.post("/revoke", handlerRevoke);

export default router;
