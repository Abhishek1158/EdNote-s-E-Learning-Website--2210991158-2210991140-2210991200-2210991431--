import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
export default function CourseAnalytics() {
  const [data, setData] = useState([]);
  const [trend, setTrend] = useState([]);
  const { courseId } = useParams();
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5001/api/analytics/course/${courseId}/demoUser`
        );
        // current backend returns an array:
        const backendData = res.data;
        // Map to required format for charts
        const topicPerformance = backendData.map((item) => ({
          topic: item._id,
          score: item.averageScore
        }));
        //  array of score per attempt
        const scoreTrend = backendData.map((item, idx) => ({
          attempt: idx + 1,
          score: item.averageScore
        }));
        setData(topicPerformance);
        setTrend(scoreTrend);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAnalytics();
  }, [courseId]);
  // Weak lesson that having average score < 50
  const weakLessons = data.filter((item) => item.score < 50);
  // Overall average of lessons
  const overallAverage = data.length > 0 ? Math.round(data.reduce((sum, item) => sum + item.score, 0) / data.length) : 0;
  // Colors based on performance
  const getPerformanceColor = (score) => {
    if (score >= 75) return "from-green-400 to-green-600";
    if (score >= 50) return "from-yellow-400 to-yellow-600";
    return "from-red-400 to-red-600";
  };
  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-8">
      <h1 className="text-3xl font-bold">Course Analytics Dashboard</h1>
      {/* Overall performance */}
      <div
        className={`p-6 rounded-xl shadow text-white bg-gradient-to-r ${getPerformanceColor(
          overallAverage
        )}`}
      >
        <h2 className="text-xl font-semibold">Overall Performance</h2>
        <p className="text-3xl font-bold mt-2">{overallAverage}%</p>
      </div>

      {/* Bar chart for score of lesson */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Average Score per Lesson</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="topic" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Bar dataKey="score" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      {/* score trend data  */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Score Wise Trend</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={trend}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="attempt" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Line type="monotone" dataKey="score" stroke="#099ad8ff" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/*  Weak lessons */}
      {weakLessons.length > 0 && (
        <div className="bg-red-100 p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold text-red-600 mb-4">Weak Lessons Detected </h2>
          <ul className="space-y-2">
            {weakLessons.map((lesson, idx) => (
              <li key={idx} className="bg-red-500 text-white px-4 py-2 rounded">
                {lesson.topic} — {lesson.score}%
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}