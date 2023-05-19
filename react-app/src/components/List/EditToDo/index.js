import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import Modal from "../../Modal";
import { deleteListThunk, editListThunk, getOneListThunk } from "../../../store/list";

export default function EditLists() {
  const myList = useSelector((state) => state.listReducer.singleList);
  const dispatch = useDispatch();
  const { listId } = useParams();
  const history = useHistory();
  const { closeModal, setModalContent, ModalContent } = useModal();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState([]);
  const sessionUser = useSelector((state) => state.session.user);


useEffect(() => {
  dispatch(getOneListThunk(listId)).catch((err) => console.log(err));
}, [dispatch, listId]);

useEffect(() => {
  if (myList) {
    setTitle(myList.title);
    setDescription(myList.description);
  }
}, [myList]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const listData = {
      title,
      description,
      writer_id: sessionUser.id,
    };

    const errors = [];
    if (title.length < 2 || title.length > 50) {
      errors.push("Title must be longer than 2 and less than 50 characters.");
    }
    if (description.length < 2 || description.length > 255) {
      errors.push(
        "Description must be longer than 2 and less than 255 characters."
      );
    }
    setErrors(errors);

    if (errors.length === 0) {
      await dispatch(editListThunk(listData, listId))
        .then(() => {
          closeModal();
          setTitle("");
          setDescription("");
          history.push("/todos");
        })
        .catch((res) => {
          if (res && res.errors) {
            setErrors(res.errors);
          } else {
            console.error("Invalid response format:", res);
          }
        });
    }
  };

  const handleConfirmDelete = () => {
    dispatch(deleteListThunk(listId))
      .then(() => {
        history.push("/");
        closeModal();
        setModalContent(null);
      })
      .catch((err) => console.log(err));
  };

  const cancelFunc = () => {
    closeModal();
  };

  if (!myList) {
    return null;
  }

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
                  <button onClick={handleConfirmDelete}>Yes</button>
                  <button onClick={cancelFunc}>No</button>
                </div>
              );
            }}
          >
            Delete List
          </button>
        </form>
        <Modal ModalContent={ModalContent} />
      </div>
    </div>
  );
}