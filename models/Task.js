
// models/Task.js
const mongoose = require("mongoose");

const reminderSchema = new mongoose.Schema({
  when: Date,
  method: { type: String, enum: ["email", "sms", "push"], default: "email" }
}, { _id: false });

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  deadline: { type: Date },
  priority: { type: String, enum: ["Low", "Medium", "High"], default: "Medium" },
  completed: { type: Boolean, default: false },
  reminders: [reminderSchema], // optional array for reminders
  userId: { type: String }     // optional, for multi-user support later
}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);