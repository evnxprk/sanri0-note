import React from "react";
import { useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { deleteListThunk, getAllListThunk } from "../../../store/list";


export default function DeleteList() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const history = useHistory();
  const { listId } = useParams();

  const handleDelete = async () => {
    await dispatch(deleteListThunk(listId));
    await dispatch(getAllListThunk());
    closeModal();
    history.push("/list");
  };

  const handleCancel = () => {
    closeModal();
  };

  return (
    <>
      <h1>Are you sure you want to delete this list?</h1>
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
