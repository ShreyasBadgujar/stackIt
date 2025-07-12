import Answer from "../models/answer.js";
import Question from "../models/questions.js";

export const createAnswer = async (req, res) => {
  try {
    const { content } = req.body;
    const { questionId } = req.params;

    // Check if question exists
    const question = await Question.findById(questionId);
    if (!question) return res.status(404).json({ error: "Question not found" });

    const newAnswer = new Answer({
      content,
      questionId,
      userId: req.userId,
    });

    await newAnswer.save();
    res.status(201).json(newAnswer);
  } catch (err) {
    res.status(500).json({ error: "Failed to post answer" });
  }
};

export const getAnswersByQuestionId = async (req, res) => {
  try {
    const { questionId } = req.params;
    const answers = await Answer.find({ questionId })
      .populate("userId", "username")
      .sort({ createdAt: -1 });

    res.json(answers);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch answers" });
  }
};

export const deleteAnswer = async (req, res) => {
  try {
    const answer = await Answer.findById(req.params.id);
    if (!answer) return res.status(404).json({ error: "Answer not found" });

    if (answer.userId.toString() !== req.userId)
      return res.status(403).json({ error: "Unauthorized" });

    await answer.deleteOne();
    res.json({ message: "Answer deleted" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
};
