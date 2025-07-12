import express from "express";
import {
  createQuestion,
  getAllQuestions,
  getQuestionById,
  deleteQuestion
} from "../controllers/questionController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const questionRouter = express.Router();

questionRouter.post("/", authMiddleware, createQuestion);
questionRouter.get("/", getAllQuestions);
questionRouter.get("/:id", getQuestionById);
questionRouter.delete("/:id", authMiddleware, deleteQuestion);

export default questionRouter;
