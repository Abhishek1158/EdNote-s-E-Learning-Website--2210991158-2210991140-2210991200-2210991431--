const mongoose = require("mongoose"); 
const progressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, required: true },
  completedLessons: [{ type: String }],
  quizScores: {
    type:[{
      lessonId:String,
      score:Number,
      total:Number,
      date:{type:Date, default:Date.now}
    }],
    default:[]
  }
});
module.exports = mongoose.model("Progress", progressSchema);