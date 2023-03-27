import React from 'react'
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { createNoteThunk } from "../../store/note";
import { useSelector } from 'react-redux';

export default function CreateNote() {
  const { closeModal } = useModal();
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user)
  const [userId, setUserId] = useState(sessionUser.id)

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const errors = [];
    if (title.length < 5) {
      errors.push("Title must be longer than 5 characters.");
    }
    if (description.length < 5) {
      errors.push("Description must be longer than 5 characters.");
    }
    setErrors(errors);
  }, [title, description]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newNote = {
      title,
      description
    };
    
 const note = await dispatch(createNoteThunk(newNote)); // await the dispatch and get the new note object
 if (note) {
   closeModal();
   history.push(`/notes/${note.id}`);
 }
  };

  return (
    <div>
      <form className="create-note-container" onSubmit={handleSubmit}>
        <div className="create-new-note-container">
          <h1> Create New Note...</h1>
          <ul className="errors-map">
            {errors.map((errors, idx) => {
              <li key={idx}>{errors}</li>;
            })}
          </ul>
          <div className="form-container">
            <label>
              Title
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </label>
            <label>
              Note
              <input
                type="textarea"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </label>
          </div>
        </div>
        <button className="create-note-submit-button" type="submit">
          Create Note
        </button>
      </form>
    </div>
  );
}


