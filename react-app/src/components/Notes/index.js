import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllNotesThunk } from "../../store/note";
import './notes.css'

export default function Notes() {
  const dispatch = useDispatch();
  const history = useHistory();
  const getAllNotes = useSelector((state) => state.notesReducer);
  const notes = Object.values(getAllNotes.allNotes);

  useEffect(() => {
    dispatch(getAllNotesThunk());
  }, [dispatch]);

  if (notes.length === 0) {
    return <h1 className="first-note">Create your first note!</h1>;
  }

  const handleNoteClick = (noteId) => {
    history.push(`/notes/${noteId}`);
  };

  return (
    <div className="note-main-box">
      {notes.map((note) => (
        <div
          key={note.id}
          className="note-box"
          onClick={() => handleNoteClick(note.id)}
        >
          <div>{note.title}</div>
        </div>
      ))}
    </div>
  );
}
