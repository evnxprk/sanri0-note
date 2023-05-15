import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import {
  addListThunk,
  deleteListThunk,
  getAllListThunk,
} from "../../../store/list";

// import "../tasks.css";


export default function List() {
  const dispatch = useDispatch();
  const getAllList = useSelector((state) => state.listReducer);
  const list = Object.values(getAllList.allList);
  const history = useHistory();
  const [description, setDescription] = useState('')
  const { closeModal, setModalContent, ModalContent } = useModal();
  const [listToDelete, setlistToDelete] = useState(null);
  const sessionUser = useSelector((state) => state.session.user);
  const [newTitle, setNewTitle] = useState("");
  const [selectedlistId, setSelectedlistId] = useState(null);

  useEffect(() => {
    dispatch(getAllListThunk());
  }, [dispatch]);

  const handleDeleteTask = async (listId) => {
    await dispatch(deleteListThunk(listId));
    // history.push('/dashboard')
  };

  const handleConfirmDelete = (listId) => {
    dispatch(deleteListThunk(listId))
      .then(() => {
        setNewTitle(null);
        history.push("/dashboard");
        closeModal();
        setModalContent(null);
      })
      .catch((err) => console.log(err));
  };
  if (list.length === 0) {
    return <h1 className="first-list"> Create your first list item! </h1>;
  }
  if (!sessionUser) {
    history.push("/");
    return null;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const newlist = {
      title: newTitle,
      writer_id: selectedlistId,
      description:description
    };
    dispatch(addListThunk(newlist))
      .then(() => {
        setNewTitle("");
        setSelectedlistId(null);
      })
      .catch((err) => console.log(err));
  };

const handleEdit = (listId) => {
  history.push(`/todos/${listId}/edit`);
};


  if (!list.length) return null;

  return (
    <div className="list-main-box">
      {list.map((lists) => {
        return (
          <div
            key={lists.id}
            className="list-box"
            onClick={() => handleEdit(lists.id)}
          >
            <div>{lists.title}</div>
            <div>{lists.description}</div>
          </div>
        );
      })}
    </div>
  );
}
