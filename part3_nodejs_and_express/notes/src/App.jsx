import { useState, useEffect } from "react";

import axios from "axios";

import Note from "./components/Note";
import Notification from "./components/Notification";
import noteService from "./services/notes";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    noteService.getAll().then((response) => setNotes(response));
  }, []);

  const toggleImportanceOf = (id) => {
    const url = `http://localhost:3001/notes/${id}`; // locate the specific note by id
    const note = notes.find((n) => n.id === id); // find the note we want to modify
    const changedNote = { ...note, important: !note.important }; // copy the note and only ammend the important property

    noteService
      .update(id, changedNote)
      .then((response) =>
        setNotes(notes.map((note) => (note.id === id ? response : note)))
      )
      .catch((error) => {
        setErrorMessage(
          `Note '${note.content}' was already removed from the server`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  const addNote = (e) => {
    e.preventDefault();
    const noteObj = {
      content: newNote,
      important: Math.random() < 0.5,
    };
    noteService.create(noteObj).then((response) => {
      setNotes(notes.concat(response));
      setNewNote("");
    });
  };

  console.log("render", notes.length, "notes");
  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <ul>
        {notes.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={toggleImportanceOf}
          />
        ))}
      </ul>
      <form method="POST" onSubmit={addNote}>
        <input
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        />
        <button type="submit">Add note</button>
      </form>
    </div>
  );
};

export default App;
