import { useEffect, useState } from "react";
import { Note } from "./Note.js";
import React from "react";
import {
  create as createNote,
  getAll as getAllNotes,
} from "./services/notes/index.js";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getAllNotes().then((notes) => {
      setNotes(notes);
      setLoading(false);
    });
  }, []);

  const handleChange = (event) => {
    setNewNote(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const noteToAddToState = {
      title: newNote,
      body: newNote,
      userId: Math.random(),
    };

    createNote(noteToAddToState)
      .then((newNote) => {
        setNotes((prevNotes) => prevNotes.concat(newNote));
      })
      .catch((e) => {
        console.error(e);
      });
    setNewNote("");
  };

  return (
    <div>
      <h1>Notes</h1>
      {loading ? "Cargando..." : ""}
      <ol>
        {notes.map((note) => (
          <Note key={note.id} {...note} />
        ))}
      </ol>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} value={newNote} />
        <button>Crear Nota</button>
      </form>
    </div>
  );
}
