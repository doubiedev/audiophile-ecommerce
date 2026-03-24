import { handlerLogin, handlerRefresh, handlerRevoke } from "#controllers/auth.controller.js";
import express from "express";

const router = express.Router();

// Public
router.post("/sessions", handlerLogin);
router.put("/sessions", handlerRefresh);
router.delete("/sessions", handlerRevoke);

export default router;
