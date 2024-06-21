import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  getAllTasksThunk,
  deleteTaskThunk,
  editTaskThunk,
} from "../../../store/task";
import "./tasks.css"; // Import the CSS file for Tasks component

export default function Tasks() {
  const dispatch = useDispatch();
  const history = useHistory();
  const getAllTasks = useSelector((state) => state.taskReducer);
  const tasks = Object.values(getAllTasks.allTasks);
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    dispatch(getAllTasksThunk());
  }, [dispatch]);

  useEffect(() => {
    if (getAllTasks.completedUpdated) {
      // Update local state of completed tasks
      const updatedCompletedTasks = tasks.filter((task) => task.completed);
      setCompletedTasks(updatedCompletedTasks);
    }
  }, [getAllTasks.completedUpdated, tasks]);

  if (tasks.length === 0) {
    return <h1 className="first-task">Create your first task!</h1>;
  }

  const handleTaskClick = (taskId) => {
    history.push(`/tasks/${taskId}`);
  };

  const handleCheckboxChange = async (taskId, completed) => {
    try {
      // Update task completion status in Redux store
      await dispatch(editTaskThunk(taskId, { completed: !completed }));

      // Update local state of tasks
      const updatedTasks = tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !completed } : task
      );
      setCompletedTasks(updatedTasks);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="task-main-box">
      {tasks.map((task) => (
        <div
          key={task.id}
          className={`task-box ${task.completed ? "completed" : ""}`}
          onClick={() => handleTaskClick(task.id)}
        >
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => handleCheckboxChange(task.id, task.completed)}
          />
          <label className="task-description">{task.description}</label>
        </div>
      ))}
      {completedTasks.length > 0 && (
        <div className="completed-tasks">
          <h2>Completed Tasks</h2>
          {completedTasks.map((task) => (
            <div key={task.id} className="completed-task">
              {task.description}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
