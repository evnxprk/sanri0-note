import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTaskThunk,
  editTaskThunk,
  getAllTasksThunk,
} from "../../store/task";
import OpenModalButton from "../OpenModalButton";
import AddTask from "../AddTasks";

export default function Tasks() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.taskReducer);
  console.log("what is task: " , tasks)
  const allTasks = Object.values(tasks);

  useEffect(() => {
    dispatch(getAllTasksThunk());
  }, [dispatch]);

  if (Object.keys(tasks).length === 0) {
    return null;
  }

  const editTaskChange = async (taskId, task) => {
    await dispatch(editTaskThunk(taskId, task));
  };

  const handleDelete = async (id) => {
    await dispatch(deleteTaskThunk(id));
    dispatch(getAllTasksThunk());
  };

  return (
    <div className="task-notebook-container">
      {/* <h1 style={{ textAlign: "center" }}>Tasks</h1> */}
      <div className="task-list">
        
      </div>
    </div>
  );
}
