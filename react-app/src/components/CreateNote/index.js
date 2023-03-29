import React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { createNoteThunk } from "../../store/note";
import { getAllNotebooksThunk } from "../../store/notebook";
import { useSelector } from "react-redux";
// import NotebookSelect from "../AddNoteToNB";
import "./createNote.css";

export default function CreateNote() {
  const { closeModal } = useModal();
  const history = useHistory();
  const dispatch = useDispatch();
  // const { notebookId } = useParams();
  const sessionUser = useSelector((state) => state.session.user);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  // const [selectedNotebook, setSelectedNotebook] = useState("");
  const [errors, setErrors] = useState([]);
  const [notebookId, setNotebookId] = useState(null);
  const allNotebooks = useSelector(
    (state) => state.notebookReducer.allNotebooks
  );

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
  }, [title]);

  useEffect(() => {
    dispatch(getAllNotebooksThunk());
  }, [dispatch]);

 const handleSubmit = async (e) => {
   e.preventDefault();
   let newNote = {
     title,
     description,
     writer_id: sessionUser.id,
   };

   if (notebookId) {
     newNote.notebook_id = parseInt(notebookId);
   }

   const note = await dispatch(createNoteThunk(newNote));
   if (note) {
     closeModal();
     history.push("/dashboard");
   }
 };


  return (
    <div>
      <div className="create-form-header">
        <h2>Create New Note</h2>
      </div>
      <form className="create-form-content" onSubmit={handleSubmit}>
        <div className="form-errors"></div>
        <div className="form-fields">
          <label>Name</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label>Description</label>
          <input
            type="text"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
         

          <button className="create-note-button" type="submit">
            Create Note
          </button>
        </div>
      </form>
    </div>
  );
}
