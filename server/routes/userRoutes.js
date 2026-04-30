const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const JWT_SECRET = process.env.JWT_SECRET || "secretkey";
// user register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      console.log("Missing fields");
      return res.status(400).json({ msg: "Please fill all  required fields" });
    }
    const exist = await User.findOne({ email });
    if (exist) {
      console.log("User already exists");
      return res.status(400).json({ msg: "User already exists" });
    }
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashed });
    await user.save();
    console.log("User saved:", user);
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    console.log("Token generated:", token);
    res.json({ token });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});
//user login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid details" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid details" });
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});
// to update progress
router.post("/progress", authMiddleware, async (req, res) => {
  const { courseId, lessonId, mcqId } = req.body;
  const user = await User.findById(req.user.id);
  let courseProgres = user.progress.courses.find(c => c.courseId.equals(courseId));
  if (!courseProgres) {
    courseProgres = { courseId, completedLessons: [], completedMCQs: [] };
    user.progress.courses.push(courseProgres);
  }
  if (lessonId && !courseProgres.completedLessons.includes(lessonId)) {
    courseProgres.completedLessons.push(lessonId);
  }
  if (mcqId && !courseProgres.completedMCQs.includes(mcqId)) {
    courseProgres.completedMCQs.push(mcqId);
  }
  await user.save();
  res.json({ message: "Progress updated", progress: user.progress });
});
// to get course progress
router.get("/progress/:courseId", authMiddleware, async (req, res) => {
  const user = await User.findById(req.user.id);
  const courseProgres = user.progress.courses.find(c => c.courseId.equals(req.params.courseId)) || {};
  res.json(courseProgres);
});
module.exports = router;