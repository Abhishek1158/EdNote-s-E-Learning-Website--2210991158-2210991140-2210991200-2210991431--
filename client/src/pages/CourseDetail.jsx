import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import NoteList from "../components/NoteList";

export default function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [notes, setNotes] = useState([]);
  const [noteContent, setNoteContent] = useState("");
  const [completedLessons, setCompletedLessons] = useState([]);
  const [showAnalyticsCard, setShowAnalyticsCard] = useState(false);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/api/courses/${id}`);
        setCourse(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCourse();
  }, [id]);
  if (!course) return <p className="p-4">Loading course...</p>;
  const totalLessons = course.lessons.length;

  const markLessonCompleted = (lessonId) => {
    if (!completedLessons.includes(lessonId)) {
      const updated = [...completedLessons, lessonId];
      setCompletedLessons(updated);

      if (updated.length === totalLessons) {
        setShowAnalyticsCard(true);
      }
    }
  };

  const handleQuizSubmit = async (score) => {
    const lesson = course.lessons[currentLesson];
    try {
      await axios.post("http://localhost:5001/api/analytics/attempt", {
        userId: "demoUser",
        courseId: id,
        topic: lesson.title,
        score,
      });
    } catch (err) {
      console.error(err);
    }
    markLessonCompleted(lesson._id);
    if (currentLesson < totalLessons - 1) {
      setCurrentLesson(currentLesson + 1);
      setAnswers({});
      setNotes([]);
    }
  };
  const handleAddNote = () => {
    if (!noteContent) return;
    setNotes((prev) => [...prev, { content: noteContent }]);
    setNoteContent("");
  };
  const current = course.lessons[currentLesson];

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 bg-gray-100 min-h-screen">
      {/* Sidebar Part */}
      <div className="md:w-1/4 bg-[#ECEFF1] p-4 rounded shadow max-h-screen overflow-y-auto">
        <h2 className="font-bold text-lg mb-4">Lessons</h2>
        {course.lessons.map((lesson, idx) => {
          const isCurrent = idx === currentLesson;
          const isCompleted = completedLessons.includes(lesson._id);
          return (
            <div
              key={lesson._id}
              className={`p-2 mb-2 rounded cursor-pointer ${ isCurrent ? "bg-blue-600 text-white font-semibold" : isCompleted ? "bg-green-500 text-green-900 font-medium" : "hover:bg-gray-200" }`} onClick={() => { setCurrentLesson(idx); setAnswers({}); }} >
              <div className="flex justify-between">
                <span>{lesson.title}</span>
                {isCompleted && <span>✔</span>}
              </div>
            </div>
          );
        })}
        <div className="mt-10">
          <img src="/images/EdNote's.png" alt="Course" className="w-full rounded-lg shadow"/>
        </div>
      </div>

      {/* Main Content */}
      <div className="md:w-3/4 flex flex-col gap-6 bg-[#ECEFF1]">

        {/* Course Title */}
        <div>
          <h1 className="text-2xl font-bold">{course.title}</h1>
          {course.content && (<h2 className=" p-3 text-gray text-xl font-semibold">{course.content}</h2>)}
        </div>

        {/* Lesson Section */}
        <div className="bg-[#ECEFF1] p-6 rounded shadow">
          <h2 className="text-xl font-bold mb-4">{current.title}</h2>
          {current.slides.length ? (
            current.slides.map((slide, idx) => (
              <div key={idx} className="mb-4 p-4 border rounded bg-gray-50">
                <h3 className="font-semibold mb-2">{slide.title}</h3>
                <p className="mb-2">{slide.content}</p>

                {slide.image && ( <img src={slide.image} alt={slide.title} className="w-full rounded-lg"/>)}
              </div>
            ))
          ) : (
            <p className="text-gray-500">Slides will be added soon.</p>
          )}

          {/* Quiz Part */}
          {current.quiz.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3">Quiz</h3>

              {current.quiz.map((q, idx) => (
                <div key={idx} className="mb-4">
                  <p className="font-medium">{q.question}</p>

                  {q.options.map((opt, i) => (
                    <label key={i} className="block">
                      <input type="radio" name={`q${idx}`} value={opt} onChange={() => setAnswers((prev) => ({ ...prev, [idx]: opt, }))
                        }
                      />
                      <span className="ml-2">{opt}</span>
                    </label>
                  ))}
                </div>
              ))}

              <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                onClick={() => {
                  const lesson = course.lessons[currentLesson];
                  let correct = 0;
                  lesson.quiz.forEach((q, i) => { if (answers[i] === q.answer) correct++; });
                  const score = (correct / lesson.quiz.length) * 100;
                  handleQuizSubmit(score);
                }}>
                Submit Quiz
              </button>
            </div>
          )}
          <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" onClick={() => markLessonCompleted(current._id)} >
            Mark Lesson Completed
          </button>

          {/* Analytics Part */}
          {showAnalyticsCard && (
            <Link
              to={`/analytics/${id}`}
              className="block mt-6 p-6 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 text-center"  >
              <h3 className="text-lg font-bold mb-1"> View Analytics Dashboard </h3>
              <p>See topic-wise performance and quiz scores.</p>
            </Link>
          )}
        </div>

        {/* Notes Part*/}
        <div className="bg-gray-200 p-4 rounded">
          <h3 className="font-bold mb-3">Notes</h3>

          <NoteList notes={notes} />
          <div className="flex gap-2 mt-2">
            <input value={noteContent} onChange={(e) => setNoteContent(e.target.value)} placeholder="Add note" className="flex-1 p-2 border rounded" />
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" onClick={handleAddNote} > Save </button>
          </div>
        </div>

      </div>
    </div>
  );
}