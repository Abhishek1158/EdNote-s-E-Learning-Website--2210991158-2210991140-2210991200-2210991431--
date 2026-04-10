import { useState, useEffect } from "react";
import API from "../services/api";

// random colors for notes
const getRandomColor = () => {
  const colors = ["bg-grey-100", "bg-yellow-100", "bg-red-100", "bg-blue-100", "bg-purple-100", "bg-orange-100"];
  return colors[Math.floor(Math.random() * colors.length)];
};

export default function Notes() {
  const [noteText, setNoteText] = useState("");
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load notes from MongoDB
  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await API.get("/notes");
      // Sort pinned first
      const sortedNotes = response.data.sort((a, b) => b.pinned - a.pinned || new Date(b.createdAt) - new Date(a.createdAt));
      setNotes(sortedNotes);
    } catch (err) {
      console.error("Failed to load notes:", err);
      setError("Failed to load notes. Please login again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddNote = async () => {
    if (!noteText.trim()) return;

    try {
      const newNote = {
        text: noteText.trim(),
        color: getRandomColor(),
        pinned: false,
        lessonIndex: 0,
      };
      const response = await API.post("/notes", newNote);
      const updatedNotes = [response.data, ...notes].sort((a, b) => b.pinned - a.pinned || new Date(b.createdAt) - new Date(a.createdAt));
      setNotes(updatedNotes);
      setNoteText("");
    } catch (err) {
      console.error("Failed to add note:", err.response?.data || err.message);
      alert(`Failed to add note: ${err.response?.data?.message || err.message}`);
    }
  };
  const handleDeleteNote = async (id) => {
    try {
      await API.delete(`/notes/${id}`);
      setNotes(notes.filter((note) => note._id !== id));
    } catch (err) {
      console.error("Failed to delete note:", err);
      alert("Failed to delete note");
    }
  };
  const handleTogglePin = async (id) => {
    const note = notes.find(n => n._id === id);
    if (!note) return;
    try {
      const response = await API.put(`/notes/${id}`, { pinned: !note.pinned });
      const updatedNotes = notes
        .map((n) => (n._id === id ? response.data : n))
        .sort((a, b) => b.pinned - a.pinned || new Date(b.createdAt) - new Date(a.createdAt));
      setNotes(updatedNotes);
    } catch (err) {
      console.error("Failed to toggle pin:", err);
      alert("Failed to update note");
    }
  };
  const handleEditNote = async (id, newText) => {
    try {
      const response = await API.put(`/notes/${id}`, { text: newText.trim() });
      const updatedNotes = notes.map((n) => (n._id === id ? response.data : n));
      setNotes(updatedNotes);
    } catch (err) {
      console.error("Failed to edit note:", err);
    }
  };

  const filteredNotes = notes.filter((note) =>
    note.text.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="p-6 max-w-5xl bg-blue-300 mx-auto min-h-screen flex items-center justify-center">
        <div className="text-xl font-semibold">Loading notes...</div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl bg-blue-300 mx-auto min-h-screen">
      <h2 className="text-4xl font-bold mb-6 text-center text-blue-800 flex items-center justify-center gap-2">
        <img src="/images/NOTES logo.png" alt="Notes Logo" className="w-8 h-8"></img>
        Smart Notes..
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {/* Search */}
      <input
        type="text"
        placeholder="Search notes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-4 p-3 font-semibold border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
      />

      {/* Add Note */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <textarea
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          className="flex-1 p-4 border font-semibold border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none resize-none"
          placeholder="Write your note here..."
          rows={3}
        />
        <button
          onClick={handleAddNote}
          className="bg-blue-800 hover:bg-blue-900 text-white px-6 py-3 rounded-lg font-bold shadow transition"
        >
          Add Note
        </button>
      </div>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredNotes.length === 0 && (
          <p className="text-gray-900 font-bold col-span-full text-center py-12">
            No notes found. Add your first smart note!
          </p>
        )}
        {filteredNotes.map((note) => (
          <div
            key={note._id}
            className={`p-4 rounded-lg shadow-lg hover:shadow-xl transition-all flex flex-col justify-between h-48 ${note.color || 'bg-gray-100'}`}
          >
            <textarea
              value={note.text}
              onChange={(e) => handleEditNote(note._id, e.target.value)}
              className="bg-transparent w-full border-none resize-none focus:outline-none text-gray-800 font-medium h-24 overflow-auto"
              rows={3}
            />
            <div className="flex justify-between items-center mt-auto text-xs text-gray-500">
              <span>{note.createdAt ? new Date(note.createdAt).toLocaleDateString() : 'Recent'}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleTogglePin(note._id)}
                  title={note.pinned ? "Unpin" : "Pin"}
                  className={`p-1 rounded ${note.pinned ? "text-yellow-500 bg-yellow-100" : "text-gray-400 hover:text-yellow-500 hover:bg-yellow-50"}`}
                >
                  PIN
                </button>
                <button
                  onClick={() => handleDeleteNote(note._id)}
                  className="p-1 text-red-500 hover:text-red-600 hover:bg-red-50 rounded"
                  title="Delete Note"
                >
                  X
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}