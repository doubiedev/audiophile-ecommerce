import { handlerLogin, handlerRefresh, handlerRevoke } from "#controllers/auth.controller.js";
import express from "express";

const router = express.Router();

router.post("/login", handlerLogin);
router.post("/refresh", handlerRefresh);
router.post("/revoke", handlerRevoke);

export default router;
