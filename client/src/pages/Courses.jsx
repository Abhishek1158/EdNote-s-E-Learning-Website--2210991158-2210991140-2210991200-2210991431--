import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
export default function Courses() {
  const token = localStorage.getItem("token");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5001/api/courses");
        setCourses(res.data);
      }
      catch (err) { console.error("Failed to fetch courses:", err); }
      finally { setLoading(false); }
    };
    fetchCourses();
  }, []);
  if (loading) return <p className="p-4">Loading courses...</p>;
  if (!courses.length) return <p className="p-4">No courses available.</p>;
  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {courses.map((course) =>
        token ? (
          <Link key={course._id} to={`/courses/${course._id}`} className="p-4 border rounded shadow hover:shadow-lg bg-white transition-all" >
            <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
            <p className="text-gray-600"> {course.lessons.length} Lesson{course.lessons.length > 1 ? "s" : ""} </p>
          </Link>
        ) : (
          <div key={course._id} onClick={() => alert("Please login to access this course")} className="p-4 border rounded shadow bg-gray-100 cursor-not-allowed transition-all" >
            <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
            <p className="text-red-500"> {course.lessons.length} Lesson{course.lessons.length > 1 ? "s" : ""} (Login Required) </p>
          </div>
        )
      )}
    </div>
  );
}