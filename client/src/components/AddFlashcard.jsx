import React, { useState } from "react";
import axios from "axios";
function AddFlashcard({ onAdded }) {
  const [subject, setSubject] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5001/api/flashcards",
        { subject, question, answer },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSubject("");
      setQuestion("");
      setAnswer("");
      setSuccess(true);

      setTimeout(() => setSuccess(false), 2000);

      onAdded();
    } catch (err) {
      console.error("Error adding flashcard:", err);
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-2xl shadow-lg mb-8 border border-gray-300">
      <h3 className="text-xl font-bold mb-4 text-gray-700 dark:text-white">
       Create New Flashcard
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Subject (React, DBMS, JS...)"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
          required
        />
        <textarea
          placeholder="Question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
          rows="2"
          required
        />
        <textarea
          placeholder="Answer..."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
          rows="2"
          required
        />
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition">
          Add Flashcard
        </button>
        {success && ( <p className="text-green-600 text-center font-semibold mt-2 animate-pulse">Flashcard Added!</p> )}
      </form>
    </div>
  );
}

export default AddFlashcard;