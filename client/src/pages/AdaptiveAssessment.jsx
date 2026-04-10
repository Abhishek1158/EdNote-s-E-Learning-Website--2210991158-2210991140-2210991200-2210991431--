import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import API from "../services/api";

export default function AdaptiveAssessment() {
  const topics = [
    { id: 1, title: "Java Basics", difficulty: "Beginner" },
    { id: 2, title: "OOPS Concepts", difficulty: "Intermediate" },
    { id: 3, title: "Data Structures", difficulty: "Advanced" },
    { id: 4, title: "AI-ML", difficulty: "Beginner" },
  ];

  const questions = {
    1: [{
      question: "What is JVM?",
      options: ["Java Virtual Machine", "Java Variable Method", "Joint Virtual Mode", "None"],
      answer: "Java Virtual Machine"
    },
    {
      question: "Java is ",
      options: ["Compiled", "Interpreted", "Both", "None"],
      answer: "Both"
    },
    {
      question: "JDK stands for?",
      options: ["Java Deployment Kit", "Java Development Kit ", "Jupyter Development Kit", "None"],
      answer: "Java Development Kit"
    },
    {
      question: "Which keyword is used to create a class in Java?",
      options: ["int", "create", "class", "struct"],
      answer: "class"
    },
    {
      question: "Which one is used to handle exceptions?",
      options: ["for loop", "try-catch", "switch", "All of these"],
      answer: ["try-catch"]
    }
    ],
    2: [
      {
        question: "Which concept supports inheritance?",
        options: ["Encapsulation", "Polymorphism", "Class", "Extends"],
        answer: "Extends",
      },
      {
        question: "Which one is not OOPS concept",
        options: ["Abstraction", "Compilation", "Inheritance", "Encapsulation"],
        answer: "Compilation"
      },
      {
        question: "Which one is used to inherit a class",
        options: ["new", "inherits", "extends", "class"],
        answer: "extends"
      },
      {
        question: "Which of the following refers to parent class object",
        options: ["this", "super", "parent", "new"],
        answer: "super"
      },
      {
        question: "Which one belongs to runtime polymorphism",
        options: ["Method Overriding", "Method Overloading", "Static", "Constructor"],
        answer: "Method Overriding"
      }
    ],
    3: [
      {
        question: "Which of the following data structure uses FIFO?",
        options: ["Stack", "Queue", "Tree", "Graph"],
        answer: "Queue",
      },
      {
        question: "Which data structure follows LIFO?",
        options: ["Array", "Linked List", "Stack", "HashMap"],
        answer: "Stack"
      },
      {
        question: "Which data structure is used in recursion",
        options: ["Stack", "Queue", "String", "Array"],
        answer: "Stack"
      },
      {
        question: "Which of the following is used for dynamic memory allocation?",
        options: ["Linked List", "String", "Tree", "Queue"],
        answer: "Linked List"
      },
      {
        question: "Which of the following is used in priority scheduling?",
        options: ["Hashmap", "Heap", "Graphs", "Array"],
        answer: "Heap"
      },
      {
        question: "Which data structure is not linear?",
        options: ["String", "Tree", "Array", "Graphs"],
        answer: "Tree"
      }
    ],
    4: [{
      question: "What is Machine Learning",
      options: ["Mechanism of teaching machines by using explicit programming only", "AI subset that learn from data", "Database management technique", "None"],
      answer: "Mechanism of teaching machines by using explicit programming only",
    },
    {
      question: "Subset of AI is?",
      options:["Networking","Machine Learning","Database","None"],
      answer:"Machine Learning"
    },
    {
      question:"Which of the following algorithm is used for classification?",
      options:["K-Means","Linear Regression","PCA","Logistic Regression"],
      answer:"Logistic Regression"
    },
    {
      question:"Which learning uses labeled data?",
      options:["Supervised Learning","Deep Learning","Unsupervised Learning","Reinforcement Learning"],
      answer:"Supervised Learning"
    },
    {
      question:"Which library is used for Machine Learning?",
      options:["Pandas","Scikit-learn","Numpy","All of these"],
      answer:"All of these"
    }
    ],
  };

  const [currentTopicIndex, setCurrentTopicIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(null);
  const [unlockedTopics, setUnlockedTopics] = useState([1]);
  const [showAnalyticsCard, setShowAnalyticsCard] = useState(false);
  const [analyticsData, setAnalyticsData] = useState({
    topicPerformance: [],
    scoreTrend: [],
  });
  const currentTopic = topics[currentTopicIndex];
  const currentQuestions = questions[currentTopic.id];
  const currentQuestion = currentQuestions[currentQuestionIndex];
  const [weaknesses, setWeaknesses] = useState({});

  // Fetch analytics from backend
  const fetchAnalytics = async () => {
    try {
      const res = await API.get("/analytics/student");
      setAnalyticsData(res.data);
    } catch (err) { console.error(err); }
  };
  useEffect(() => {
    fetchAnalytics();
  }, []);

  const handleSubmit = async () => {
    if (!selectedOption) return alert("Please select an option..");

    const scoreValue = selectedOption === currentQuestion.answer ? 100 : 0;
    setScore(scoreValue);
    if (scoreValue === 0) {
      setWeaknesses((prev) => ({
        ...prev,
        [currentTopic.title]: prev[currentTopic.title] ? prev[currentTopic.title] + 1 : 1,
      }));
    }
    // save attempt
    try {
      await API.post("/analytics/attempt", {
        userId: "demoUser",
        topic: currentTopic.title,
        question: currentQuestion.question,
        score: scoreValue,
      });
    } catch (err) {
      console.error(err);
    }
    setSelectedOption("");
    // analysis after each submission
    fetchAnalytics();
    // proceed to next question 
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setScore(null);
    }

    else if (currentTopicIndex < topics.length - 1) {
      const nextTopic = topics[currentTopicIndex + 1];

      setUnlockedTopics((prev) =>
        prev.includes(nextTopic.id) ? prev : [...prev, nextTopic.id]
      );
      setCurrentTopicIndex((prev) => prev + 1);
      setCurrentQuestionIndex(0);
      setScore(null);
    }
    else {
      setShowAnalyticsCard(true);
    }
  };

  return (
    <div className="p-6 flex flex-col md:flex-row gap-6 bg-gray-400 min-h-screen">
      {/* Sidebar */}
      <div className="md:w-1/3 bg-white p-4 shadow rounded">
        <h2 className="font-bold text-lg mb-4">Learning Modules</h2>
        {topics.map((topic) => {
          const isUnlocked = unlockedTopics.includes(topic.id);
          const isActive = topic.id === currentTopic.id;
          return (
            <div
              key={topic.id}
              onClick={() =>
                isUnlocked && setCurrentTopicIndex(topics.indexOf(topic))
              }
              className={`p-3 mb-2 rounded cursor-pointer ${isActive
                ? "bg-blue-600 text-white font-semibold"
                : isUnlocked
                  ? "bg-green-500 text-black font-bold"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
            >
              {topic.title} ({topic.difficulty})
            </div>
          );
        })}
      </div>

      {/* Assessment + Live Analytics */}
      <div className="md:w-2/3 bg-white p-6 shadow rounded">
        <h2 className="text-xl font-bold mb-4">{currentTopic.title}</h2>

        <p className="mb-2 font-medium">{currentQuestion.question}</p>
        <p className="mb-4 font-medium">
          Question {currentQuestionIndex + 1} / {currentQuestions.length} in
          this topic
        </p>

        {currentQuestion.options.map((option, index) => (
          <div key={index} className="mb-2">
            <label>
              <input
                type="radio"
                name="option"
                value={option}
                checked={selectedOption === option}
                onChange={(e) => setSelectedOption(e.target.value)}
              />
              <span className="ml-2">{option}</span>
            </label>
          </div>
        ))}

        <button onClick={handleSubmit} className="mt-4 bg-green-600 text-white px-4 py-2 rounded" >
          Submit
        </button>

        {score !== null && (
          <div className="mt-4 font-semibold">
            Score: {score}%
            {score >= 70 ? (
              <p className="text-green-600">Correct </p>
            ) : (
              <p className="text-red-600">Incorrect </p>
            )}
          </div>
        )}

        {/* Live Analytics Preview */}
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-2">Live Performance Preview</h3>

          <div className="bg-gray-100 p-3 rounded mb-4">
            <ResponsiveContainer width="100%" height={150}>
              <BarChart data={analyticsData.topicPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="topic" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="score" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-gray-100 p-3 rounded">
            <ResponsiveContainer width="100%" height={150}>
              <LineChart data={analyticsData.scoreTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="attempt" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="score" stroke="#16a34a" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="mt-6 p-4 bg-yellow-100 border-l-4 border-orange-700 rounded shadow">
          <h3 className="font-bold text-lg mb-2">Weakness Detection</h3>
          {Object.keys(weaknesses).length === 0 ? (
            <p>Great job! No weak topics detected .</p>
          ) : (
            <p>
              You should focus on:{" "}
              <b>{Object.keys(weaknesses).join(", ")}</b>
            </p>
          )}
        </div>
        {Object.keys(weaknesses).length > 0 && (
          <button
            onClick={() => {
              const weakTopicIndex = topics.findIndex(
                (t) => t.title === Object.keys(weaknesses)[0]
              );
              setCurrentTopicIndex(weakTopicIndex);
              setCurrentQuestionIndex(0);
              setSelectedOption("");
              setScore(null);
              setShowAnalyticsCard(false);
            }}
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
          >
            Practice Weak Topic
          </button>
        )}
        {showAnalyticsCard && (
          <Link
            to="/analytics"
            className="mt-6 bg-blue-600 rounded-xl shadow hover:shadow-lg transition p-6 text-center text-white block"
          >
            <h3 className="text-xl font-bold mb-2">
              View Full Analytics Dashboard
            </h3>
            <p>See your performance trends and topic-wise scores in detail.</p>
          </Link>
        )}
      </div>
    </div>
  );
}