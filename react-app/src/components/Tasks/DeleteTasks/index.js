// DeleteTask.js

import React from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { deleteTaskThunk } from "../../../store/task";
import { useHistory } from "react-router-dom";

export default function DeleteTask() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const { taskId } = useParams();
  const history = useHistory()

const handleConfirmDelete = () => {
  dispatch(deleteTaskThunk(taskId))
    .then(() => {
      history.push("/");
      closeModal();
    })
    .catch((error) => {
      console.error("Error deleting task:", error);
      // Handle error as needed
    });
};


  const handleCancel = () => {
    closeModal();
  };

  return (
    <>
      <h1>Are you sure you want to delete this task?</h1>
      <button
        onClick={handleConfirmDelete}
        style={{ backgroundColor: "red", color: "white" }}
      >
        Yes
      </button>
      <button onClick={handleCancel}>No</button>
    </>
  );
}
