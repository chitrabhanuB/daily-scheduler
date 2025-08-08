// server.js
require('dotenv').config();
console.log('Loaded MONGO_URI:', process.env.MONGO_URI);

const express = require('express');
const mongoose = require('mongoose');

async function start() {
  try {
    await mongoose.connect(process.env.MONGO_URI); // minimal connect per Mongoose docs
    console.log('✅ Connected to MongoDB Atlas');

    const app = express();
    app.use(express.json());

    app.get('/', (req, res) => res.send('Daily Scheduler API is running'));

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
  } catch (err) {
    console.error('❌ Failed to start', err);
    process.exit(1);
  }
}
start();
