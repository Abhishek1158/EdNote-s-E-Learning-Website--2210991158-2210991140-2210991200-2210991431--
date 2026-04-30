const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  name:{ type: String, required: true },
  email:{ type: String, required: true, unique: true },
  password:{ type: String, required: true },
  progress:{
    courses: [ {
        courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
        completedLessons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lesson" }],
        completedMCQs: [{ type: mongoose.Schema.Types.ObjectId, ref: "MCQ" }]
      }
    ]
  }
});
module.exports = mongoose.model("User", UserSchema);