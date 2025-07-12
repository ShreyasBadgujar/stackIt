import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/auth.js";
import adminRoute from "./routes/admin.js";

// Load env
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes



app.use("/api/auth", userRouter);
app.use("/api/admin", adminRoute);



// DB Connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ Mongo Error:", err));

// Start server
app.listen(process.env.PORT, () => {
  console.log(`✅ Server running on port ${process.env.PORT}`);
});
