const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
// Middleware
app.use(cors());
app.use(express.json());
app.use("/images", express.static("public/images"));
// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));
// flashcards
app.use("/api/flashcards", require("./routes/flashcards"));
// analytics
app.use("/api/analytics",require("./routes/analytics"));
// progrss
const progressRoutes =require("./routes/Progress");
app.use("/api/progress",progressRoutes);
// course
app.use("/api/courses",require("./routes/courseRoutes"));

app.use("/api/users", require("./routes/userRoutes"));
app.post("/api/users/register", (req, res) => {
  res.json({ msg: "REGISTER ROUTE HIT" });
});
app.use("/api/mcq", require("./routes/mcqRoutes"));
// endpoint POST http://localhost:5001/api/mcq/attempt
app.use("/api/notes",  require("./routes/noteRoutes"));
// starting server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));