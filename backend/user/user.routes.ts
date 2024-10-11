import express from "express";
import userController from "./user.controller";
import protect from "../middleware/auth.middleware";

const router = express.Router();

router.get("/", protect, userController.getUser);
router.post("/", userController.registerUser);
router.post("/login", userController.loginUser);

export default router;
