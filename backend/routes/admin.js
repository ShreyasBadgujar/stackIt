import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import isAdmin from "../middleware/isAdmin.js";
import {
  getAllUsers,
  banUser,
  deleteQuestionByAdmin,
  deleteAnswerByAdmin
} from "../controllers/adminController.js";

const adminRouter = express.Router();

adminRouter.get("/users", authMiddleware, isAdmin, getAllUsers);
adminRouter.patch("/users/:id/ban", authMiddleware, isAdmin, banUser);

adminRouter.delete("/questions/:id", authMiddleware, isAdmin, deleteQuestionByAdmin);
adminRouter.delete("/answers/:id", authMiddleware, isAdmin, deleteAnswerByAdmin);

export default adminRouter;
