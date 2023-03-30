import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  createNoteThunk,
  getAllNotesThunk,
  removeNoteThunk,
} from "../../store/note";
import { getAllNotebooksThunk } from "../../store/notebook";
import { NavLink } from "react-router-dom";
import "./notes.css";
import { useModal } from "../../context/Modal";
import Modal from "../../components/Modal";

export default function Notes() {
  const history = useHistory();
  const dispatch = useDispatch();
  const getAllNotes = useSelector((state) => state.notesReducer);
  const notes = Object.values(getAllNotes.allNotes);
  const sessionUser = useSelector((state) => state.session.user);
  const { closeModal, setModalContent, ModalContent } = useModal();
  const [noteToDelete, setNoteToDelete] = useState(null);
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [newNoteDescription, setNewNoteDescription] = useState("");
  const [selectedNotebookId, setSelectedNotebookId] = useState(null);

  useEffect(() => {
    dispatch(getAllNotesThunk());
    dispatch(getAllNotebooksThunk());
  }, [dispatch]);

  const notebookState = useSelector((state) => state.notebookReducer);
  const notebooks = Object.values(notebookState)

  if (notes.length === 0) {
    return <h1 className="first-note"> Create your first note! </h1>;
  }

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

  if (!sessionUser) {
    history.push("/");
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const newNote = {
      title: newNoteTitle,
      description: newNoteDescription,
      notebook_id: selectedNotebookId,
    };
    dispatch(createNoteThunk(newNote))
      .then(() => {
        setNewNoteTitle("");
        setNewNoteDescription("");
        setSelectedNotebookId(null);
      })
      .catch((err) => console.log(err));
  };

  const handleEdit = (noteId) => {
    history.push(`/notes/${noteId}/edit`);
  };

  if (!notebooks.length) return null
  return (
    <>
      {/* <form onSubmit={handleSubmit}>
        <label htmlFor="note-title">Title:</label>
        <input
          id="note-title"
          type="text"
          value={newNoteTitle}
          onChange={(e) => setNewNoteTitle(e.target.value)}
        />

        <label htmlFor="note-description">Description:</label>
        <textarea
          id="note-description"
          value={newNoteDescription}
          onChange={(e) => setNewNoteDescription(e.target.value)}
        />

        <label htmlFor="notebook-select">Notebook:</label>
        <select
          id="notebook-select"
          value={selectedNotebookId}
          onChange={(e) => setSelectedNotebookId(e.target.value)}
        >
          <option value="">Select a notebook...</option>
          {notebooks.map((notebook) => (
            <option key={notebook.id} value={notebook.id}>
              {notebook.name}
            </option>
          ))}
        </select>

        <button type="submit">Add Note</button>
      </form> */}

      {notes.map((note) => {
        return (
          <div key={note.id} className="note-container">
            <div>
            <NavLink to={`/note/${note.id}`} noteId={note.id}>
            { note.title }
            </NavLink>
            </div>
            <div className="note-options">
              <button
                className="note-edit-button"
                onClick={() => handleEdit(note.id)}
              >
                Edit
              </button>
              <button
                className="note-delete-button"
                onClick={(e) => {
                  e.preventDefault();
                  setModalContent(
                    <div>
                      <p>Are you sure you want to delete this note?</p>
                      <button onClick={() => handleConfirmDelete(note.id)}>
                        Yes
                      </button>
                      <button onClick={() => setNoteToDelete(null)}>No</button>
                    </div>
                  );
                }}
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}

      <Modal
        ModalContent={ModalContent}
        handleConfirmDelete={handleConfirmDelete}
      />
    </>
  );
}








