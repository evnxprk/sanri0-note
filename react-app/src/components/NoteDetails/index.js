import { useSelector } from "react-redux";

export default function NoteDetails({ noteId }) {
  const note = useSelector((state) => state.notesReducer.allNotes[noteId]);

  if (!note) {
    return null;
  }

  return (
    <>
      <h1>{note.title}</h1>
      <p>{note.description}</p>
    </>
  );
}
