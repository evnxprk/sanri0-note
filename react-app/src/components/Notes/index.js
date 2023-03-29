import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllNotesThunk, removeNoteThunk } from "../../store/note";
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

  useEffect(() => {
    dispatch(getAllNotesThunk());
  }, [dispatch]);

  const handleDelete = (noteId) => {
    console.log("noteId:", noteId);
    if (noteId) {
      setNoteToDelete(noteId);
    }
  };

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

  if (notes.length === 0) {
    return <h1 className="first-note"> Create your first note! </h1>;
  }

  const handleEdit = (noteId) => {
    history.push(`/notes/${noteId}/edit`);
  };

  return (
    <>
      {notes.map((note) => {
        return (
          <div key={note.id} className="note-container">
            <div>{note.title}</div>
            <div>{note.description}</div>
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
