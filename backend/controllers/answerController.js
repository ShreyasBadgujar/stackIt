import Answer from "../models/answer.js";
import Question from "../models/questions.js";
import Notification from "../models/notification.js";

export const createAnswer = async (req, res) => {
  try {
    const { description } = req.body;
    const { questionId } = req.params;
    const userId = req.userId;

    const question = await Question.findById(questionId);
    if (!question) return res.status(404).json({ error: "Question not found" });

    const newAnswer = new Answer({
      questionId,
      userId,
      description
    });

    await newAnswer.save();

    if (question.userId.toString() !== userId) {
      await Notification.create({
        recipient: question.userId,
        type: "answer",
        message: `Someone answered your question: ${question.title}`,
        link: `/questions/${question._id}`,
      });
    }

    res.status(201).json(newAnswer);
  } catch (err) {
    console.error("Error posting answer:", err.message);
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

export const voteAnswer = async (req, res) => {
  try {
    const { voteType } = req.body;
    const userId = req.userId;
    const answerId = req.params.answerId;

    const answer = await Answer.findById(answerId);
    if (!answer) return res.status(404).json({ error: "Answer not found" });

    const hasVoted = answer.voters.some(
      (voterId) => voterId.toString() === userId
    );
    if (hasVoted)
      return res.status(400).json({ error: "You already voted" });

    if (voteType === "up") {
      answer.votes += 1;
    } else if (voteType === "down") {
      answer.votes -= 1;
    } else {
      return res.status(400).json({ error: "Invalid vote type" });
    }

    answer.voters.push(userId);
    await answer.save();

    res.status(200).json({ message: "Vote recorded", votes: answer.votes });
  } catch (err) {
    console.error("Error while voting:", err.message);
    res.status(500).json({ error: "Vote failed due to server error" });
  }
};

export const acceptAnswer = async (req, res) => {
  try {
    const answer = await Answer.findById(req.params.answerId);
    if (!answer) return res.status(404).json({ error: "Answer not found" });

    const question = await Question.findById(answer.questionId);
    if (!question) return res.status(404).json({ error: "Question not found" });

    if (question.userId.toString() !== req.userId)
      return res.status(403).json({ error: "Only question owner can accept answers" });

    await Answer.updateMany(
      { questionId: question._id },
      { $set: { accepted: false } }
    );

    answer.accepted = true;
    await answer.save();

    res.json({ message: "Answer marked as accepted", answerId: answer._id });
  } catch (err) {
    console.error("Accept answer error:", err);
    res.status(500).json({ error: "Could not accept answer" });
  }
};
