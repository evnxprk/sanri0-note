import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import '../tasks.css'
import { addTaskThunk, deleteTaskThunk, getAllTasksThunk } from "../../../store/task";

export default function Tasks() {
  const dispatch = useDispatch();
  const getAllTasks = useSelector((state) => state.taskReducer);
  const tasks = Object.values(getAllTasks.allTasks);
  const history = useHistory()
  const { closeModal, setModalContent, ModalContent } = useModal()
  const [taskToDelete, setTaskToDelete] = useState(null);
  const sessionUser = useSelector(state => state.session.user)
  const [newTaskDescription, setNewTaskDescription] = useState('')
  const [selectedTaskId, setSelectedTaskId] = useState(null);


  useEffect(() => {
    dispatch(getAllTasksThunk());
  }, [dispatch]);

  const handleDeleteTask = async (taskId) => {
    await dispatch(deleteTaskThunk(taskId));
    // history.push('/dashboard')
  };

   const handleConfirmDelete = (taskId) => {
     dispatch(deleteTaskThunk(taskId))
       .then(() => {
         setNewTaskDescription(null);
         history.push("/dashboard");
         closeModal();
         setModalContent(null);
       })
       .catch((err) => console.log(err));
   };
  if (tasks.length === 0) {
    return <h1 className="first-task"> Create your first task! </h1>;
  }
  if (!sessionUser) {
    history.push("/");
    return null;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      description: newTaskDescription,
      to_do_id: selectedTaskId,
    };
    dispatch(addTaskThunk(newTask))
      .then(() => {
        setNewTaskDescription("");
        setSelectedTaskId(null);
      })
      .catch((err) => console.log(err));
  };

  const handleEdit = (taskId) => {
    history.push(`/tasks/${taskId}/edit`);
  };

  if (!tasks.length) return null;

  return (
    <div className="task-main-box">
      {tasks.map((task) => {
        return (
          <div
            key={task.id}
            className="task-box"
            onClick={() => handleEdit(task.id)}
          >
            <div>{task.description}</div>
          </div>
        );
      })}
    </div>
  );
}

