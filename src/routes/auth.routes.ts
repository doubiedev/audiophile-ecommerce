import { handlerLogin, handlerRefresh, handlerRevoke } from "#controllers/auth.controller.js";
import express from "express";

const router = express.Router();

// Public
router.post("/login", handlerLogin);
router.post("/refresh", handlerRefresh);
router.post("/revoke", handlerRevoke);

export default router;
