import {
    handlerCreateUser,
    handlerDeleteUser,
    handlerGetAllUsers,
    handlerUpdateUser,
} from "#controllers/user.controller.js";
import express from "express";

const router = express.Router();

router.post("/", handlerCreateUser);
router.get("/", handlerGetAllUsers);
router.put("/", handlerUpdateUser);
router.delete("/:id", handlerDeleteUser);

export default router;
