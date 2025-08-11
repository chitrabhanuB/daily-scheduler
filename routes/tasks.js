// routes/tasks.js
const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const authMiddleware = require("../middleware/authMiddleware"); // Import JWT middleware

// Create a new task (protected)
router.post("/", authMiddleware, async (req, res) => {
  try {
    // Attach the logged-in user's ID automatically
    const taskData = { ...req.body, userId: req.user.id };
    const task = await Task.create(taskData);
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all tasks for logged-in user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const { completed } = req.query;
    const filter = { userId: req.user.id }; // Always filter by current user
    if (completed !== undefined) filter.completed = completed === "true";

    const tasks = await Task.find(filter).sort({ deadline: 1, priority: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get one task by ID (must belong to user)
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, userId: req.user.id });
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a task by ID (must belong to user)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a task by ID (must belong to user)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deleted = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!deleted) return res.status(404).json({ error: "Task not found" });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
