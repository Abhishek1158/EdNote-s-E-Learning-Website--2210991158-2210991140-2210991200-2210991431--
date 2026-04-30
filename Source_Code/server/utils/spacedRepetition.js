function updateFlashcards(card, quality) {
  // quality: 0–5 (user rating of recall)

  if (quality < 3) {
    card.repetition = 0;
    card.interval = 1;
  } else {
    card.repetition += 1;

    if (card.repetition === 1) {
      card.interval = 1;
    } else if (card.repetition === 2) {
      card.interval = 6;
    } else {
      card.interval = Math.round(card.interval * card.easeFactor);
    }
  }

  card.easeFactor = Math.max( 1.3, card.easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)) );
  card.masteryLevel = Math.min(100, card.masteryLevel + quality * 5);

  const nextReview = new Date();
  nextReview.setDate(nextReview.getDate() + card.interval);
  card.nextReview = nextReview;

  return card;
}
module.exports = updateFlashcards;