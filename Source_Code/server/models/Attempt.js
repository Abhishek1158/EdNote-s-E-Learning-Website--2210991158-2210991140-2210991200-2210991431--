const mongoose = require("mongoose");
const AttemptSchema = new mongoose.Schema({
  userId: { type: String },
  courseId: String,
  topic: { type: String },
  question: { type: String },
  score: { type: Number },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model("Attempt", AttemptSchema);