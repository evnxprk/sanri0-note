import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { removeNoteThunk } from "../../../store/note";

export default function NoteDetails() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { noteId } = useParams();
  const notes = useSelector((state) => state.notesReducer.allNotes);
  const note = notes[noteId];

    const notesAttachedSel = useSelector((state) => state.notesReducer);
    const notesAttached = Object.values(notesAttachedSel.allNotes);
    console.log("hi", notesAttached);

  const handleEditNote = () => {
    history.push(`/notes/${noteId}/edit`);
  };

  const handleDeleteNote = () => {
    dispatch(removeNoteThunk(noteId))
      .then(() => {
        history.push("/notes");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (!note) {
    return <h1>Note not found</h1>;
  }

  return (
    <div>
      <h1>{note.title}</h1>
      <p>{note.description}</p>
      <button onClick={handleEditNote}>Edit</button>
      <button onClick={handleDeleteNote}>Delete</button>
      
    </div>
  );
}
