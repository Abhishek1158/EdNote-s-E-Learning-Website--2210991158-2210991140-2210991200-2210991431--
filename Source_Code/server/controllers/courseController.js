const Course = require("../models/Course");
// to get courses
exports.getCourses = async (req, res) => {
  try {
    const courses=await Course.find();
    res.json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};
// to get a single course
exports.getCourse = async (req, res) => {
  try {
    const course=await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ msg: "Course not found" });
    res.json(course);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};