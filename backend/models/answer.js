import mongoose from "mongoose";

const AnswerSchema = new mongoose.Schema({
  questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  description: String,
  votes: { type: Number, default: 0 },
  accepted: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model("Answer", AnswerSchema);
