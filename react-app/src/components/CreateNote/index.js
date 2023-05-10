import React from "react";
// import Quill from "quill";
// import "quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { createNoteThunk } from "../../store/note";
import { getAllNotebooksThunk } from "../../store/notebook";
import { useSelector } from "react-redux";
import "./createNote.css";

export default function CreateNote() {
  const { closeModal } = useModal();
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState([]);
  const [notebookId, setNotebookId] = useState(null);
  const [editorState, setEditorState] = useState(null);
  const allNotebooks = useSelector(
    (state) => state.notebookReducer.allNotebooks
  );

  // useEffect(() => {
  //   const editor = new Quill("#editor-container", {
  //     theme: "snow",
  //   });
  //   setEditorState(editor);
  // }, []);

  // const handleEditorChange = () => {
  //   const description = editorState.root.innerHTML;
  //   setDescription(description);
  // };

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

  useEffect(() => {
    dispatch(getAllNotebooksThunk());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = [];
    if (title.length < 2 || title.length > 50) {
      errors.push("Title must be longer than 2 and less than 50 characters.");
    }
    if (description.length < 2 || description.length > 255) {
      errors.push(
        "Description must be longer than 2 and less than 255 characters."
      );
    }
    setErrors(errors);
    if (errors.length === 0) {
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
    }
  };



  return (
    <div>
      <div className="form-errors">
        {errors.map((error, idx) => (
          <div key={idx}>{error}</div>
        ))}
      </div>

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
          {/* <div id="editor-container" className="editor-container"></div> */}
          <textarea
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
