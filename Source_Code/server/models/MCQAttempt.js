const mongoose = require("mongoose");
const AttemptMCQSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  questionId: { type: mongoose.Schema.Types.ObjectId, ref: "MCQ" },
  selectedAnswer: Number,
  isCorrect: Boolean,
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model("MCQAttempt", AttemptMCQSchema);