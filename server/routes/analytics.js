const express = require("express");
const router = express.Router();
const Attempt = require("../models/Attempt");
// to fetch the course analytics
router.get("/course/:courseId/:userId", async (req, res) => {
  try {
    const {courseId,userId} = req.params;
    const stats = await Attempt.aggregate([ { $match: { courseId,userId }}, {$group: {_id: "$topic", attempts: {$sum: 1}, averageScore: {$avg: "$score"}, highestScore: { $max: "$score" } } }, { $sort: { averageScore: -1 }} ]);
    res.json(stats);
  } catch (err) { res.status(500).json({ error: err.message }); }
});
//  to save a quiz attempt
router.post("/attempt", async (req, res) => {
  try {
    const attempt = new Attempt(req.body);
    await attempt.save();
    res.json({ message: "Attempt saved successfully" });
  } catch (err) { res.status(500).json({ error: err.message }); }
});
// to get analytics 
router.get("/student", async (req, res) => {
  try {
    const userId = "demoUser"; // replace with JWT user in production
    const attempts = await Attempt.find({ userId });
    const Maptopic = {};  // topic wise performance average score per topic
    attempts.forEach((a) => {
      if (!Maptopic[a.topic]) Maptopic[a.topic] = [];
      Maptopic[a.topic].push(a.score);
    });
    const topicPerformance = Object.entries(Maptopic).map(([topic, scores]) => ({ topic, score: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) }));
    // trend of score - all attempts in order
    const scoretrend = attempts.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)).map((a, idx) => ({ attempt: idx + 1, score: a.score }));
    res.json({ topicPerformance, scoretrend });
  } catch (err) { res.status(500).json({ error: err.message }); }
});
module.exports = router;