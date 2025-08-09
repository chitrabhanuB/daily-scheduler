const express = require('express');
const mongoose = require('mongoose');
const Task = require('./models/Task'); // make sure this is correct path

require('dotenv').config();

async function start() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB Atlas');

    const app = express();
    app.use(express.json());

    // Test route
    app.get('/', (req, res) => res.send('Daily Scheduler API is running'));

    // --- GET all tasks ---
    app.get('/tasks', async (req, res) => {
      const tasks = await Task.find();
      res.json(tasks);
    });

    // --- POST create new task ---
    app.post('/tasks', async (req, res) => {
      const task = new Task(req.body);
      await task.save();
      res.status(201).json(task);
    });

    // --- PUT update task ---
    app.put('/tasks/:id', async (req, res) => {
      const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedTask);
    });

    // --- DELETE remove task ---
    app.delete('/tasks/:id', async (req, res) => {
      await Task.findByIdAndDelete(req.params.id);
      res.json({ message: 'Task deleted' });
    });

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server listening on http://localhost:${PORT}`));
  } catch (err) {
    console.error('❌ Failed to start', err);
    process.exit(1);
  }
}

start();
