import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getOneNoteThunk, editNoteThunk } from "../../store/note";
import { useModal } from "../../context/Modal";

export default function EditNote() {
  const dispatch = useDispatch();
  const { noteId } = useParams();
  const history = useHistory();
  const {closeModal} = useModal()
  const notes = useSelector((state) => state.notesReducer.singleNote)

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState([])

  useEffect(() => {
    setDescription(notes.description)
  }, [notes]);

  const updateNote = (note) => {
    setDescription(note)
  }

//   const note = useSelector((state) => state.notesReducer.singleNote);

const handleSubmit = async (e) => {
  e.preventDefault();
  const notesData = {
    title,
    description,
  };
  await dispatch(editNoteThunk(notesData, noteId))
    .then(() => closeModal())
    .catch(async (res) => {
      if (res && res.json) {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      } else {
        console.error("Invalid response format:", res);
      }
    });
  history.push(`/notes/${noteId}`);
};





  return (
    <>
      <h1> Edit This Note</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="title"
          required
        />  
        <textarea
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="description"
          required
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
