import express from "express";
import Feedback from "../models/Feedback.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// POST feedback
router.post("/", auth, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    if (!rating || !comment) {
      return res.status(400).json({ message: "All fields required" });
    }

    const feedback = new Feedback({
      userId: req.user.id,
      rating,
      comment
    });

    await feedback.save();
    res.status(201).json({ message: "Feedback submitted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
