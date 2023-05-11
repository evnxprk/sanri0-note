import React from "react";
import { useModal } from "../../../context/Modal";
import "./deleteNote.css";

export default function DeleteNote({
  note,
  handleConfirmDelete,
  handleCancelDelete,
}) {
  const { closeModal } = useModal();

  const handleDelete = () => {
    handleConfirmDelete(note.id);
    closeModal();
  };

  return (
    <div className="delete-modal">
      <div className="delete-modal-content">
        <h3>Are you sure you want to delete this note?</h3>
        <div className="modal-buttons">
          <button onClick={handleDelete}>Yes</button>
          <button onClick={handleCancelDelete}>No</button>
        </div>
      </div>
    </div>
  );
}
