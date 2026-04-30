const express = require("express");
const MCQ = require("../models/MCQ");
const Course = require("../models/Course");
const router = express.Router();
const Result = require("../models/ResultPMCQ");
router.post("/save", async (req, res) => {
  try {
    const result = new Result(req.body);
    await result.save();
    res.status(201).json({ message: "Saved" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// to get courses with lessons and mcqs
router.get("/courses", async (req, res) => {
  try {
    // fetch all courses
    const courses = await Course.find().lean();
    // particular course mcq
    const coursesLessons = await Promise.all(
      courses.map(async (course) => {
        const mcqs = await MCQ.find({ courseId: course._id }).lean();
        // group MCQs by lesson title
        const lessonsMap = {};
        mcqs.forEach((q) => {
          if (!lessonsMap[q.lesson]) lessonsMap[q.lesson] = [];
          lessonsMap[q.lesson].push({
            _id: q._id,
            question: q.question,
            options: q.options,
            correctAnswer: q.correctAnswer,
          });
        });
        // lessons array
        const lessons = Object.keys(lessonsMap).map((lessonTitle) => ({ title: lessonTitle, questions: lessonsMap[lessonTitle], }));
        return { _id: course._id, title: course.title, lessons, };
      })
    );
    res.json(coursesLessons);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});
// to get mcqcourse
router.get("/:courseId", async (req, res) => {
  const mcqs = await MCQ.find({ courseId: req.params.courseId });
  res.json(mcqs);
});
// for mcq adding
router.post("/", async (req, res) => {
  const mcq = new MCQ(req.body);
  await mcq.save();
  res.json(mcq);
});
// to get all the courses
router.get("/courses", async (req, res) => {
  try {
    const courses = await Course.find({});
    res.json(courses); // using res.json
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});
module.exports = router;