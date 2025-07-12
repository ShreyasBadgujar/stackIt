import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import isAdmin from "../middleware/isAdmin.js";
import {
  getAllUsers,
  banUser,
  deleteQuestionByAdmin,
  deleteAnswerByAdmin
} from "../controllers/adminController.js";

const adminRoute = express.Router();

router.get("/users", authMiddleware, isAdmin, getAllUsers);
router.patch("/users/:id/ban", authMiddleware, isAdmin, banUser);

router.delete("/questions/:id", authMiddleware, isAdmin, deleteQuestionByAdmin);
router.delete("/answers/:id", authMiddleware, isAdmin, deleteAnswerByAdmin);

export default adminRoute;
