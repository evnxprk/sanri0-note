import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllTasksThunk } from "../../../store/task";
import "../tasks.css"; // Import the CSS file for Tasks component

export default function Tasks() {
  const dispatch = useDispatch();
  const history = useHistory();
  const getAllTasks = useSelector((state) => state.taskReducer);
  const tasks = Object.values(getAllTasks.allTasks);

  useEffect(() => {
    dispatch(getAllTasksThunk());
  }, [dispatch]);

  if (tasks.length === 0) {
    return <h1 className="first-task">Create your first task!</h1>;
  }

  const handleTaskClick = (taskId) => {
    history.push(`/tasks/${taskId}`);
  };

  return (
    <div className="task-main-box">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="task-box"
          onClick={() => handleTaskClick(task.id)}
        >
          {task.description}
        </div>
      ))}
    </div>
  );
}
