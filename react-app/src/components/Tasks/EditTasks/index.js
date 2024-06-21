import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  deleteTaskThunk,
  editTaskThunk,
  getOneTaskThunk,
} from "../../../store/task";
import badz from "../../../images/pompom.gif";
import "./edit.css";

export default function EditTasks() {
  const dispatch = useDispatch();
  const { taskId } = useParams();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [description, setDescription] = useState("");
  const [completedUI, setCompletedUI] = useState(false);
  const [errors, setErrors] = useState([]);
  const myTask = useSelector((state) => state.taskReducer.singleTask);

  useEffect(() => {
    if (myTask) {
      setDescription(myTask.description);
      setCompletedUI(myTask.completed);
    }
  }, [myTask]);

  useEffect(() => {
    dispatch(getOneTaskThunk(taskId)).catch((err) => console.log(err));
  }, [dispatch, taskId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const taskData = {
      description,
      to_do_id: sessionUser.id,
      completed: completedUI,
    };

    const errors = [];
    if (description.length < 2 || description.length > 255) {
      errors.push("Description must be between 2 and 255 characters.");
    }
    setErrors(errors);

    if (errors.length === 0) {
      await dispatch(editTaskThunk(taskId, taskData))
        .then(() => {
          history.push("/"); // Redirect to home page after save
        })
        .catch(async (res) => {
          if (res && res.json) {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
          } else {
            console.error("Invalid response format:", res);
          }
        });
    }
  };

  const handleConfirmDelete = () => {
    dispatch(deleteTaskThunk(taskId))
      .then(() => {
        history.push("/"); // Redirect to home page after successful delete
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
        // Handle error as needed
      });
  };

  const handleDeleteClick = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      handleConfirmDelete();
    }
  };

  const handleCheckboxChange = (e) => {
    setCompletedUI(e.target.checked);
    if (!e.target.checked) {
      setDescription(myTask.description);
    }
  };

  if (!myTask) return null;

  return (
    <div className="editor-main-container">
      <div className="edit-task-main-box">
        <h3 className="edit-task-description">
          Current Task: {myTask.description}
        </h3>
        <div className="form-errors">
          {errors.length > 0 && (
            <ul>
              {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
          )}
        </div>
        <h2>
          <img
            style={{
              width: "60px",
              marginLeft: "10px",
              background: "transparent",
            }}
            src={badz}
            alt="badge"
          />
        </h2>
        <form onSubmit={handleSubmit}>
          <label>Description</label>
          <textarea
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            required
          />
          <label>
            <input
              type="checkbox"
              checked={completedUI}
              onChange={handleCheckboxChange}
            />{" "}
            Completed
          </label>
          <button className="edit-submit-button" type="submit">
            Save Changes
          </button>
          <button className="task-delete-button" onClick={handleDeleteClick}>
            Delete Task
          </button>
        </form>
      </div>
    </div>
  );
}
