import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { deleteTaskThunk } from "../../../store/task";

export default function TaskDetails() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { taskId } = useParams();
  const tasks = useSelector((state) => state.taskReducer.allTasks);
  const task = tasks[taskId];

  const handleEditTask = () => {
    history.push(`/tasks/${taskId}/edit`);
  };

  const handleDeleteTask = () => {
    dispatch(deleteTaskThunk(taskId))
      .then(() => {
        history.push("/tasks");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (!task) {
    return <h1>Task not found</h1>;
  }

  return (
    <div>
      <h1>{task.description}</h1>
      <button onClick={handleEditTask}>Edit</button>
      <button onClick={handleDeleteTask}>Delete</button>
    </div>
  );
}
