const express = require("express");
const router = express.Router();
const {getNotes, addNote, updateNote, deleteNote} = require("../controllers/noteController");
const auth = require("../middleware/auth"); // assuming JWT auth

router.get("/", auth, getNotes);
// Create note
router.post("/", auth, addNote);
// Update note
router.put("/:id", auth, updateNote);
// Delete note
router.delete("/:id", auth, deleteNote);
module.exports = router;