import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  getNotesByNotebookIdThunk,
} from "../../store/note";
import {
  deleteNotebookThunk,
  getAllNotebooksThunk,
  editNotebookThunk,
} from "../../store/notebook";
import "./notebook.css";
import { useModal } from "../../context/Modal";
import Modal from "../../components/Modal";
import { useState } from "react";

export default function Notebook() {
  const history = useHistory();
  const dispatch = useDispatch();
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
  }, [dispatch]);

  const handleNotebookClick = (notebookId) => {
    history.push(`/notebooks/${notebookId}`);
  };

  const handleEdit = (notebook) => {
    setNotebookToEdit(notebook);
    setEditedNotebookName(notebook.name);
    history.push(`/notebooks/${notebook.id}/edit`);
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
        No Notebooks! Create your first notebook!
      </h1>
    );
  }

  return (
    <div className="notebooks-main-box">
      {notebooks.map((notebook) => {
        return (
          <div
            key={notebook.id}
            className="notebook-card-box"
            onClick={() => handleNotebookClick(notebook.id)}
          >
            <div>
              <p>{notebook.name}</p>
            </div>
            {/* <div className="notebook-options">
              <button
                className="notebook-edit-button"
                onClick={() => handleEdit(notebook)}
              >
                Edit
              </button>
              <button
                className="notebook-delete-button"
                onClick={() => handleDelete(notebook.id)}
              >
                Delete
              </button>
            </div> */}
          </div>
        );
      })}
      <Modal ModalContent={ModalContent} />
    </div>
  );
}
