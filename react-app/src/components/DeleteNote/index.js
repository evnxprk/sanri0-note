import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removeNoteThunk } from "../../store/note";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function DeleteNote() {
  const dispatch = useDispatch();
  const closeModal = useModal();
  const history = useHistory()
  const { noteId } = useParams()
  const [errors, setErrors] = useState([]);
  console.log('noteid', noteId)

 const handleSubmit = async (e) => {
   e.preventDefault();
   await dispatch(removeNoteThunk(noteId))
   history.push("/notes");
 };


  return (
    <>
      <h1> Are you sure you want to delete this note?</h1>
      <button onClick={handleSubmit}>Delete</button>
    </>
  );
}
