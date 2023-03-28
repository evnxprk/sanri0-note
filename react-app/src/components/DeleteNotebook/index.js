import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  deleteNotebookThunk,
  getAllNotebooksThunk,
} from "../../store/notebook";

export default function DeleteNoteBook() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const history = useHistory();
  const { notebookId } = useParams();

  const handleDelete = async () => {
    await dispatch(deleteNotebookThunk(notebookId));
    await dispatch(getAllNotebooksThunk());
    closeModal();
    history.push("/notebooks");
  };

  return (
    <>
      <h1>Are you sure you want to delete this notebook?</h1>
      <button onClick={handleDelete}>Delete</button>
    </>
  );
}
