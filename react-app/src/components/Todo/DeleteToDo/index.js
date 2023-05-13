import React from "react";
import { useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { deleteTodoThunk, getAllTodoThunk } from "../../../store/todo";


export default function DeleteTodo() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const history = useHistory();
  const { todoId } = useParams();

  const handleDelete = async () => {
    await dispatch(deleteTodoThunk(todoId));
    await dispatch(getAllTodoThunk());
    closeModal();
    history.push("/todo");
  };

  const handleCancel = () => {
    closeModal();
  };

  return (
    <>
      <h1>Are you sure you want to delete this todo item?</h1>
      <button
        onClick={handleDelete}
        style={{ backgroundColor: "red", color: "white" }}
      >
        Yes
      </button>
      <button onClick={handleCancel}>No</button>
    </>
  );
}
