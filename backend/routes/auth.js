import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import { getMe, login, register } from "../controllers/authController.js";



const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/me", authMiddleware, getMe);

export default userRouter;

