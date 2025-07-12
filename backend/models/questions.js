
import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  tags: [String],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

export default mongoose.model("Question", QuestionSchema);
