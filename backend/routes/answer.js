import express from "express";
import {
  createAnswer,
  getAnswersByQuestionId,
  deleteAnswer,
  voteAnswer,
  acceptAnswer
} from "../controllers/answerController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const answerRouter = express.Router();

// POST /api/answers/:questionId
answerRouter.post("/:questionId", authMiddleware, createAnswer);

// GET /api/answers/:questionId
answerRouter.get("/:questionId", getAnswersByQuestionId);

// DELETE /api/answers/delete/:id
answerRouter.delete("/delete/:id", authMiddleware, deleteAnswer);

answerRouter.patch("/:answerId/vote", authMiddleware, voteAnswer);

answerRouter.patch("/:answerId/accept", authMiddleware, acceptAnswer);


export default answerRouter;
