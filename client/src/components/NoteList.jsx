import { useState } from "react";
export default function NoteList({ notes, onUpdate }) {
  const [editingId, setEditId] = useState(null);
  const [editContent, setEditContent] = useState("");

  const startEdit = note => {
    setEditId(note._id);
    setEditContent(note.content);
  };

  const saveEdit = id => {
    onUpdate(id, editContent);
    setEditId(null);
    setEditContent("");
  };

  return (
    <div className="space-y-2">
      {notes.map(note => (
        <div key={note._id} className="p-2 border rounded shadow-sm bg-gray-50 flex flex-col gap-1">
          {editingId === note._id ? (
            <div className="flex gap-2">
              <input
                value={editContent}
                onChange={e => setEditContent(e.target.value)}
                className="flex-1 p-1 border rounded"
              />
              <button
                onClick={() => saveEdit(note._id)}
                className="bg-green-500 text-white px-2 rounded hover:bg-green-600"
              >
                Save
              </button>
            </div>
          ) : (
            <>
              <p>{note.content}</p>
              <small className="text-gray-400">
                Timestamp: {note.timestamp || 0} | Created: {new Date(note.createdAt).toLocaleString()}
              </small>
              <button
                onClick={() => startEdit(note)}
                className="text-blue-500 hover:underline text-sm self-start"
              >
                Edit
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}