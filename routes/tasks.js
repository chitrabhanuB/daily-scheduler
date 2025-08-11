const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const auth = require("../middleware/auth");

// Create a task (belongs to logged in user)
router.post("/", auth, async (req, res) => {
  try {
    const task = await Task.create({ ...req.body, userId: req.user });
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get tasks for logged in user
router.get("/", auth, async (req, res) => {
  try {
    const { completed } = req.query;
    const filter = { userId: req.user };
    if (completed !== undefined) {
      filter.completed = completed.toLowerCase() === "true";
    }


    const tasks = await Task.find(filter).sort({ deadline: 1, priority: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a task if it belongs to user
router.put("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user },
      req.body,
      { new: true, runValidators: true }
    );
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a task if it belongs to user
router.delete("/:id", auth, async (req, res) => {
  try {
    const deleted = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user });
    if (!deleted) return res.status(404).json({ error: "Task not found" });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
