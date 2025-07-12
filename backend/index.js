import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/auth.js";
import adminRouter from "./routes/admin.js";
import questionRouter from "./routes/questions.js";
import answerRouter from "./routes/answer.js";

// Load env
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes



app.use("/api/auth", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/questions", questionRouter);
app.use("/api/answers", answerRouter);




// DB Connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ Mongo Error:", err));

// Start server
app.listen(process.env.PORT, () => {
  console.log(`✅ Server running on port ${process.env.PORT}`);
});
