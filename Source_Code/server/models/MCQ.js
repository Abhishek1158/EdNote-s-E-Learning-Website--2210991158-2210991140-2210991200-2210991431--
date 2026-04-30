const mongoose = require("mongoose");
const mcqSchema = new mongoose.Schema({
  question: String,
  options: [String],
  correctAnswer: Number
});
module.exports = mongoose.model("MCQ", mcqSchema);