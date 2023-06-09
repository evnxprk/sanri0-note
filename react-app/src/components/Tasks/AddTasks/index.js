import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { addTaskThunk, getAllTasksThunk } from "../../../store/task";

export default function CreateTask () {
  const history = useHistory();
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState([]);
  const sessionUser = useSelector(state => state.session.user)

  useEffect(() => {
    const errors = [];
    if (description.length < 2 || description.length > 255) {
      errors.push(
        "Description must be longer than 2 and less than 255 characters."
      );
    }
    setErrors(errors);
  }, [description]);

    useEffect(() => {
      dispatch(getAllTasksThunk());
    }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let errors = [];
    if (description.length < 2 || description.length > 255) {
      errors.push(
        "Description must be longer than 2 and less than 255 characters."
      );
    }
    setErrors(errors);
    if (errors.length === 0) {
      let newTask = {
        description: description,
        to_do_id: sessionUser.id
      };

      const task = await dispatch(addTaskThunk(newTask));
      if (task) {
        closeModal();
        // Fetch all tasks again to update the state with the latest data
        dispatch(getAllTasksThunk());
        history.push("/dashboard");
      }
    }
  };


  return (
    <div>
      <div className="form-errors">
        {errors.map((error, idx) => (
          <div key={idx}>{error}</div>
        ))}
      </div>

      <div className="task-form-header">
        <h2>Create New Task</h2>
      </div>
      <form className="task-form-content" onSubmit={handleSubmit}>
        <div className="task-form-errors"></div>
        <div className="task-form-fields">
          <label>Description</label>
          <input
            type="text"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button className="create-task-button" type="submit">
            Create Task
          </button>
        </div>
      </form>
    </div>
  );
}
