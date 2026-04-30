const mongoose = require("mongoose"); 
// note schema
const NoteSchema = new mongoose.Schema({ 
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" }, 
    lessonIndex: { type: Number, default:0 }, 
    text: {type:String},
    color: {
    type: String,
    default: "bg-blue-200"
  },
    pinned: { type: Boolean, default: false},
    timestamp: { type: Date, default: Date.now }, 
    }, 
    { timestamps: true }); 
module.exports = mongoose.model("Note", NoteSchema);