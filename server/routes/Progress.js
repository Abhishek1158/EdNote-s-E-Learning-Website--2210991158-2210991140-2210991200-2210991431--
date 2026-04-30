const express = require("express");
const Progress = require("../models/Progress");
const Course = require("../models/Course");
const router = express.Router();
// saving the progress
router.post("/save", async (req, res) => {
  try {
    const { userId, courseId, completedLessons } = req.body;
    let progress = await Progress.findOne({ userId, courseId });
    if (progress){
      progress.completedLessons=completedLessons;
      await progress.save();
    }
    else progress = await Progress.create({ userId, courseId, completedLessons, quizScores: [] });
    res.json(progress);
  } catch (err){
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});
// saving score of quiz
router.post("/quiz", async (req, res) => {
  try {
    const { userId, courseId, lessonId, score, total } = req.body;
    const progress = await Progress.findOne({ userId, courseId });
    if (!progress) return res.status(404).json({ message: "Progress not found" });
    if (!progress.quizScores) progress.quizScores = [];
    progress.quizScores.push({ lessonId, score, total });
    await progress.save();
    res.json(progress);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});
// to get progress
router.get("/analytics/:userId/:courseId", async (req, res) => {
  try {
    const { userId, courseId } = req.params;
    const progress = await Progress.findOne({ userId, courseId });
    if (!progress) return res.status(404).json({ message: "There is no progress.." });
    // course detail
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "No course found.." });
    // to show calculation of progress
    const totalLessons = course.totalLessons || 0;
    const completedLessons = progress.completedLessons.length;
    const percent = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;
    const totalQuiz = progress.quizScores.length;
    const totalScore = progress.quizScores.reduce((s, q) => s + q.score, 0);
    const totalPoss = progress.quizScores.reduce((s, q) => s + q.total, 0);
    const avgScore = totalQuiz > 0 && totalPoss > 0 ? (totalScore / totalPoss) * 100 : 0;
    res.json({ courseId: course._id, courseTitle: course.title, percent: Number(percent.toFixed(0)), totalQuiz, avgScore: Number(avgScore.toFixed(2)) });
  }
  catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;