import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register chart components
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

export default function PerformanceChart({ quizScores }) {
  // sort the score
  const sortedScores = [...quizScores].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
  const labels = sortedScores.map((_, index) => `Quiz ${index + 1}`);
  const percentageScores = sortedScores.map(
    (q) => Math.round((q.score / q.total) * 100)
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Quiz Score (%)",
        data: percentageScores,
        borderColor: "rgb(34, 197, 94)",
        backgroundColor: "rgba(34, 197, 94, 0.2)",
        tension: 0.3,
        fill: true,
        pointRadius: 5,
        pointBackgroundColor: "rgb(34, 197, 94)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        ticks: {
          callback: function (value) {
            return value + "%";
          },
        },
      },
    },
  };

  return <Line data={data} options={options} />;
}