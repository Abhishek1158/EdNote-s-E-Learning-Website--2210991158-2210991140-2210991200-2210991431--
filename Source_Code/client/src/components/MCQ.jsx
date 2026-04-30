// import { useState } from "react";

// export default function MCQ() {
//   const token = localStorage.getItem("token");

//   // Hardcoded course with lessons and MCQs
//   const [course] = useState({
//     _id: "1",
//     title: "React Basics",
//     lessons: [
//       {
//         title: "Introduction to React",
//         questions: [
//           {
//             question: "What is React?",
//             options: ["Library", "Framework", "Language", "IDE"],
//             answer: 0,
//           },
//           {
//             question: "Which hook is used for state?",
//             options: ["useEffect", "useState", "useRef", "useMemo"],
//             answer: 1,
//           },
//         ],
//       },
//       {
//         title: "Components & Props",
//         questions: [
//           {
//             question: "Props are used to?",
//             options: ["Pass data", "Modify state", "Fetch API", "Render HTML"],
//             answer: 0,
//           },
//         ],
//       },
//     ],
//   });

//   const [currentLesson, setCurrentLesson] = useState(0);
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [answers, setAnswers] = useState({}); // store selected options
//   const [score, setScore] = useState(0);

//   const lesson = course.lessons[currentLesson];
//   const question = lesson.questions[currentQuestion];

//   const handleAnswer = (index) => {
//     // Save answer
//     setAnswers((prev) => ({ ...prev, [currentQuestion]: index }));

//     // Update score if correct
//     if (index === question.answer) setScore(score + 1);

//     // Move to next question after 0.5s
//     setTimeout(() => {
//       if (currentQuestion < lesson.questions.length - 1) {
//         setCurrentQuestion(currentQuestion + 1);
//       } else if (currentLesson < course.lessons.length - 1) {
//         setCurrentLesson(currentLesson + 1);
//         setCurrentQuestion(0);
//         setAnswers({});
//       } else {
//         alert(`You completed all MCQs! Your total score: ${score + (index === question.answer ? 1 : 0)}`);
//       }
//     }, 500);
//   };

//   return (
//     <div className="p-4 max-w-xl mx-auto">
//       <h2 className="text-2xl font-bold mb-4">
//         {course.title} - {lesson.title}
//       </h2>

//       <div className="bg-white rounded shadow p-4 mb-4">
//         <p className="font-semibold mb-2">{question.question}</p>
//         <div className="flex flex-col gap-2">
//           {question.options.map((opt, i) => {
//             const isSelected = answers[currentQuestion] === i;
//             return (
//               <button
//                 key={i}
//                 className={`p-2 border rounded text-left hover:bg-gray-100
//                   ${isSelected ? (i === question.answer ? "bg-green-100 border-green-500" : "bg-red-100 border-red-500") : ""}
//                 `}
//                 onClick={() => !isSelected && handleAnswer(i)}
//                 disabled={isSelected}
//               >
//                 {opt}
//               </button>
//             );
//           })}
//         </div>
//         <p className="mt-2 text-gray-500">
//           Question {currentQuestion + 1} of {lesson.questions.length} | Lesson {currentLesson + 1} of {course.lessons.length}
//         </p>
//       </div>
//     </div>
//   );
// }
