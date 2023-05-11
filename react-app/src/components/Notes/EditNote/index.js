import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getOneNoteThunk, editNoteThunk } from "../../../store/note";
import { useModal } from "../../../context/Modal";
import { getOneNotebookThunk } from "../../../store/notebook";
import { getAllNotebooksThunk } from "../../../store/notebook";
import { removeNoteThunk } from "../../../store/note";
import Modal from "../../Modal";
import { clearSingleNoteThunk } from "../../../store/note";
import "./editNote.css";
import Quill from "quill";
import "quill/dist/quill.snow.css";

export default function EditNote() {
  const myNote = useSelector((state) => state.notesReducer.singleNote);
  const dispatch = useDispatch();
  const { noteId } = useParams();
  // const sessionUser = useSelector((state) => state.session.sessionUser)
  // const note = useSelector((state) => state.notesReducer.note);
  const history = useHistory();
  const { closeModal, setModalContent, ModalContent } = useModal();
  const [title, setTitle] = useState(myNote.title);
  const [description, setDescription] = useState(myNote.description);
  const [errors, setErrors] = useState([]);
  const sessionUser = useSelector((state) => state.session.user);


  useEffect(() => {
    dispatch(clearSingleNoteThunk(noteId));
    dispatch(getOneNoteThunk(noteId)).catch((err) => console.log(err));
    setTitle(myNote.title);
    setDescription(myNote.description);
  }, [dispatch, noteId]);

  useEffect(() => {
    setTitle(myNote.title);
    setDescription(myNote.description);
  }, [myNote]);

  // useEffect(() => {
  //   if (note) {
  //     setTitle(note.title);
  //     setDescription(note.description);
  //   }
  // }, [note]);

const handleSubmit = async (e) => {
  e.preventDefault();
  const notesData = {
    title,
    description,
    writer_id: sessionUser.id,
  };

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

  if (errors.length === 0) {
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
    setTitle("");
    setDescription("");
    history.push("/dashboard");
  }
};


  // useEffect(() => {
  //   const errors = [];
  //   if (title.length < 2 || title.length > 50) {
  //     errors.push("Title must be longer than 2 and less than 50 characters.");
  //   }
  //   if (description.length < 2 || description.length > 255) {
  //     errors.push(
  //       "Description must be longer than 2 and less than 255 characters."
  //     );
  //   }
  //   setErrors(errors);
  // }, [title, description]);

  //* Note Details Merge
  const myNotebookState = useSelector(
    (state) => state.notebookReducer.allNotebooks
  );

  const myNotebooks = Object.values(myNotebookState);
  const [selectedNotebook, setSelectedNotebook] = useState("");
  const noteTitle = myNote.title;
  const noteDescription = myNote.description;

  useEffect(() => {
    if (myNote && myNote.notebook_id) {
      dispatch(getOneNotebookThunk(myNote.notebook_id));
    }
  }, [dispatch, myNote, myNotebookState]);

  const myNoteNotebook = useSelector(
    (state) => state.notebookReducer.singleNotebook
  );

  console.log("myNoteBook", myNoteNotebook);

  useEffect(() => {
    dispatch(getAllNotebooksThunk());
    dispatch(getOneNoteThunk(noteId));
  }, [dispatch, noteId]);

  function addNoteToNotebook(notebookId) {
    const noteData = {
      title,
      description,
      notebook_id: notebookId,
      writer_id: myNote.writer_id,
    };

    dispatch(editNoteThunk(noteData, noteId))
      .then(() => dispatch(getOneNoteThunk(noteId)))
      .catch((err) => console.log(err));
  }

  //* Delete Merge
  console.log("xxx", Object.values(myNoteNotebook));

  const [noteToDelete, setNoteToDelete] = useState(null);

  const handleConfirmDelete = (noteId) => {
    dispatch(removeNoteThunk(noteId))
      .then(() => {
        setNoteToDelete(null);
        history.push("/");
        closeModal();
        setModalContent(null);
      })
      .catch((err) => console.log(err));
  };

  const cancelFunc = () => {
    setNoteToDelete(null);
    closeModal();
  };

  //* Editor Merge

  if (!Object.values(myNote).length) return null;

  return (
    <div className="editor-main-container">
      <div className="edit-note-main-box">
        <h1 className="edit-note-title">{myNote.title}</h1>
        <div className="form-errors">
          {errors.length > 0 && (
            <ul>
              {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
          )}
        </div>
        <div className="select-notebook-dropdown">
          <label>Add to Notebook</label>
          <select
            value={selectedNotebook}
            className="select-notebook"
            onChange={(e) => setSelectedNotebook(e.target.value)}
          >
            <option value="">Select a notebook</option>
            {myNotebooks.map((notebook) => (
              <option key={notebook.id} value={notebook.id}>
                {notebook.name}
              </option>
            ))}
          </select>
        </div>
        {/* <div className="form-errors">
        {errors.length > 0 && (
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
        )}
      </div> */}
        <form onSubmit={handleSubmit}>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="title"
            required
          />
          <label>Description</label>
          <textarea
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="description"
            required
          />
          <button
            type="submit"
            // value={myNoteNotebook.name}
            onClick={() => addNoteToNotebook(selectedNotebook)}
          >
            Submit
          </button>
          <button
            className="note-delete-button"
            onClick={(e) => {
              e.preventDefault();
              setModalContent(
                <div>
                  <p>Are you sure you want to delete this note?</p>
                  <button onClick={() => handleConfirmDelete(noteId)}>
                    Yes
                  </button>
                  <button onClick={() => cancelFunc()}>No</button>
                </div>
              );
            }}
          >
            Delete Note
          </button>
        </form>
        <Modal
          ModalContent={ModalContent}
          handleConfirmDelete={handleConfirmDelete}
        />
      </div>
    </div>
  );
}
