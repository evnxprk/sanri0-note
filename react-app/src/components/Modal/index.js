import React from "react";
import { useModal } from "../../context/Modal";

const Modal = ({ ModalContent, handleConfirmDelete }) => {
  const { closeModal } = useModal();

  return (
    <div className="modal">
      <div className="modal-content">{ModalContent}</div>
    </div>
  );
};



export default Modal;
