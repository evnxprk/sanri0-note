import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getOneNoteThunk, editNoteThunk } from "../../store/note";
import { useModal } from "../../context/Modal";
import './editNote.css'

export default function EditNote() {
  const dispatch = useDispatch();
  const { noteId } = useParams();
  // const sessionUser = useSelector((state) => state.session.sessionUser)
  const note = useSelector((state) => state.notesReducer.note);
  const history = useHistory();
  const { closeModal } = useModal();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState([]);
  const sessionUser = useSelector((state) => state.session.user)

  useEffect(() => {
    dispatch(getOneNoteThunk(noteId));
  }, [dispatch, noteId]);

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setDescription(note.description);
    }
  }, [note]);

const handleSubmit = async (e) => {
  e.preventDefault();
  const notesData = {
    title,
    description,
    writer_id: sessionUser.id,
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
  history.push('/dashboard');
};


  useEffect(() => {
    const errors = [];
    if (title.length < 2 || title.length > 50) {
      errors.push("Title must be longer than 2 and less than 50 characters.");
    }
    if (description.length < 2 || description.length > 255) {
      errors.push(
        "Description must be longer than 2 and less than 255 characters."
      );
    }
    setErrors(errors);
  }, [title, description]);

  return (
    <>
      <h1>Edit This Note</h1>
      <div className="form-errors">
        {errors.length > 0 && (
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
        )}
      </div>
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
