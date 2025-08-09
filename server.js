require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

async function start() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB Atlas');

    const app = express();

    // CORS setup - allow all origins (for now)
    app.use(cors({
      origin: "*", // allow all
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type"]
    }));

    app.use(express.json());

    // Routes
    app.get('/', (req, res) => res.send('Daily Scheduler API is running'));
    app.use('/tasks', require('./routes/tasks')); // if you have task routes

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server listening on http://localhost:${PORT}`));
  } catch (err) {
    console.error('❌ Failed to start', err);
    process.exit(1);
  }
}
start();
