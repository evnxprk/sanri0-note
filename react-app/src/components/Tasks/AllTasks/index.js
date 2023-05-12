import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTaskThunk, getAllTasksThunk } from "../../../store/task";

export default function Tasks() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.taskReducer.allTasks);

  useEffect(() => {
    dispatch(getAllTasksThunk());
  }, [dispatch]);

  const handleDeleteTask = async (taskId) => {
    await dispatch(deleteTaskThunk(taskId));
    // Perform any additional actions after deleting the task
  };

  if (Object.keys(tasks).length === 0) {
    return <div>No tasks found.</div>;
  }

  return (
    <div className="task-notebook-container">
      <div className="task-list">
        {Object.values(tasks).map((task) => (
          <div key={task.id}>
            <p>{task.description}</p>
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
