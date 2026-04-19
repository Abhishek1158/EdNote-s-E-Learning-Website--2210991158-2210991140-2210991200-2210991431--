# EdNote's E-Learning Website
EdNote’s is a web application designed to enhance learning through an integrated platform. It combines multiple educational materials such as MCQs, courses, smart notes, flashcards and analytics into a single system to improve learning efficiency and knowledge.
# System Work-Flow 
1. Onboarding: A user registers and login to the platform with secure authentication using 
hashing. 
2. Learning: The system fetches courses (fetchCourses), lessons having slides containing 
theory and attempt quizzes. Other than courses this system has MCQ’s, flashcards, notes, 
and analytics dashboards to visualize performance. 
3. System Coordination (Backend): Backend (Node.js and Express.js) processes via 
controllers, models and routes. Secures endpoints using middleware, and manage data 
storage in MongoDB. 
4. User Interaction (Frontend): Frontend (React.js) handles routing, UI rendering, and API 
communication via Axios, ensuring seamless interaction.

# 🚀 Features
Secure user authentication (Register/Login)
Course browsing and lesson viewing
MCQ-based assessments
Smart notes with pin, edit, delete, and search
Flashcards 
Learning progress tracking
Analytics dashboard for performance insights

# System Architecture 
Backend (Node.js and Express.js): A modular MVC structure consisting of controllers, 
models, routes. It includes secure authentication using JWT and middleware for route 
protection. 
Frontend (React.js): A component-based architecture using React Router for navigation 
and Axios for backend API communication. 
Database (MongoDB): A NoSQL document-oriented database used to store structured 
data including users, courses, notes, flashcards, and MCQs. 
# Unique Contributions 
Integrated Learning System: Combines courses, MCQ’s, notes, and flashcards into one 
platform. 
Performance Analytics: Tracks user progress and learning. 

# Client Side starting command
EdNote/EdNote/client
npm start
# Server Side starting command
EdNote/EdNote/server
npm run dev
