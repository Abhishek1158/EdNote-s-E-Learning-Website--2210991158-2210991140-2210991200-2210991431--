import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Courses from "./pages/Courses";
import MCQ from "./pages/MCQ";
import Notes from "./pages/Notes";
import AdaptiveAssessment from "./pages/AdaptiveAssessment";
import AnalyticsDashboard from "./pages/AnalyticsDashboard";
import CourseDetail from "./pages/CourseDetail";
import CourseAnalytics from "./pages/CourseAnalytics";
import Navbar from "./components/Navbar";
import { PrivateRoute } from "./components/PrivateRoute";
import AuthRoute from "./components/AuthRoute";
import { isAuthenticated } from "./utils/auth";
import FlashcardsPage from "./pages/FlashcardsPage";
function App() {
  const isAuthenticate = isAuthenticated();
  return (
    <Router>
      <Navbar /> 
      <Routes>
        <Route path="/login" element={ <AuthRoute> <Login /> </AuthRoute>}/>
        <Route path="/register" element={<AuthRoute> <Register /> </AuthRoute>}/>
        <Route path="/" element={ <PrivateRoute> <Home  /></PrivateRoute>} />
        <Route path="/courses" element={<PrivateRoute> <Courses /> </PrivateRoute>}/>
        <Route path="/courses/:id" element={<PrivateRoute> <CourseDetail /> </PrivateRoute>}/>
        <Route path="/analytics/:courseId" element={<PrivateRoute> <CourseAnalytics /> </PrivateRoute>}/>
        <Route path="/mcq" element={<PrivateRoute> <MCQ /> </PrivateRoute>}/>
        <Route path="/notes" element={ <PrivateRoute> <Notes /></PrivateRoute>}/>
        <Route path="/adaptive-assessment" element={<PrivateRoute> <AdaptiveAssessment /></PrivateRoute>}/>
        <Route path="/analytics" element={<PrivateRoute> <AnalyticsDashboard /> </PrivateRoute>} />
        <Route path="/flashcards" element={<PrivateRoute> <FlashcardsPage /> </PrivateRoute>}/>
      </Routes>
      {isAuthenticate && <Footer />}
    </Router>
  );
}
export default App;