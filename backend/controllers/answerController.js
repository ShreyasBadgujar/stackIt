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


export const voteAnswer = async (req, res) => {
  try {
    const { voteType } = req.body;
    const userId = req.userId;
    const answerId = req.params.answerId;

    // ✅ Fetch the answer
    const answer = await Answer.findById(answerId);
    if (!answer) {
      console.log("Answer not found");
      return res.status(404).json({ error: "Answer not found" });
    }

    // ✅ Fix: Use .toString() when comparing ObjectId and string
    const hasVoted = answer.voters.some(
      (voterId) => voterId.toString() === userId
    );

    if (hasVoted) {
      console.log("Already voted");
      return res.status(400).json({ error: "You already voted" });
    }

    // ✅ Process vote
    if (voteType === "up") {
      answer.votes += 1;
    } else if (voteType === "down") {
      answer.votes -= 1;
    } else {
      console.log("Invalid voteType:", req.body.voteType);
      return res.status(400).json({ error: "Invalid vote type" });
    }

    answer.voters.push(userId);
    await answer.save();

    return res.status(200).json({
      message: "Vote recorded",
      votes: answer.votes,
    });
  } catch (err) {
    console.error("Error while voting:", err.message);
    return res.status(500).json({ error: "Vote failed due to server error" });
  }
};
