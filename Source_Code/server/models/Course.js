const mongoose = require("mongoose");
// course schema
const SlideSchema = new mongoose.Schema({
  title: String,
  content: String,
  image: String,
});
const QuizSchema = new mongoose.Schema({
  question: String,
  options: [String],
  answer: String,
});
const LessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: {type: String},
  slides: [SlideSchema],
  quiz: [QuizSchema],
});
const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String },
  lessons: [LessonSchema],
});
module.exports = mongoose.model("Course", CourseSchema);