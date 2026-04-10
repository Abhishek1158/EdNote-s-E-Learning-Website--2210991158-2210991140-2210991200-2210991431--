const express = require("express");
const router = express.Router();
const Flashcard = require("../models/Flashcard");
const updateFlashcards = require("../utils/spacedRepetition");
const auth = require("../middleware/auth");
// to create flashcards
router.post("/",  async (req, res) => {
  try {
    const { subject, question, answer,mastery } = req.body;
    const card = new Flashcard({ subject, question, answer, mastery });
    await card.save();
    res.json(card);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// to review cards
router.post("/review/:id", auth, async (req, res) => {
  try {
    const { quality } = req.body;
    const card = await Flashcard.findById(req.params.id);
    if (!card) return res.status(404).json({ message: "Flashcards not found" });
    updateFlashcards(card, quality);
    // increase in  review count
    card.reviewCount = (card.reviewCount || 0) + 1;
    await card.save();

    res.json(card);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.delete("/:id", auth, async (req, res) => {
  try {
    await Flashcard.findByIdAndDelete(req.params.id);
    res.json({ message: "Flashcard deleted successfully..." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;