const mongoose = require("mongoose");
const ResultSchema = new mongoose.Schema({
  subject: String,
  score: Number,
  total: Number,
  percentage: Number,
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model( "Result", ResultSchema);