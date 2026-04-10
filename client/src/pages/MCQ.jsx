import { useState, useEffect } from "react";
import API from "../services/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function MCQ() {
  const subjects = [
    {
      name: "JavaScript",
      questions: [
        {
          question: "Which keyword declares a variable?",
          options: ["var", "int", "define", "string"],
          correctAnswer: 0,
        },
        {
          question: "Which method parses JSON?",
          options: ["JSON.parse()", "JSON.stringify()", "JSON.convert()", "JSON.object()",],
          correctAnswer: 0,
        },
      ],
    },
    {
      name: "React",
      questions: [
        {
          question: "Which hook manages state?",
          options: ["useEffect", "useState", "useRef", "useMemo"],
          correctAnswer: 1,
        },
        {
          question: "React is built on which language?",
          options: ["Python", "Java", "JavaScript", "C++"],
          correctAnswer: 2,
        },
      ],
    },
    {
      name: "Node.js",
      questions: [
        {
          question: "Node.js runs on which engine?",
          options: ["SpiderMonkey", "V8", "Chakra", "Rhino"],
          correctAnswer: 1,
        },
        {
          question: "Which module handles file system?",
          options: ["http", "fs", "path", "os"],
          correctAnswer: 1,
        },
      ],
    },
    {
      name: "Database (MongoDB)",
      questions: [
        {
          question: "MongoDB stores data as?",
          options: ["Tables", "Documents", "Rows", "Graphs"],
          correctAnswer: 1,
        },
        {
          question: "Which command inserts data?",
          options: ["insertOne()", "add()", "push()", "create()"],
          correctAnswer: 0,
        },
      ],
    },
    {
      name: "Data Structures",
      questions: [
        {
          question: "Which is LIFO?",
          options: ["Queue", "Stack", "Array", "Tree"],
          correctAnswer: 1,
        },
        {
          question: "Which structure uses FIFO?",
          options: ["Stack", "Tree", "Queue", "Graph"],
          correctAnswer: 2,
        },
      ],
    },
  ];

  const [currentSubjectIndex, setCurrentSubjectIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [results, setResults] = useState([]);
  const [quizFinished, setQuizFinished] = useState(false);
  const [subjectCompleted, setSubjectCompleted] = useState(false);
  const [streak, setStreak] = useState(0);
  const currentSubject = subjects[currentSubjectIndex];
  const questions = currentSubject?.questions;
  const currentQuestion = questions?.[currentQuestionIndex];


  // Timer
  useEffect(() => {
    if (!quizFinished && !subjectCompleted) {
      if (timeLeft === 0) {
        handleNext();
        return;
      }
      const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, quizFinished, subjectCompleted]);


  const handleAnswer = (index) => {
    if (answers[currentQuestionIndex] !== undefined) return;

    const isCorrect = index === currentQuestion.correctAnswer;

    setAnswers((prev) => ({ ...prev, [currentQuestionIndex]: index }));
    if (isCorrect) {
      setScore((prev) => prev + 1);
      setStreak((prev) => prev + 1);
    } else {
      setStreak(0);
    }

  };

  const handleNext = async () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setTimeLeft(30);
    } else {
      // Save current subject result
      const percentage = ((score / questions.length) * 100).toFixed(1);
      const subjectResult = {
        subject: currentSubject.name,
        score,
        total: questions.length,
        percentage: Number(percentage),
      };

      try {
        await API.post("/mcq/save", subjectResult);
        console.log("Result saved...");
      } catch (err) {
        console.error("Result not saved");
      }

      setResults((prev) => [...prev, subjectResult]);
      setSubjectCompleted(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      setTimeLeft(30);
    }
  };

  const handleNextSubject = () => {
    setCurrentSubjectIndex((prev) => prev + 1);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setScore(0);
    setTimeLeft(30);
    setSubjectCompleted(false);
  };


  // Final Dashboard
  if (quizFinished) {
    const totalScore = results.reduce((s, r)=>s+r.score, 0);
    const totalQuestions = results.reduce((s, r)=>s+r.total, 0);
    const overallPercentage = ((totalScore / totalQuestions) * 100).toFixed(1);

    const weakSubject = results.reduce((prev, current) => prev.percentage < current.percentage ? prev : current);

    return (
      <div className="p-6 max-w-5xl mx-auto min-h-screen bg-gray-100">
        <h2 className="text-3xl font-bold mb-6 text-center">
           Final Performance Dashboard
        </h2>

        {/* Bar Chart */}
        <div className="bg-white p-6 rounded shadow mb-6">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={results}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="subject" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="percentage" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Dashboard */}
        <div className="bg-white p-6 rounded shadow">
          {results.map((r, i) => (
            <div key={i} className="mb-3 border-b pb-2">
              <h3 className="font-bold">{r.subject}</h3>
              <p className="text-1xl font-semibold" >Score: {r.score}/{r.total}</p>
              <p className="text-green-600 font-bold">{r.percentage}%</p>
            </div>
          ))}

          <hr className="my-4" />
          <h3 className="text-xl font-bold">
            Overall Score: {totalScore}/{totalQuestions}
          </h3>
          <p className="text-blue-600 font-bold text-lg">
            Overall Percentage: {overallPercentage}%
          </p>

          <p className="text-orange-600 font-bold text-xl"> Full Correct Score: {streak}</p>

        </div>

        <div className="mt-6 p-4 bg-yellow-200 border-l-4 border-orange-700 rounded">
        
          <p>You should practice <b>{weakSubject.subject}</b> again.</p>
          <p className="text-sm text-gray-800">Your score in this topic was {weakSubject.percentage}%.</p>
        </div>
      </div>
    );
  }

  const percentage = ((score / questions.length) * 100).toFixed(1);

  return (
    <div className="p-6 max-w-3xl mx-auto min-h-screen bg-gray-100 transition-opacity duration-500">
      <h2 className="text-2xl font-bold mb-4">Subject: {currentSubject.name}</h2>

      {/* Progress Bar */}
      <div className="w-full bg-gray-300 rounded-full h-4 mb-4">
        <div
          className="bg-blue-600 h-4 rounded-full transition-all duration-500"
          style={{ width: `${(timeLeft / 30) * 100}%` }}
        ></div>
      </div>

      <p>
        Question {currentQuestionIndex + 1} of {questions.length}
      </p>
      <p className="text-red-600 font-bold mb-3">Time Left: {timeLeft}s</p>

      <div className="bg-white p-6 rounded shadow">
        <p className="mb-4">{currentQuestion.question}</p>

        {currentQuestion.options.map((opt, i) => {
          const isSelected = answers[currentQuestionIndex] === i;
          const correct = i === currentQuestion.correctAnswer;
          const showCorrect = subjectCompleted || isSelected;
          return (
            <button
              key={i}
              className={`block w-full p-3 mb-2 border rounded ${showCorrect
                ? correct
                  ? "bg-green-100 border-green-500"
                  : isSelected
                    ? "bg-red-100 border-red-500"
                    : ""
                : "hover:bg-gray-100"
                }`}
              onClick={() => handleAnswer(i)}
              disabled={answers[currentQuestionIndex] !== undefined || subjectCompleted} >
              {opt}
              {showCorrect && isSelected && (correct ? " ✓" : " ✗")}
            </button>
          );
        })}
        <div className="mt-4 flex justify-between">
          <button onClick={handlePrevious} disabled={currentQuestionIndex === 0 || subjectCompleted} className="bg-gray-600 text-white px-4 py-2 rounded disabled:opacity-50" >
            Previous
          </button>

          {!subjectCompleted && answers[currentQuestionIndex] !== undefined && (
            <button onClick={handleNext} className="bg-blue-600 text-white px-4 py-2 rounded" >
              Next
            </button>
          )}

          {subjectCompleted && currentSubjectIndex < subjects.length - 1 && (
            <button onClick={handleNextSubject} className="bg-green-600 text-white px-4 py-2 rounded" >
              Next Subject
            </button>
          )}

          {subjectCompleted && currentSubjectIndex === subjects.length - 1 && (
            <button onClick={() => setQuizFinished(true)} className="bg-purple-600 text-white px-4 py-2 rounded" >
              Finish Quiz
            </button>
          )}
        </div>

        {/* Score and percentage that shown below question */}
        <div className="mt-4">
          <p className="font-bold">Score: {score}/{questions.length}</p>
          <p className="font-bold text-green-600">Percentage: {percentage}%</p>
        </div>
      </div>
    </div>
  );
}