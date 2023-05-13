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

  // console.log('notes', useSelector((state) => state.notesReducer.allNotes))

  const notebookState = useSelector((state) => state.notebookReducer);
  const notebooks = Object.values(notebookState);

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

  if (!notebooks.length) return null;
  return (
    <div className="note-main-box">
      {notes.map((note) => {
        return (
          <div
            key={note.id}
            className="note-box"
            onClick={() => handleEdit(note.id)}
          >
            <div>{note.title}</div>
          </div>
        );
      })}
    </div>
  );
}
