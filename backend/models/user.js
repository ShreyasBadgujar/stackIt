import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  notifications: [{
    message: String,
    link: String,
    read: { type: Boolean, default: false }
  }]
}, { timestamps: true });

export default mongoose.model("User", UserSchema);
