import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { deleteTodoThunk, editTodoThunk, getOneTodoThunk } from "../../../store/todo";
import Modal from "../../Modal";


export default function EditTodo() {
  const myTodo = useSelector((state) => state.todoReducer.singleTodo);
  const dispatch = useDispatch();
  const { todoId } = useParams();
  const history = useHistory();
  const { closeModal, setModalContent, ModalContent } = useModal();
  const [title, setTitle] = useState(myTodo.title);
  const [errors, setErrors] = useState([]);
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getOneTodoThunk(todoId)).catch((err) => console.log(err));
    setTitle(myTodo.title);
  }, [dispatch, todoId]);

  useEffect(() => {
    setTitle(myTodo.title);
  }, [myTodo]);

  // useEffect(() => {
  //   if (note) {
  //     setTitle(note.title);
  //     setDescription(note.description);
  //   }
  // }, [note]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const todoData = {
      title,
      writer_id: sessionUser.id,
    };

    const errors = [];
    if (title.length < 2 || title.length > 50) {
      errors.push(
        "Title must be longer than 2 and less than 50 characters."
      );
    }
    setErrors(errors);

    if (errors.length === 0) {
      await dispatch(editTodoThunk(todoData, todoId))
        .then(() => closeModal())
        .catch(async (res) => {
          if (res && res.json) {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
          } else {
            console.error("Invalid response format:", res);
          }
        });
      setTitle("");
      history.push("/dashboard");
    }
  };

  const [todoToDelete, setTodoToDelete] = useState(null);

  const handleConfirmDelete = (todoId) => {
    dispatch(deleteTodoThunk(todoId))
      .then(() => {
        setTodoToDelete(null);
        history.push("/");
        closeModal();
        setModalContent(null);
      })
      .catch((err) => console.log(err));
  };

  const cancelFunc = () => {
    setTodoToDelete(null);
    closeModal();
  };

  //* Editor Merge

  if (!Object.values(myTodo).length) return null;

  return (
    <div className="editor-main-container">
      <div className="edit-todo-main-box">
        <h1 className="edit-todo-description">{myTodo.title}</h1>
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
          <button className="edit-submit-button" type="submit">
            Save Changes
          </button>

          <button
            className="todo-delete-button"
            onClick={(e) => {
              e.preventDefault();
              setModalContent(
                <div>
                  <p>Are you sure you want to delete this todo?</p>
                  <button onClick={() => handleConfirmDelete(todoId)}>
                    Yes
                  </button>
                  <button onClick={() => cancelFunc()}>No</button>
                </div>
              );
            }}
          >
            Delete todo
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
