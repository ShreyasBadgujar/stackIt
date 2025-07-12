import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import Notification from "../models/notification.js";

const notificationRouter = express.Router();

// Get all notifications for logged-in user
notificationRouter.get("/:questionId", authMiddleware, async (req, res) => {
  const notes = await Notification.find({ recipient: new mongoose.Types.ObjectId(req.userId) }).sort({ createdAt: -1 });
  res.json(notes);
});

// Mark as read
notificationRouter.patch("/:questionId/read", authMiddleware, async (req, res) => {
  await Notification.findByIdAndUpdate(req.params.id, { read: true });
  res.json({ success: true });
});

export default notificationRouter;
