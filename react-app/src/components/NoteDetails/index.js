import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function NoteDetails() {
  const { noteId } = useParams();
  const note = useSelector((state) => state.notesReducer.allNotes[noteId]);

  return (
    <>
      <h1>{note.title}</h1>
      <p>{note.description}</p>
    </>
  );
}
