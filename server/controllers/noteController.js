const Note = require("../models/Note");
// Get all notes for user
exports.getNotes = async (req, res) => {
  try {
    const { courseId, lessonIndex } = req.query;
    const filter = { userId: req.user.id };
    if (courseId) filter.courseId = courseId;
    if (lessonIndex !== undefined) filter.lessonIndex = lessonIndex;
    const notes = await Note.find(filter)
      .sort({ pinned: -1, createdAt: -1 });
    res.json(notes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
// to add a new note
exports.addNote = async (req, res) => {
  try {
    const { text, color, pinned, courseId, lessonIndex, timestamp } = req.body;
    if (!text || !text.trim()) {
      return res.status(400).json({ message: "Text is required" });
    }
    const noteData = {
      userId: req.user.id,
      text: text.trim(),
      color: color || "bg-grey-100",
      pinned: pinned || false,
      timestamp: timestamp ? new Date(timestamp) : new Date(),
    };
    if (courseId) noteData.courseId = courseId;
    if (lessonIndex !== undefined) noteData.lessonIndex = lessonIndex;
    const note = await Note.create(noteData);
    res.status(201).json(note);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
// to update note
exports.updateNote = async (req, res) => {
  try {
    const { text, color, pinned } = req.body;
    const updateData = {};
    if (text !== undefined) updateData.text = text.trim();
    if (color !== undefined) updateData.color = color;
    if (pinned !== undefined) updateData.pinned = pinned;
    if (Object.keys(updateData).length === 0)  return res.status(400).json({ message: "No fields to update" });
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { $set: updateData },
      { new: true }
    );
    if (!note)  return res.status(404).json({ message: "Note not found" });
    res.json(note);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
// to delete note
exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });
    if (!note)  return res.status(404).json({ message: "Note not found" });
    res.json({ message: "Note deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};