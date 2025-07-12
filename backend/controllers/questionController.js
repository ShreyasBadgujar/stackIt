import Question from "../models/questions.js";

export const createQuestion = async (req, res) => {
  try {
    const { title, description, tags } = req.body;
    const newQuestion = new Question({
      title,
      description,
      tags,
      userId: req.userId,
    });
    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (err) {
    res.status(500).json({ error: "Failed to create question" });
  }
};

export const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find()
      .populate("userId", "username")
      .sort({ createdAt: -1 });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: "Failed to get questions" });
  }
};

export const getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id).populate("userId", "username");
    if (!question) return res.status(404).json({ error: "Not found" });
    res.json(question);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch question" });
  }
};


export const myQuestions = async(req,res) => {

  
  try {
    const questions = await Question.find({ userId: req.userId }).sort({ createdAt: -1 }).populate("userId", "username");
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch your questions" });
  }


}

export const deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).json({ error: "Not found" });
    if (question.userId.toString() !== req.userId)
      return res.status(403).json({ error: "Unauthorized" });

    await question.deleteOne();
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
};
