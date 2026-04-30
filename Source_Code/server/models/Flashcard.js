const mongoose = require('mongoose');
// falshcard schema
const FlashcardsSchema = new mongoose.Schema({
  userId: { type: String },
  subject: { type: String, required: true  },
  question: { type: String, required: true },
  answer: { type: String, required: true },
  mastery: { type: Number },
  interval: { type: Number, default: Math.random },
  nextReview: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Flashcard', FlashcardsSchema);