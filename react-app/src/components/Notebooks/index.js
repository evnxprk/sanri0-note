import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import {
  getAllNotebooksThunk,
  deleteNotebookThunk,
  editNotebookThunk,
} from "../../store/notebook";
import { getAllNotesThunk } from "../../store/note";
import "./notebook.css";
import { useModal } from "../../context/Modal";
import Modal from "../../components/Modal";

export default function Notebook() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { notebookId } = useParams();
  const allNotebooks = useSelector(
    (state) => state.notebookReducer.allNotebooks
  );
  const notebooks = Object.values(allNotebooks);
  const sessionUser = useSelector((state) => state.session.user);
  const { ModalContent, closeModal, setModalContent } = useModal();
  const [editedNotebookName, setEditedNotebookName] = useState("");
  const [notebookToEdit, setNotebookToEdit] = useState(null);

  useEffect(() => {
    dispatch(getAllNotebooksThunk());
    dispatch(getAllNotesThunk());
  }, [dispatch]);

  const handleEdit = (notebook) => {
    setNotebookToEdit(notebook);
    setEditedNotebookName(notebook.name);
    history.push(`/notebook/${notebook.id}/edit`);
  };

  const handleDelete = (notebookId) => {
    setModalContent(
      <div>
        <p>Are you sure you want to delete this notebook?</p>
        <button
          onClick={() => {
            dispatch(deleteNotebookThunk(notebookId))
              .then(() => {
                closeModal();
                setModalContent(null);
                history.push("/");
              })
              .catch((err) => console.log(err));
          }}
        >
          Yes
        </button>
        <button onClick={closeModal}>No</button>
      </div>
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editNotebookThunk(notebookToEdit.id, editedNotebookName))
      .then(() => {
        setNotebookToEdit(null);
        setEditedNotebookName("");
      })
      .catch((err) => console.log(err));
  };

  if (!sessionUser) {
    history.push("/");
    return null;
  }

  if (Object.values(allNotebooks).length === 0) {
    return (
      <h1 className="first-notebook">
        {" "}
        No Notebooks! Create your first notebook!
      </h1>
    );
  }

  return (
    <>
      {notebooks.map((notebook) => {
        return (
          <div key={notebook.id}>
            
              <div>{notebook.name}</div>
            <div className="notebook-options">
              <button
                className="notebook-edit-button"
                as="button"
                onClick={() => handleEdit(notebook)}
              >
                Edit
              </button>

              <button
                className="notebook-delete-button"
                as="button"
                onClick={() => handleDelete(notebook.id)}
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
      {notebookToEdit && (
        <form onSubmit={handleSubmit}>
          <label>
            Notebook Name:
            <input
              type="text"
              value={editedNotebookName}
              onChange={(e) => setEditedNotebookName(e.target.value)}
              required
            />
          </label>
          <button type="submit">Save Changes</button>
        </form>
      )}
      <Modal ModalContent={ModalContent} />
    </>
  );
}
