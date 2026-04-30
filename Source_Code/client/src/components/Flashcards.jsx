import React, { useState } from "react";
// colors according to subject
const subjectColors = { React: "bg-blue-500", DBMS: "bg-red-500", JavaScript: "bg-yellow-500",
  default: "bg-gray-400",
};
function Flashcards() {
  const [cards, setCards] = useState([
    {
      _id: 1,
      subject: "React",
      question: "What is JSX?",
      answer: "JSX is a syntax extension for React that looks like HTML.",
      mastery: 70,
    },
    {
      _id: 2,
      subject: "DBMS",
      question: "What is a primary key?",
      answer: "A primary key uniquely identifies each row in a table.",
      mastery: 50,
    },
    {
      _id: 3,
      subject: "JavaScript",
      question: "What is closure?",
      answer: "A closure is a function that has access to its outer scope even after the outer function has returned.",
      mastery: 30,
    },
    {
      _id: 4,
      subject: "Python",
      question: "What is a lambda function?",
      answer: "A lambda is an anonymous, single-line function in Python.",
      mastery: 60,
    },
    {
      _id: 5,
      subject: "HTML",
      question: "What does `<div>` do?",
      answer: "It tells about a division in an HTML document.",
      mastery: 80,
    },
     {
      _id: 6,
      subject: "CSS",
      question: "What is flexbox?",
      answer: "Flexbox is a layout model that is for aligning items in a container.",
      mastery: 30,
    },
    {
      _id: 7,
      subject: "Algorithms",
      question: "What is Big O notation?",
      answer: "Big O notation tells about the worst-case complexity of an algorithm.",
      mastery: 20,
    },
    {
      _id: 8,
      subject: "AIML",
      question: "What are the types of AI agents?",
      answer: "1. Simple REflex, 2. Model-Based, 3. Goal Based, 4.Utility-Based ",
      mastery: 30,
    },
    {
      _id: 9,
      subject: "JAVA",
      question: "What do you mean by Interfaces in java?",
      answer: "Interfaces define method signatures without implemetations.",
      mastery: 40,
    },
    {
      _id: 10,
      subject: "JAVA",
      question: "Exception Handling in java?",
      answer: "Mechanism  that handle runtime errors and ensuring program to run smoothly.",
      mastery: 30,
    },
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const current = cards[currentIndex];
  const subjectClass = subjectColors[current.subject] || subjectColors.default;

  // Navigation
  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % cards.length);
    setFlipped(false);
  };
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
    setFlipped(false);
  };

  const handleReview = (quality) => {
    const updatedCards = [...cards];
    updatedCards[currentIndex].mastery = quality * 20;
    setCards(updatedCards);
    handleNext();
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <div className="flex justify-between items-center mb-2">
        <span className={`px-3 py-1 rounded-full text-white text-sm ${subjectClass}`} >
          {current.subject}
        </span>
        <span className="text-black dark:text-gray-300 text-sm">
          Mastery: {current.mastery}%
        </span>
      </div>

      {/* card container */}
      <div className="relative w-full h-60 mb-4 perspective cursor-pointer" onClick={() => setFlipped(!flipped)}>
        <div className="absolute w-full h-full transition-transform duration-700" style={{ transformStyle: "preserve-3d", transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }} >
          {/* front side question */}
          <div
            className="absolute w-full h-full bg-white dark:bg-gray-800 rounded-xl shadow-xl flex flex-col justify-center items-center text-center p-6 backface-hidden hover:scale-105 transform transition-transform"
            style={{ backfaceVisibility: "hidden" }} >
            <h3 className="text-xl font-bold mb-2">{current.question}</h3>
            <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full mt-4">
              <div className="bg-blue-500 h-2 rounded-full transition-all" style={{ width: `${current.mastery}%` }} ></div>
            </div>
          </div>

          {/* back side answer */}
          <div
            className="absolute w-full h-full bg-gray-100 dark:bg-gray-700 rounded-xl shadow-xl flex flex-col justify-center items-center text-center p-6 backface-hidden transform rotate-y-180 hover:scale-105 transition-transform" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }} >
            <h3 className="text-xl font-bold mb-2">{current.answer}</h3>
            <p className="mt-4 text-gray-500 dark:text-gray-300 text-sm">
              Rate your recall:
            </p>
            <div className="flex gap-2 mt-2">
              {[0, 1, 2, 3, 4, 5].map((q) => (
                <button key={q} onClick={() => handleReview(q)} className="bg-green-500 text-white px-3 py-1 rounded hover:scale-110 transition">
                 {q}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* button to navigate */}
      <div className="flex justify-between items-center mt-4">
        <button onClick={handlePrev} className="bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition" >
          Prev
        </button>
        <button onClick={handleNext} className="bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition" >
          Next
        </button>
      </div>
    </div>
  );
}
export default Flashcards;