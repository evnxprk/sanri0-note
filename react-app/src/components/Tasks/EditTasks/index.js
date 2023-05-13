
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import Modal from "../../Modal";
import { deleteTaskThunk, editTaskThunk, getAllTasksThunk, getOneTaskThunk } from "../../../store/task";

export default function EditNote() {
  const myTask = useSelector((state) => state.taskReducer.singleTask);
  const dispatch = useDispatch();
  const { taskId } = useParams();
  const history = useHistory();
  const { closeModal, setModalContent, ModalContent } = useModal();
  const [description, setDescription] = useState(myTask.description);
  const [errors, setErrors] = useState([]);
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
   
    dispatch(getOneTaskThunk(taskId)).catch((err) => console.log(err));
    setDescription(myTask.description);
  }, [dispatch, taskId]);

  useEffect(() => {
    setDescription(myTask.description);
  }, [myTask]);

  // useEffect(() => {
  //   if (note) {
  //     setTitle(note.title);
  //     setDescription(note.description);
  //   }
  // }, [note]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const taskData = {
      description,
      to_do_id: sessionUser.id,
    };

    const errors = [];
    if (description.length < 2 || description.length > 255) {
      errors.push(
        "Description must be longer than 2 and less than 255 characters."
      );
    }
    setErrors(errors);

    if (errors.length === 0) {
      await dispatch(editTaskThunk(taskData, taskId))
        .then(() => closeModal())
        .catch(async (res) => {
          if (res && res.json) {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
          } else {
            console.error("Invalid response format:", res);
          }
        });
      setDescription("");
      history.push("/dashboard");
    }
  };

  const [taskToDelete, setTaskToDelete] = useState(null);

  const handleConfirmDelete = (taskId) => {
    dispatch(deleteTaskThunk(taskId))
      .then(() => {
        setTaskToDelete(null);
        history.push("/");
        closeModal();
        setModalContent(null);
      })
      .catch((err) => console.log(err));
  };

  const cancelFunc = () => {
    setTaskToDelete(null);
    closeModal();
  };

  //* Editor Merge

  if (!Object.values(myTask).length) return null;

  return (
    <div className="editor-main-container">
      <div className="edit-task-main-box">
        <h1 className="edit-task-description">{myTask.description}</h1>
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
            className="task-delete-button"
            onClick={(e) => {
              e.preventDefault();
              setModalContent(
                <div>
                  <p>Are you sure you want to delete this task?</p>
                  <button onClick={() => handleConfirmDelete(taskId)}>
                    Yes
                  </button>
                  <button onClick={() => cancelFunc()}>No</button>
                </div>
              );
            }}
          >
            Delete Note
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
