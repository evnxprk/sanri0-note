import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import Modal from "../../Modal";
import {
  deleteListThunk,
  editListThunk,
  getOneListThunk,
} from "../../../store/list";

export default function EditLists() {
  const myList = useSelector((state) => state.listReducer.singleList);
  const dispatch = useDispatch();
  const { listId } = useParams();
  const history = useHistory();
  const { closeModal, setModalContent, ModalContent } = useModal();
  const [title, setTitle] = useState(myList.title);
  const [description, setDescription] = useState(myList.description);
  const [errors, setErrors] = useState([]);
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getOneListThunk(listId)).catch((err) => console.log(err));
    setTitle(myList.title);
    setDescription(myList.description);
  }, [dispatch, listId]);

  useEffect(() => {
    setTitle(myList.title);
    setDescription(myList.description);
  }, [myList]);

  // useEffect(() => {
  //   if (note) {
  //     setTitle(note.title);
  //     setDescription(note.description);
  //   }
  // }, [note]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const listData = {
      title,
      description
    };

    const errors = [];
    if (title.length < 2 || title.length > 255) {
      errors.push(
        "Title must be longer than 2 and less than 255 characters."
      );
    }
    if (description.length < 2 || description.length > 255) {
      errors.push(
        "Description must be longer than 2 and less than 255 characters."
      );
    }
    setErrors(errors);

    if (errors.length === 0) {
      await dispatch(editListThunk(listData, listId))
        .then(() => closeModal())
        .catch(async (res) => {
          if (res && res.json) {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
          } else {
            console.error("Invalid response format:", res);
          }
        });
      setTitle("")
      setDescription("")
      history.push("/dashboard");
    }
  };

  const [listToDelete, setListToDelete] = useState(null);

  const handleConfirmDelete = (listId) => {
    dispatch(deleteListThunk(listId))
      .then(() => {
        setListToDelete(null);
        history.push("/");
        closeModal();
        setModalContent(null);
      })
      .catch((err) => console.log(err));
  };

  const cancelFunc = () => {
    setListToDelete(null);
    closeModal();
  };

  //* Editor Merge

  if (!Object.values(myList).length) return null;

  return (
    <div className="editor-main-container">
      <div className="edit-list-main-box">
        <h1 className="edit-list-title">{myList.title}</h1>
        <h1 className="edit-list-description">{myList.description}</h1>
        <div className="form-errors">
          {errors.length > 0 && (
            <ul>
              {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
          )}
        </div>
        <form onSubmit={handleSubmit}>
          <label>Title</label>
          <textarea
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="title"
            required
          />
          <label>Description</label>
          <textarea
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="description"
            required
          />
          <button className="edit-submit-button" type="submit">
            Save Changes
          </button>

          <button
            className="list-delete-button"
            onClick={(e) => {
              e.preventDefault();
              setModalContent(
                <div>
                  <p>Are you sure you want to delete this list?</p>
                  <button onClick={() => handleConfirmDelete(listId)}>
                    Yes
                  </button>
                  <button onClick={() => cancelFunc()}>No</button>
                </div>
              );
            }}
          >
            Delete list
          </button>
        </form>
        <Modal
          ModalContent={ModalContent}
          handleConfirmDelete={handleConfirmDelete}
        />
      </div>
    </div>
  );
}
