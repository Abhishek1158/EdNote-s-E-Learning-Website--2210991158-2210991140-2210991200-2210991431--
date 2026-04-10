import { useEffect, useState } from "react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import API from "../services/api";
export default function AnalyticsDashboard() {
  const [stats, setStats] = useState({ topicPerformance: [], scoretrend: [], });
  useEffect(() => {
    let intervalId;
    const fetchAnalytics = async () => {
      try {
        const res = await API.get("/analytics/student");
        setStats(res.data);
      } catch (err) { console.error(err); }
    };
    fetchAnalytics();   // starting fetch
    intervalId = setInterval(fetchAnalytics, 3000);    // 3000 - 3 sec
    return () => clearInterval(intervalId);
  }, []);
  return (
    <div className="p-6 min-h-screen bg-gray-200">
      <h1 className="text-2xl font-bold mb-6">Learning Analytics Dashboard</h1>
      {/* bar-chart for topic wise performance */}
      <div className="bg-white p-6 rounded shadow mb-8">
        <h2 className="font-bold mb-4">Topic-wise Performance</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={stats.topicPerformance}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="topic" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="score" fill="#0c4197ff" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      {/* line-chart  for score trend*/}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="font-bold mb-4">Score Trend</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={stats.scoretrend}>
            <CartesianGrid strokeDasharray="4 4" />
            <XAxis dataKey="attempt" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="score" stroke="#0be65bff" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}