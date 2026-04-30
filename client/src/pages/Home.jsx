import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

export default function Home() {

  const [summary, setSummary] = useState(null);
  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await API.get("/analytics/student");
        const topicPerformance = res.data.topicPerformance;
        if (topicPerformance.length > 0) {
          const avg = topicPerformance.reduce((a, b) => a + b.score, 0) / topicPerformance.length;
          const strongTopic = topicPerformance.reduce((prev, current) => prev.score > current.score ? prev : current);
          setSummary({ average: avg.toFixed(1), strong: strongTopic.topic, totalTopics: topicPerformance.length, });
        }
      } catch (err) { console.error(err); }
    };
    fetchSummary();
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#191970]  to-[#102C26]">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#191970] to-[#102C26] text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center ">
          <h1 className="text-4xl md:text-5xl font-bold mb-6"> Learn Smarter with EdNote's Adaptive Learning System </h1>
          <p className="text-lg opacity-100 max-w-2xl font-semibold mx-auto">A personalized learning platform that adapts to student performance, analyzes progress, and provides personalized assessments. The system also includes an interactive flashcards module that reinforces key concepts through spaced repetition, tracks mastery levels.
          </p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 py-1">
        <img src="/images/Edhome.png" alt="Home" className="mx-auto border" />
      </div>
      <div className="max-w-6xl mx-auto px-6 py-6 text-center text-white">
        <h2 className="text-3xl font-bold mb-7">Why EdNote's?</h2>
        <p className="max-w-2xl mx-auto opacity-90">
          Unlike traditional platforms — it understands how you learn.
          Every quiz, note, and flashcard is designed to recall topics and help to learn faster, all in one space.
        </p>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-6 grid md:grid-cols-3 gap-8 text-center">
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-bold text-lg mb-2">1. Learn</h3>
          <p>Learning with notes, MCQs, or adaptive assessments.</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-bold text-lg mb-2">2. Analyze</h3>
          <p>Performance is tracked to identify strengths and weakness.</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-bold text-lg mb-2">3. Improve</h3>
          <p>Practice with flashcards to master topics.</p>
        </div>
      </div>
      <div className="text-center py-10">
        <Link to="/adaptive-assessment" className="bg-yellow-400 px-6 py-3 rounded-xl font-bold hover:bg-yellow-500" > Start Learning Here.... </Link>
      </div>
      {summary && (
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl  mt-5 text-center">
          <h2 className="text-3xl font-bold mb-2">Your Learning Summary</h2>
          <p className="font-semibold"> <span className="font-bold">A.</span> Average Score: {summary.average} %</p>
          <p className="font-semibold"> <span className="font-bold">B.</span> Strongest Topic: {summary.strong}</p>
          <p className="font-semibold"> <span className="font-bold">C.</span> Topics Attempted: {summary.totalTopics}</p>
        </div>
      )}

      {/* features section */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Adaptive Learning */}
        <Link to="/adaptive-assessment" className="bg-white rounded-xl  p-6 text-center">
          <img src="/images/Adaptive Assessment.png" alt="Adaptive Assessment" className="h-20 mx-auto mb-4 rounded-3xl" />
          <h3 className="text-xl font-bold mb-2">Adaptive Assessment</h3>
          <p className="text-gray-700"> Dynamic question difficulty based on student performance.</p>
        </Link>
        {/* MCQs section */}
        <Link to="/mcq" className="bg-white rounded-xl  p-6 text-center">
          <img src="/images/Learning Mcq.png" alt="MCQ Practice.." className="h-20 mx-auto mb-4 rounded-3xl" />
          <h3 className="text-xl font-bold mb-2">Learning MCQ'S</h3>
          <p className="text-gray-700">Test your knowledge with interactive MCQs.</p>
        </Link>
        {/* analytic section */}
        <Link to="/analytics" className="bg-white rounded-xl  p-6 text-center">
          <img src="/images/Learning Analytics.png" alt="Analytics.." className="h-20 mx-auto mb-4 rounded-3xl" />
          <h3 className="text-xl font-bold mb-2">Learning Analytics</h3>
          <p className="text-gray-700"> Visualize performance trends and competency levels.</p>
        </Link>
        {/* smart-notes section */}
        <Link to="/notes" className="bg-white rounded-xl  p-6 text-center">
          <img src="/images/Smart Notes.png" alt="Notes" className="h-20 mx-auto mb-4 rounded-3xl" />
          <h3 className="text-xl font-bold mb-2">Smart Notes</h3>
          <p className="text-gray-700">Create structured, save, and revise notes anytime.</p>
        </Link>
        {/* flashcard section */}
        <Link to="/flashcards" className="bg-white rounded-xl  p-6 text-center">
          <img src="/images/flashcard.webp" alt="FlashCards" className="h-20 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Flashcards</h3>
          <p className="text-gray-700">Reinforce learning with spaced repetition.</p>
        </Link>
      </div>
    </div>
  );
}