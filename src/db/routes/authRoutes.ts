import express from "express";

import { handlerLogin } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", handlerLogin);

export default router;
