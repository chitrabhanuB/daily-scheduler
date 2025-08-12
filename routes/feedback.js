import express from "express";
import Feedback from "../models/Feedback.js";

const router = express.Router();

// POST feedback (no login required)
router.post("/", async (req, res) => {
  try {
    const { rating, comment } = req.body;

    // Validation
    if (!rating || !comment) {
      return res.status(400).json({ message: "All fields required" });
    }

    // Save feedback
    const feedback = new Feedback({
      rating,
      comment,
      date: new Date() // store timestamp automatically
    });

    await feedback.save();
    res.status(201).json({ message: "Feedback submitted successfully" });
  } catch (err) {
    console.error("❌ Error saving feedback:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
