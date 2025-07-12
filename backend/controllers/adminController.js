import User from "../models/user.js";
import Question from "../models/questions.js"
import Answer from "../models/answer.js"
export const getAllUsers = async (req, res) => {
  const users = await User.find().select("-passwordHash");
  res.json(users);
};

export const banUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });

  user.role = user.role === "banned" ? "user" : "banned";
  await user.save();

  res.json({ message: `User is now ${user.role}` });
};

export const deleteQuestionByAdmin = async (req, res) => {
  const q = await Question.findById(req.params.id);
  if (!q) return res.status(404).json({ error: "Not found" });

  await q.deleteOne();
  res.json({ message: "Question deleted by admin" });
};

export const deleteAnswerByAdmin = async (req, res) => {
  const a = await Answer.findById(req.params.id);
  if (!a) return res.status(404).json({ error: "Not found" });

  await a.deleteOne();
  res.json({ message: "Answer deleted by admin" });
};
