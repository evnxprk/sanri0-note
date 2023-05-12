import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { deleteTaskThunk, editTaskThunk, getOneTaskThunk } from "../../../store/task";

export default function EditTask() {
  const dispatch = useDispatch();
  const history = useHistory();
//   const 
  const { taskId } = useParams();
  const tasks = useSelector((state) => state.taskReducer.singleTask);
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    dispatch(getOneTaskThunk(taskId));
  }, [dispatch]);

  useEffect(() => {
    if (tasks.description) {
      setDescription(tasks.description);
    }
  }, [tasks]);

  useEffect(() => {
    const errors = [];
    if (description.length < 2 || description.length > 255) {
      errors.push(
        "Description must be longer than 2 character and less than 255 characters."
      );
    }
    setErrors(errors);
  }, [description]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const taskData = {
      description,
    };

    const errors = [];
    if (description.length < 2 || description.length > 255) {
      errors.push(
        "Description must be longer than 2 and less than 255 characters."
      );
    }
    setErrors(errors);

    if (errors.length === 0) {
      if (taskId) {
        await dispatch(editTaskThunk(taskId, taskData)).catch((res) => {
          console.error("Invalid response format:", res);
        });
      }
      history.push("/dashboard");
    }
  };
  //* Delete Merge

  const allTasks = useSelector(
    (state) => state.taskReducer.allTasks
  );
  const taskValues = Object.values(allTasks);
  const { ModalContent, closeModal, setModalContent } = useModal();
  const [editedTask, setEditedTask] = useState("");
  const [taskToEdit, setTaskToEdit] = useState(null);

  const handleDelete = (taskId) => {
    setModalContent(
      <div>
        <p>Are you sure you want to delete this task?</p>
        <button
          onClick={() => {
            dispatch(deleteTaskThunk(taskId))
              .then(() => {
                closeModal();
                setModalContent(null);
                history.push("/");
              })
              .catch((err) => console.log(err));
          }}
        >
          Yes
        </button>
        <button onClick={closeModal}>No</button>
      </div>
    );
  };

  return (
    <>
      <div className="edit-task-form"></div>
      <div className="edit-form-container">
        <div className="edit-form-errors">
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
        </div>
        <div
          className="form-box"
          style={{
            border: "1px solid black",
            borderRadius: "20px",
            width: "50%",
            justifyContent: "center",
            display: "grid",
          }}
        >
          <div
            style={{ fontSize: "24px", textAlign: "center", marginTop: "10px" }}
          >
            <img style={{ width: "100px", marginLeft: "20px" }}></img>
            Edit Task
          </div>
          <button className="edit-submit-button" type="submit">
            Save Changes
          </button>
          <div
            className="task-delete-container"
            style={{ justifyContent: "center", display: "flex" }}
          >
            <button
              className="edit-task-delete-button"
              onClick={() => handleDelete(taskId)}
            >
              Delete Notebook
            </button>
          </div>
        </div>
        {taskToEdit && (
          <form onSubmit={handleSubmit}>
            <label>
              Task Details:
              <input
                type="text"
                value={editedTask}
                onChange={(e) => setEditedTask(e.target.value)}
                required
              />
            </label>
            {/* <button type="submit">Save Changes</button> */}
          </form>
        )}
      </div>
    </>
  );
}